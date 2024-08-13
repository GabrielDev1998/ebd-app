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

const schemaProfile = z.object({
  name: z.string().min(5).max(100),
  email: z.string().email(),
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
  const [bio, setBio] = React.useState('');

  const {userCurrent} = AuthUser();

  React.useMemo(() => {
    if(userCurrent){
      reset({
        name: userCurrent.displayName ?? '',
        email: userCurrent.email ?? '',
      })
    }
  }, [userCurrent, reset])

  return (
    <div className={styles.boxForm}>
      <Form className={`${styles.form} animaLeft`}>
        <Input
          id="name"
          placeholder="Nome completo"
          {...register('name')}
          error={errors.name}
          required
        />
        <Input
          id="email"
          placeholder="Seu email"
          {...register('email')}
          error={errors.email}
          required
        />
        <Textarea id="bio" onChange={({target}) => setBio(target.value)} value={bio} placeholder='Biografia'/>
        <div className="button-flex">
          <button className="button">Salvar alterações</button>
        </div>
      </Form>
    </div>
  );
};
export default Profile;
