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
import { Loader } from '@/components/loader/loader';

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
  const { dataDocs, createDocumentWithId, loading } =
    DataBase<UsersSettings>('users');

  React.useEffect(() => {
    if (userCurrent) {
      reset({
        name: userCurrent.displayName ?? '',
        email: userCurrent.email ?? '',
      });
    }
  }, [userCurrent, reset]);

  React.useEffect(() => {
    const dataUser = dataDocs.find((data) => data.uid === userCurrent?.uid);
    if (dataUser) {
      reset({
        bio: dataUser.bio,
      });
    }
  }, [reset, dataDocs, userCurrent]);

  function handleClickProfile({ name, bio }: FormDataProfile) {
    if (name) updateDataUser(name);
    if (bio && userCurrent) {
      createDocumentWithId(userCurrent.uid, {
        uid: userCurrent.uid,
        user: userCurrent.displayName ?? '',
        bio,
      });
    }
  }

  return (
    <div className={styles.boxForm}>
      {loading && <Loader />}
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
        onSubmit={handleSubmit(handleClickProfile)}
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
