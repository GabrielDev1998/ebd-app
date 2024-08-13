'use client';

import React from 'react';
import GlobalLayout from '@/components/globalLayout/globalLayout';
import FormStudent from '../formStudent/formStudent';

const Enroll = () => {
  return (
    <GlobalLayout
      title="Matricular"
      description="Realizar a matrícula do aluno na EBD"
    >
      <FormStudent type="Create" />
    </GlobalLayout>
  );
};
export default Enroll;
