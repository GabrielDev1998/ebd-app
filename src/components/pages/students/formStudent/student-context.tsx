'use client';

import React, { createContext, useContext, ReactNode, useState } from 'react';

type StudentFormContextProps = {};

const StudentFormProvider = createContext<StudentFormContextProps | null>(null);

export const StudentFormContext = ({ children }: { children: ReactNode }) => {
  return (
    <StudentFormProvider.Provider value={{}}>
      {children}
    </StudentFormProvider.Provider>
  );
};

export const UseStudentFormContext = () => {
  const formStudent = useContext(StudentFormProvider);
  if (formStudent === null) throw new Error('Algum erro ocorreu');
  return formStudent;
};
