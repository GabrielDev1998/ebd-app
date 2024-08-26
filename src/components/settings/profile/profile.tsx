'use client';

import React from 'react';
import styles from '../settings.module.css';
import Form from '@/components/form/form';
import Input from '@/components/form/input';
import Textarea from '@/components/form/textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthUser } from '@/firebase/auth/authProvider';
import ProfileCustom from '@/components/profileCustom/profileCustom';
import DataBase from '@/firebase/db/database';
import { UsersSettings } from '../settings';

const schemaProfile = z.object({
  name: z.string().min(5).max(100),
  email: z.string().email(),
  bio: z.string().max(250),
});

type FormDataProfile = z.infer<typeof schemaProfile>;

const Profile = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataProfile>({
    resolver: zodResolver(schemaProfile),
  });
  const { userCurrent, updateDataUser } = AuthUser();
  const { createDocument } = DataBase<UsersSettings>('users');

  React.useEffect(() => {
    if (userCurrent) {
      reset({
        name: userCurrent.displayName ?? '',
        email: userCurrent.email ?? '',
      });
    }
  }, [userCurrent, reset]);

  return (
    <div className={styles.boxForm}>
      {userCurrent && (
        <div className={styles.boxProfile}>
          <ProfileCustom
            src={userCurrent.photoURL ?? ''}
            alt={userCurrent.displayName ?? ''}
            width={150}
            height={150}
          />
        </div>
      )}
      <Form
        className={`${styles.form} animaLeft`}
        onSubmit={handleSubmit(({ name, bio }) => {
          if (name) {
            updateDataUser(name);
          }
        })}
      >
        <Input
          id="name"
          placeholder="Nome completo"
          {...register('name')}
          error={errors.name}
          required
        />
        <div>
          <Input
            id="email"
            placeholder="Seu email"
            {...register('email')}
            error={errors.email}
            required
            disabled={true}
          />
          <span className={styles.alert}>Não é possível alterar o email</span>
        </div>
        <Textarea id="bio" placeholder="Biografia" {...register('bio')} />
        <div className="button-flex">
          <button className="button">Salvar alterações</button>
        </div>
      </Form>
    </div>
  );
};
export default Profile;
