'use client';

import React, { useEffect, useMemo, useState } from 'react';
import styles from './formStudent.module.css';

import Form from '@/components/form/form';
import Input, { ColumnInput } from '@/components/form/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import AlertNotification from '@/components/alertNotification/alertNotification';
import CustomSelect from '@/components/form/select/custom-select';
import DataBase from '@/firebase/db/database';
import { RoomType } from '../../rooms/rooms';
import Global from '@/utils/global';
import ProfileCustom from '@/components/profileCustom/profileCustom';
import { useParams } from 'next/navigation';

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

const { avatar, alertNotification } = Global();

const FormStudent = ({ type }: { type: 'Create' | 'Update' }) => {
  const { dataDocs, updateData } = DataBase<RoomType>('rooms');
  const [dataProfile, setDataProfile] = useState({
    name: '',
    url: '',
  });
  const [selectRooms, setSelectRooms] = useState('');
  const [selectOffice, setSelectOffice] = useState('');
  const params: { slug: string[] } = useParams();
  const [roomCurrent, setRoomCurrent] = useState<RoomType | null>(null);
  const [studentCurrent, setStudentCurrent] = useState<StudentsProps | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SchemaFormStudent>({
    resolver: zodResolver(schemaFormStudent),
  });

  useEffect(() => {
    watch(({ fullName }) => {
      if (fullName) {
        setDataProfile({
          name: fullName,
          url: avatar({
            name: fullName,
            type: 'initials',
          }),
        });
      } else {
        setDataProfile({
          name: '',
          url: '',
        });
      }
    });
  }, [watch]);

  useMemo(() => {
    const getDataRoom = (type: keyof RoomType, str: String) => {
      const data = dataDocs.find((room) => room[type] === str);
      if (data !== undefined) setRoomCurrent(data);
    };

    if (type === 'Create') getDataRoom('name_room', selectRooms);
    if (type === 'Update') getDataRoom('id', params.slug[0]);
  }, [type, dataDocs, selectRooms, params]);

  useMemo(() => {
    const dataStudent = roomCurrent?.students.find(
      (student) => student.id === Number(params.slug[1]),
    );
    if (dataStudent !== undefined) setStudentCurrent(dataStudent);
  }, [roomCurrent, params]);

  useMemo(() => {
    if (type === 'Update') {
      reset({
        fullName: studentCurrent?.fullName ?? '',
        birthDate: studentCurrent?.birthDate ?? '',
        phone: studentCurrent?.phone ?? '',
        street: studentCurrent?.address?.street ?? '',
        neighborhood: studentCurrent?.address?.neighborhood ?? '',
        numberHouse: studentCurrent?.address?.numberHouse ?? '',
      });

      setSelectOffice(() => studentCurrent?.office ?? '');
      setSelectRooms(() => studentCurrent?.room ?? '');
    }
  }, [type, reset, studentCurrent]);

  function handleClickFormStudent(data: SchemaFormStudent) {
    const idRandom = Math.floor(Math.random() * 100);

    // Atualizar dados do aluno
    const updateDataStudent = () => {};

    // Matricular novos alunos
    const enrollStudent = () => {};

    if (data.fullName) {
      if (type === 'Create') enrollStudent();
      if (type === 'Update') updateDataStudent();
    } else {
      alertNotification('error', 'Escolha as opções');
      return;
    }
  }

  return (
    <div className={styles.formStudent}>
      {/* {loading && <Loader />} */}
      <AlertNotification />
      <div className={styles.box}>
        {dataProfile.name && (
          <div className={styles.boxProfile}>
            <ProfileCustom
              src={dataProfile.url}
              alt={dataProfile.name}
              width={150}
              height={150}
            />
            <h3>{dataProfile.name}</h3>
          </div>
        )}
      </div>
      <div className={styles.box}>
        <Form
          className={styles.form}
          onSubmit={handleSubmit(handleClickFormStudent)}
        >
          <CustomSelect
            label="Turmas"
            items={dataDocs.map((room) => room.name_room)}
            setValue={setSelectRooms}
            value={selectRooms}
            style={{ backgroundColor: 'var(--bgPrimary)' }}
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
            style={{ backgroundColor: 'var(--bgPrimary)' }}
            items={[
              'Pastor',
              'Evangelista',
              'Presbítero',
              'Diácono',
              'Diaconisa',
              'Músico',
              'Membro',
            ]}
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
