'use client';

import React from 'react';
import LayoutUser from '../layout-user';
import Form from '@/components/form/form';
import Input from '@/components/form/input';
import { ButtonLoader } from '@/components/loader/loader';
import { AuthUser } from '@/firebase/auth/authProvider';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schemaForm = z.object({
  email: z.string().email({
    message: 'Por favor, insira um e-mail válido',
  }),
});

type FormSchema = z.infer<typeof schemaForm>;

const Forgot = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>();
  const { resetPassword, loading } = AuthUser();

  return (
    <LayoutUser>
      <Form
        title="Recuperação de Conta"
        link={{
          href: '/auth/login',
          text: 'Voltar para',
          pageLink: 'login',
        }}
        onSubmit={handleSubmit(({ email }) => {
          if (email) resetPassword(email);
        })}
      >
        <Input
          type="email"
          id="email"
          label="Email"
          required
          {...register('email')}
          error={errors.email}
        />
        <ButtonLoader text="Enviar" loading={loading} disabled={loading} />
      </Form>
    </LayoutUser>
  );
};
export default Forgot;
