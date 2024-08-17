'use client';

import React from 'react';
import styles from './rooms.module.css';
import GlobalLayout from '@/components/globalLayout/globalLayout';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableNotFound,
  TableOptions,
  TableProfile,
  TableRow,
} from '@/components/table/table';
import Modal from '@/components/modal/modal';
import Form from '@/components/form/form';
import Input from '@/components/form/input';
import CustomSelect from '@/components/form/select/custom-select';
import DataBase from '@/firebase/db/database';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import AlertNotification from '@/components/alertNotification/alertNotification';
import { zodResolver } from '@hookform/resolvers/zod';
import Global from '@/utils/global';
import type { StudentsProps } from '../students/formStudent/formStudent';
import Link from 'next/link';
import { Loader } from '@/components/loader/loader';
import { TypeAula } from '../aulas/calendar/calendar';

const schemaFormRoom = z.object({
  name_room: z.string().min(5, {
    message: 'O nome da sala deve ter pelo menos 5 caracteres',
  }),
});

type SchemaFormRoom = z.infer<typeof schemaFormRoom>;

export type RoomType = {
  id: string;
  name_room: string;
  faixa_etaria: string;
  image: string;
  date: string;
  students: StudentsProps[];
  status: 'Ativada' | 'Desativada';
  aulas: TypeAula[];
};

const { alertNotification, avatar } = Global();

const Rooms = () => {
  const { createDocument, dataDocs, loading } = DataBase<RoomType>('rooms');
  const [openModalRoom, setOpenModalRoom] = React.useState(false);
  const [selectFaixaEtaria, setSelectFaixaEtaria] = React.useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaFormRoom>({
    resolver: zodResolver(schemaFormRoom),
  });

  function handleFormRoom(data: SchemaFormRoom) {
    if (data.name_room) {
      if (selectFaixaEtaria === '') {
        alertNotification('error', 'Selecione uma faixa etária');
        return;
      }

      // Criar a sala
      const createNewRoom = () => {
        createDocument(
          {
            id: '',
            image: avatar({
              name: data.name_room,
              type: 'initials',
            }),
            faixa_etaria: selectFaixaEtaria,
            name_room: data.name_room,
            date: new Date().toLocaleDateString(),
            students: [],
            status: 'Ativada',
            aulas: [],
          },
          () => {
            setOpenModalRoom(false);
            alertNotification('success', 'Sala criada com sucesso');
          },
        );
      };

      const isRoom = dataDocs.every(
        (room) =>
          room.name_room.toLowerCase().trim() !==
          data.name_room.toLowerCase().trim(),
      );

      if (isRoom) createNewRoom();
      else alertNotification('error', 'Já existe uma sala com esse nome');
    }
  }

  return (
    <GlobalLayout title="Salas" description="Salas ativas na EBD">
      <AlertNotification />
      <Modal
        title="Criar uma sala"
        modal={openModalRoom}
        setModal={setOpenModalRoom}
      >
        <Form onSubmit={handleSubmit(handleFormRoom)}>
          <Input
            type="text"
            id="name_room"
            label="Nome"
            required
            {...register('name_room')}
            error={errors.name_room}
          />
          <CustomSelect
            label="Faixa etária"
            items={['Adultos', 'Adolescentes', 'Crianças', 'Jovens']}
            setValue={setSelectFaixaEtaria}
            value={selectFaixaEtaria}
            style={{ backgroundColor: 'var(--bgSecondary)' }}
          />
          <div className="button-flex">
            <button className="button-2">Criar sala</button>
          </div>
        </Form>
      </Modal>
      <div className={styles.containerRooms}>
        <div className={styles.nav}>
          <button className="button-2" onClick={() => setOpenModalRoom(true)}>
            <Icon icon="ic:outline-add" />
            Adicionar sala
          </button>
        </div>
        <div className={styles.boxRooms}>
          {loading && <Loader />}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell type="th">Sala</TableCell>
                <TableCell type="th">Data de Registro</TableCell>
                <TableCell type="th">Total de Alunos</TableCell>
                <TableCell type="th">Status</TableCell>
                <TableCell type="th"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!dataDocs.length ? (
                <TableNotFound colSpan={5} />
              ) : (
                dataDocs.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell type="td">
                      <TableProfile name={room.name_room} src={room.image} />
                    </TableCell>
                    <TableCell type="td">{room.date}</TableCell>
                    <TableCell type="td">{room.students.length}</TableCell>
                    <TableCell type="td">
                      <span data-status={room.status}>{room.status}</span>
                    </TableCell>
                    <TableCell type="td">
                      <TableOptions>
                        <Link href="#">
                          <Icon icon="solar:trash-bin-trash-bold-duotone" />
                          Excluir
                        </Link>
                        <Link href="/student/edit">
                          <Icon icon="solar:document-add-bold-duotone" />
                          Editar
                        </Link>
                        <Link href={`/students/${room.id}`}>
                          <Icon icon="solar:users-group-rounded-bold-duotone" />
                          Visualizar alunos
                        </Link>
                      </TableOptions>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </GlobalLayout>
  );
};
export default Rooms;
