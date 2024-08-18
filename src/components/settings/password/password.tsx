'use client';

import React from 'react';
import styles from '../settings.module.css';
import Form from '@/components/form/form';
import Input from '@/components/form/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Global from '@/utils/global';
import { AuthUser } from '@/firebase/auth/authProvider';

const schemaPassword = z.object({
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
  passwordConfirm: z
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres'),
});

type FormDataPassword = z.infer<typeof schemaPassword>;

const { alertNotification } = Global();

const Password = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataPassword>({
    resolver: zodResolver(schemaPassword),
  });
  const { updatePasswordUser } = AuthUser();

  function handleSubmitPassword({
    password,
    passwordConfirm,
  }: FormDataPassword) {
    if (password && passwordConfirm) {
      if (password === passwordConfirm) {
        updatePasswordUser(password);
      } else {
        alertNotification('error', 'As senhas não conferem');
        return;
      }
    }
  }

  return (
    <div className={styles.boxForm}>
      <Form
        className={`${styles.form} animaLeft`}
        onSubmit={handleSubmit(handleSubmitPassword)}
      >
        <Input
          type="password"
          id="password"
          placeholder="Nova senha"
          {...register('password')}
          error={errors.password}
          required
        />
        <Input
          type="password"
          id="password-confirm"
          placeholder="Confirme a nova senha"
          {...register('passwordConfirm')}
          error={errors.passwordConfirm}
          required
        />
        <div className="button-flex">
          <button className="button">Salvar alterações</button>
        </div>
      </Form>
    </div>
  );
};
export default Password;
