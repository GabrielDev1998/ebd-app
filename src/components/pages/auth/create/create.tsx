'use client';

import React from 'react';
import LayoutUser from '../layout-user';
import Form from '@/components/form/form';
import Input from '@/components/form/input';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthUser } from '@/firebase/auth/authProvider';

import Global from '@/utils/global';
import ReCAPTCHA from 'react-google-recaptcha';
import useRecaptcha from '@/hooks/useRecaptcha';
import { ButtonLoader } from '@/components/loader/loader';

const schema = z.object({
  fullName: z
    .string()
    .min(3, {
      message: 'O nome deve ter pelo menos 3 caracteres',
    })
    .max(20, {
      message: 'O nome não pode ter mais de 20 caracteres',
    }),
  email: z.string().email({
    message: 'Por favor, insira um e-mail válido',
  }),
  password: z.string().min(8, {
    message: 'A senha deve ter pelo menos 8 caracteres',
  }),
});

type FormSchema = z.infer<typeof schema>;

const Create = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });
  const { SITE_KEY, recaptcha, validateRecaptcha } = useRecaptcha();
  const { createNewUser, loading } = AuthUser();
  const { firstLetter } = Global();

  function onSubmitForm({ fullName, email, password }: FormSchema) {
    if (fullName && email && password) {
      validateRecaptcha(() => {
        createNewUser({
          name: firstLetter(fullName),
          email,
          password,
        });
      });
    }
  }

  return (
    <LayoutUser text="Criar uma conta na EBD">
      <Form
        onSubmit={handleSubmit(onSubmitForm)}
        title="Criar conta"
        link={{
          href: '/auth/login',
          text: 'Já possui uma conta?',
          pageLink: 'Entrar',
        }}
      >
        <Input
          type="text"
          id="fullName"
          label="Nome completo"
          required
          {...register('fullName')}
          error={errors.fullName}
        />
        <Input
          type="email"
          id="email"
          label="E-mail"
          required
          {...register('email')}
          error={errors.email}
        />
        <Input
          type="password"
          id="password"
          label="Sua senha"
          required
          {...register('password')}
          error={errors.password}
        />
        <ReCAPTCHA sitekey={SITE_KEY} ref={recaptcha} />
        <ButtonLoader
          text={loading ? 'Criando...' : 'Criar'}
          loading={loading}
          disabled={loading}
        />
      </Form>
    </LayoutUser>
  );
};
export default Create;
