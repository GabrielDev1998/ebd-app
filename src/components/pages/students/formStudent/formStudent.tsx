'use client';

import React, { useEffect, useState } from 'react';
import styles from './formStudent.module.css';

import Form from '@/components/form/form';
import Input, { ColumnInput } from '@/components/form/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DataBase from '@/firebase/db/database';
import Global from '@/utils/global';
import ProfileCustom from '@/components/profileCustom/profileCustom';
import CustomSelect from '@/components/form/select/custom-select';
import { RoomType } from '../../rooms/rooms';
import AlertNotification from '@/components/alertNotification/alertNotification';

const schemaFormStudent = z.object({
  fullName: z.string().min(5, {
    message: 'O nome deve ter pelo menos 5 caracteres',
  }),
  birthDate: z.string(),
  phone: z.string(),
  street: z.string(),
  neighborhood: z.string(),
  numberHouse: z.string(),
});

type SchemaFormStudent = z.infer<typeof schemaFormStudent>;

export type StudentsProps = {
  id: number;
  fullName: string;
  birthDate: string;
  phone: string;
  address: {
    street: string;
    neighborhood: string;
    numberHouse: string;
  };
  room: string;
  office: string;
  profile: string;
  date_enroll: string;
  status: 'Ativo' | 'Inativo';
};

const FormStudent = ({ type }: { type: 'Create' | 'Update' }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SchemaFormStudent>({
    resolver: zodResolver(schemaFormStudent),
  });

  const { avatar, alertNotification, popup } = Global();
  const { dataDocs, updateData } = DataBase<RoomType>('rooms');
  const [profileStudent, setProfileStudent] = React.useState({
    url: '',
    name: '',
  });

  const [selectRooms, setSelectRoom] = React.useState('');
  const [selectOffice, setSelectOffice] = React.useState('');

  // console.log('Renderizou');

  function handleClickFormStudent({
    birthDate,
    fullName,
    neighborhood,
    numberHouse,
    phone,
    street,
  }: SchemaFormStudent) {
    const idRandom = Math.floor(Math.random() * 1000);
    const roomCurrent = dataDocs.find((room) => room.name_room === selectRooms);

    const addNewStudent = () => {
      const newStudent: StudentsProps = {
        id: idRandom,
        fullName,
        address: {
          street,
          neighborhood,
          numberHouse,
        },
        birthDate,
        phone,
        room: selectRooms,
        office: selectOffice,
        profile: avatar({
          name: fullName,
          type: 'initials',
        }),
        date_enroll: new Date().toLocaleDateString(),
        status: 'Ativo',
      };

      const send = (data: StudentsProps[]) => {
        if (roomCurrent) {
          updateData(
            roomCurrent.id,
            {
              ...roomCurrent,
              students: data,
            },
            () => alertNotification('success', 'Aluno cadastrado com sucesso'),
          );
        }
      };

      if (roomCurrent) {
        const { students } = roomCurrent;
        if (students.length === 0) send([newStudent]);
        else {
          const isRepeat = roomCurrent?.students.filter(
            (student) => student.id === idRandom,
          );
          // Caso o ID já esteja cadastrado, exibe um aviso.
          if (isRepeat?.length) {
            popup({
              icon: 'warning',
              title: 'Tente novamente!',
              text: `O ID ${idRandom} gerado, está registrada em algum aluno.`,
            });
          } else {
            send([...students, newStudent]);
          }
        }
      }
    };

    // Função para atualizar os dados do aluno já matriculado.
    const updateDataStudent = () => {};

    if (fullName) {
      if (selectRooms && selectOffice) {
        if (type === 'Create') addNewStudent();
        if (type === 'Update') updateDataStudent();
      } else {
        alertNotification('error', 'Selecione as opções para continuar');
      }
    }
  }

  useEffect(() => {
    watch(({ fullName }) => {
      if (fullName) {
        setProfileStudent({
          url: avatar({
            name: fullName,
            type: 'initials',
          }),
          name: fullName,
        });
        return;
      }

      setProfileStudent({
        url: '',
        name: '',
      });
    });
  }, [watch, avatar]);

  return (
    <div className={styles.formStudent}>
      <AlertNotification />
      <div className={styles.box}>
        <div className={styles.boxProfile}>
          {profileStudent.url && profileStudent.name && (
            <>
              <ProfileCustom
                src={profileStudent.url}
                alt={profileStudent.name}
                width={100}
                height={100}
              />
              <h3>{profileStudent.name}</h3>
            </>
          )}
        </div>
      </div>
      <div className={styles.box}>
        <Form
          className={styles.form}
          onSubmit={handleSubmit(handleClickFormStudent)}
        >
          <CustomSelect
            label="Turmas"
            setValue={setSelectRoom}
            value={selectRooms}
            items={dataDocs.map((room) => room.name_room)}
            style={{ backgroundColor: 'var(--bg-6)' }}
          />
          <Input
            type="text"
            label="Nome completo"
            id="fullName"
            {...register('fullName')}
            required
            error={errors.fullName}
          />
          <ColumnInput>
            <Input
              type="text"
              label="Data de Nascimento"
              id="birthDate"
              required
              {...register('birthDate')}
              error={errors.birthDate}
            />
            <Input
              type="text"
              label="Celular"
              id="phone"
              required
              {...register('phone')}
              error={errors.phone}
            />
          </ColumnInput>
          <ColumnInput>
            <Input
              type="text"
              label="Rua"
              id="street"
              required
              {...register('street')}
              error={errors.street}
            />
            <Input
              type="text"
              label="Bairro"
              id="neighborhood"
              required
              {...register('neighborhood')}
              error={errors.neighborhood}
            />
            <Input
              type="text"
              label="Número"
              id="numberHouse"
              required
              {...register('numberHouse')}
              error={errors.numberHouse}
            />
          </ColumnInput>
          <CustomSelect
            label="Cargos"
            setValue={setSelectOffice}
            value={selectOffice}
            items={[
              'Pastor',
              'Evangelista',
              'Presbítero',
              'Diácono',
              'Diaconisa',
              'Músico',
              'Membro',
            ]}
            style={{ backgroundColor: 'var(--bg-6)' }}
          />
          <div className="button-flex">
            {type === 'Create' && (
              <button className="button">Matricular</button>
            )}
            {type === 'Update' && (
              <button className="button">Salvar alterações</button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};
export default FormStudent;
