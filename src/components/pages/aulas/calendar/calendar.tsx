'use client';

import React from 'react';
import styles from './calendar.module.css';
import useCalendar from './useCalendar';
import Modal from '@/components/modal/modal';
import Input from '@/components/form/input';
import Form from '@/components/form/form';
import CustomSelect from '@/components/form/select/custom-select';
import DataBase from '@/firebase/db/database';
import Global from '@/utils/global';

import { Icon } from '@iconify/react/dist/iconify.js';
import { RoomType } from '../../rooms/rooms';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from '@/components/loader/loader';
import Link from 'next/link';
import { dataLesson, TypeQuarter } from '@/lessons/lessons';
import { monthsToQuarters } from 'date-fns';

const schemaFormAula = z.object({
  number_aula: z
    .string()
    .min(1, { message: 'O número da aula deve ter pelo menos 1 caracter' }),
  title_aula: z
    .string()
    .min(5, { message: 'O título da aula deve ter pelo menos 5 caracteres' }),
});

type SchemaFormAula = z.infer<typeof schemaFormAula>;

export type TypeReportAula = {
  presences: number;
  absences: number;
  bibles: number;
  magazines: number;
  enrolleds: number;
  visitors: string;
  teacher: string;
  offer: string;
};

export type TypeInput = 'presence' | 'bible' | 'magazine';

export type TypeCheckedCall = {
  id: number;
  checked: boolean;
  type: TypeInput;
  points: number;
};

export type TypeInputCall = {
  presence: TypeCheckedCall[];
  bible: TypeCheckedCall[];
  magazine: TypeCheckedCall[];
};

export type TypeAula = {
  id: string;
  number_aula: string;
  title_aula: string;
  status: 'Pendente' | 'Em andamento' | 'Concluído';
  date: string;
  call: TypeInputCall | null;
  room: string;
  report: TypeReportAula | null;
  quarter: TypeQuarter;
};

const { alertNotification, generateRandomNumbers, popup } = Global();

const Calendar = () => {
  const { dataDocs, updateData, loading } = DataBase<RoomType>('rooms');
  const { dataCalendar, setMonthCurrent } = useCalendar();
  const [modalAddAula, setModalAddAula] = React.useState(false);

  const [selectRooms, setSelectRooms] = React.useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaFormAula>({
    resolver: zodResolver(schemaFormAula),
  });
  const [generatedID, setGeneratedID] = React.useState<string | null>(null);
  const [dateCalendar, setDateCalendar] = React.useState('');
  const [aulas, setAulas] = React.useState<TypeAula[]>([]);
  const [modalDataAula, setModalDataAula] = React.useState(false);

  const [aulaCurrent, setAulaCurrent] = React.useState<TypeAula | null>(null);

  // console.log('Renderizou');

  React.useEffect(() => {
    setAulas([]);
    dataDocs.forEach((room) => {
      setAulas((aulas) => [...aulas, ...room.aulas]);
    });
  }, [dataDocs]);

  function handleAddAula({ number_aula, title_aula }: SchemaFormAula) {
    const room = dataDocs.find((room) => room.name_room === selectRooms);
    const quarterNumber = monthsToQuarters(Number(dateCalendar.slice(3, 5)));

    // Função para enviar ao banco de dados a aula adicionada
    const sendDataAula = (aula: TypeAula) => {
      if (room) {
        updateData(
          room.id,
          {
            ...room,
            aulas: [...room.aulas, aula],
          },
          () => {
            alertNotification('success', 'Aula adicionada com sucesso');
            setModalAddAula(false);
          },
        );
      }
    };

    if (number_aula && title_aula) {
      if (selectRooms && room) {
        const newAula: TypeAula = {
          id: generatedID ?? '',
          number_aula,
          title_aula,
          status: 'Pendente',
          date: dateCalendar,
          call: null,
          room: selectRooms,
          report: null,
          quarter: dataLesson[quarterNumber].quarter,
        };

        if (room.aulas.length === 0) sendDataAula(newAula);
        else {
          const validateIDRepeatAula = room.aulas.every(
            (aula) => aula.id !== generatedID,
          );
          if (validateIDRepeatAula) sendDataAula(newAula);
          else {
            popup({
              icon: 'warning',
              title: 'Tente novamente!',
              text: `Já existe uma aula com este ID (${generatedID}). Por favor, tente criar a aula novamente, para gerar um no ID para está aula.`,
            });
            setGeneratedID(null);
          }
        }

        return;
      }

      alertNotification('error', 'Selecione uma sala');
    }
  }

  return (
    <div className={styles.containerCalendar}>
      {loading && <Loader />}
      <Modal
        title="Adicionar aula"
        modal={modalAddAula}
        setModal={setModalAddAula}
      >
        <Form onSubmit={handleSubmit(handleAddAula)}>
          {generatedID && (
            <div className={styles.boxID}>
              <p>
                ID DA AULA: <strong>{generatedID}</strong>
              </p>
            </div>
          )}
          <Input
            type="text"
            id="number_aula"
            label="Número"
            required
            {...register('number_aula')}
            error={errors.number_aula}
          />
          <Input
            type="text"
            id="title_aula"
            label="Título"
            required
            {...register('title_aula')}
            error={errors.title_aula}
          />
          <CustomSelect
            id="rooms"
            label="Salas"
            items={dataDocs.map((room) => room.name_room)}
            setValue={setSelectRooms}
            value={selectRooms}
          />
          <div className="button-flex">
            <button className="button">Adicionar</button>
          </div>
        </Form>
      </Modal>
      <Modal
        title="Dados da Aula"
        modal={modalDataAula}
        setModal={setModalDataAula}
        style={{ maxWidth: '640px' }}
      >
        {aulaCurrent && (
          <div className={styles.boxDataAula}>
            <ul className={styles.dataAula}>
              <li>
                <strong>ID da Aula:</strong> {aulaCurrent.id}
              </li>
              <li>
                <strong>Número da Aula:</strong> {aulaCurrent.number_aula}
              </li>
              <li>
                <strong>Título:</strong> {aulaCurrent.title_aula}
              </li>
              <li>
                <strong>Status:</strong>{' '}
                <span data-status={aulaCurrent.status}>
                  {aulaCurrent.status}
                </span>
              </li>
              <li>
                <strong>Data:</strong> {aulaCurrent.date}
              </li>
              <li>
                <strong>Sala:</strong> {aulaCurrent.room}
              </li>
            </ul>
          </div>
        )}
        <div className={styles.boxOptions}>
          <button className="button-2 transparent">
            <Icon icon="solar:document-add-bold-duotone" />
            Editar
          </button>
          <Link
            href={`/call/${aulaCurrent?.id}`}
            className="button-2 transparent"
          >
            <Icon icon="solar:diploma-verified-bold-duotone" />
            Iniciar chamada
          </Link>
          <button className="button-2 transparent red">
            <Icon icon="solar:trash-bin-trash-bold-duotone" />
            Excluir
          </button>
        </div>
      </Modal>
      <div className={styles.navCalendar}>
        <div className={styles.boxControls}>
          <button
            className="icon"
            onClick={() => setMonthCurrent((monthCurrent) => monthCurrent - 1)}
          >
            <Icon icon="solar:alt-arrow-left-linear" />
          </button>
          <span>{dataCalendar.monthAndYear}</span>
          <button
            className="icon"
            onClick={() => setMonthCurrent((monthCurrent) => monthCurrent + 1)}
          >
            <Icon icon="solar:alt-arrow-right-linear" />
          </button>
        </div>
      </div>
      <div className={styles.boxCalendar}>
        {dataCalendar.dayAndWeek.map((item) => (
          <div key={item.day} className={styles.boxDay}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span className={styles.day}>
                  {item.day} - {item.weekText}
                </span>
              </div>
              <button
                className={styles.btnAdd}
                onClick={() => {
                  setModalAddAula(true);
                  setGeneratedID(generateRandomNumbers());
                  setDateCalendar(item.date);
                }}
              >
                <Icon icon="ic:sharp-add" />
              </button>
            </div>
            {aulas.filter((aula) => aula.date === item.date).length ? (
              <div className={styles.boxAulas}>
                {aulas
                  .filter((aula) => aula.date === item.date)
                  .map((aula) => (
                    <div
                      key={aula.id}
                      className={styles.boxAula}
                      data-status={aula.status}
                      onClick={() => {
                        setModalDataAula(true);
                        setAulaCurrent(aula);
                      }}
                    >
                      <p>
                        {aula.number_aula} - {aula.title_aula} - {aula.room}
                      </p>
                    </div>
                  ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Calendar;
