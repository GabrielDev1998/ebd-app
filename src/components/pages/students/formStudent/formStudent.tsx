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
  fullName: string;
  birthDate: string;
  phone: string;
  address: {
    street: string;
    neighborhood: string;
    numberHouse: string;
  };
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
  const { popup, avatar } = Global();
  const { createDocument, dataDocs } = DataBase<StudentsProps>('students');
  const [profileStudent, setProfileStudent] = React.useState({
    url: '',
    name: '',
  });

  const [selectRooms, setSelectRoom] = React.useState('');
  const [selectOffice, setSelectOffice] = React.useState('');

  // console.log('Renderizou');

  function onChangeForm({
    fullName,
    birthDate,
    neighborhood,
    numberHouse,
    phone,
    street,
  }: SchemaFormStudent) {
    if (fullName) {
      createDocument(
        {
          address: {
            street,
            neighborhood,
            numberHouse,
          },
          birthDate,
          fullName,
          phone,
        },
        () => {
          popup({
            icon: 'success',
            title: 'Aluno cadastrado com sucesso!',
            text: 'Seu cadastro foi realizado com sucesso!',
          });
        },
      );
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

  React.useEffect(() => {
    if (type === 'Update') {
      // Implementar lógica para carregar dados do aluno para o formulário
      reset({
        fullName: 'Nome do Aluno',
        birthDate: 'DD/MM/YYYY',
        phone: '(11) 9999-9999',
        street: 'Rua XYZ',
        neighborhood: 'Bairro ABC',
        numberHouse: '123',
      });
    }
  }, [type, reset, dataDocs]);

  return (
    <div className={styles.formStudent}>
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
        <Form className={styles.form} onSubmit={handleSubmit(onChangeForm)}>
          <CustomSelect
            label="Turmas"
            setValue={setSelectRoom}
            value={selectRooms}
            items={['Tipo 1', 'Tipo 2', 'Tipo 3']}
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
