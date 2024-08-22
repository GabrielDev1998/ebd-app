'use client';

import React from 'react';
import styles from '../layout-user.module.css';

import LayoutUser from '../layout-user';
import Form from '@/components/form/form';
import Input from '@/components/form/input';
import Link from 'next/link';

import stylesForm from '@/components/form/form.module.css';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthUser } from '@/firebase/auth/authProvider';
import { ButtonLoader } from '@/components/loader/loader';
import { Icon } from '@iconify/react/dist/iconify.js';

const schema = z.object({
  email: z.string().email({
    message: 'Por favor, insira um e-mail válido',
  }),
  password: z.string().min(8, {
    message: 'A senha deve ter pelo menos 8 caracteres',
  }),
});

type FormSchema = z.infer<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });
  const { loginEmailAndPassword, loading } = AuthUser();

  function onSubmitForm({ email, password }: FormSchema) {
    if (email && password) {
      loginEmailAndPassword({
        email,
        password,
      });
    }
  }

  return (
    <LayoutUser text="Entrar na plataforma">
      <Form
        onSubmit={handleSubmit(onSubmitForm)}
        title="Entre na sua conta"
        link={{
          href: '/auth/create',
          text: 'Ainda não tem uma conta?',
          pageLink: 'começar',
        }}
      >
        <Input
          id="email"
          type="email"
          label="E-mail"
          required
          {...register('email')}
          error={errors.email}
        />
        <div className={stylesForm.boxForgot}>
          <Link href="/auth/forgot">Esqueceu a senha?</Link>
        </div>
        <Input
          id="password"
          type="password"
          label="Senha"
          required
          {...register('password')}
          error={errors.password}
        />
        <ButtonLoader
          text={loading ? 'Entrando...' : 'Entrar'}
          className="button"
          loading={loading}
          disabled={loading}
        />

        <div className={styles.boxLoginSocial}>
          <button>
            <Icon icon="flat-color-icons:google" />
            Fazer login com o Google
          </button>
          <button>
            <Icon icon="file-icons:microsoft-outlook" />
            Fazer login com o Outlook
          </button>
        </div>
      </Form>
    </LayoutUser>
  );
};
export default Login;
