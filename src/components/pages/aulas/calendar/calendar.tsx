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

const schemaFormAula = z.object({
  number_aula: z
    .string()
    .min(1, { message: 'O número da aula deve ter pelo menos 1 caracter' }),
  title_aula: z
    .string()
    .min(5, { message: 'O título da aula deve ter pelo menos 5 caracteres' }),
});

type SchemaFormAula = z.infer<typeof schemaFormAula>;

export type TypeCheckedCall = {
  id: number;
  checked: boolean;
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
  call: TypeCheckedCall | null;
};

const { alertNotification, generateRandomNumbers, popup } = Global();

const Calendar = () => {
  const { dataDocs, updateData } = DataBase<RoomType>('rooms');
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

  function handleAddAula({ number_aula, title_aula }: SchemaFormAula) {
    const room = dataDocs.find((room) => room.name_room === selectRooms);

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
                <span className={styles.day}>{item.day}</span>
                <p className={styles.week}>{item.weekText}</p>
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
          </div>
        ))}
      </div>
    </div>
  );
};
export default Calendar;
