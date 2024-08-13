'use client';

import React, { createContext, useContext, useRef } from 'react';
import { appInitialize } from '../settings';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import Global from '@/utils/global';

type TypeAuth = {
  createNewUser: (props: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  loginEmailAndPassword: (props: {
    email: string;
    password: string;
  }) => Promise<void>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userActive: User | null | boolean;
  userCurrent: User | null;
  logoutUser: () => void;
};

const { avatar } = Global();

const AuthProvider = createContext<TypeAuth | null>(null);
export const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const auth = getAuth(appInitialize);
  const userCurrent = auth.currentUser;

  const [loading, setLoading] = React.useState(false);
  const [userActive, setUserActive] = React.useState<User | null | boolean>(
    null,
  );

  //Criar novos usuários email e senha
  async function createNewUser({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCrendential) => {
        updateProfile(userCrendential.user, {
          displayName: name,
          photoURL: avatar({
            name,
            type: 'initials',
          }),
        });
      })
      .catch((error) => {
        if (error instanceof FirebaseError) {
          console.log(
            'Não foi possível realizar a criação de usuário ' + error.message,
          );
        }
      })
      .finally(() => setLoading(false));
  }

  // Realizar login com email e senha
  async function loginEmailAndPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User signed in successfully:', userCredential.user);
      })
      .catch((error) => {
        if (error instanceof FirebaseError) {
          console.log('Não foi possível entrar na sua conta ' + error.message);
        }
      })
      .finally(() => setLoading(false));
  }

  // Desconectar usuário;
  function logoutUser() {
    setLoading(true);
    signOut(auth)
      .catch((error) => {
        if (error instanceof FirebaseError) {
          console.log('Algum erro ocorreu ' + error.message);
        }
      })
      .finally(() => setLoading(false));
  }

  // Usuário ativo
  React.useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUserActive(user);
      } else {
        setUserActive(false);
      }
    });
  }, [auth]);

  return (
    <AuthProvider.Provider
      value={{
        createNewUser,
        loginEmailAndPassword,
        logoutUser,
        setLoading,
        loading,
        userActive,
        userCurrent,
      }}
    >
      {children}
    </AuthProvider.Provider>
  );
};
export const AuthUser = () => {
  const auth = useContext(AuthProvider);
  if (auth === null) throw new Error('Algum erro ocorreu');
  return auth;
};
