'use client';

import React from 'react';
import GlobalLayout from '@/components/globalLayout/globalLayout';
import FormStudent from '../formStudent/formStudent';

const Edit = () => {
  return (
    <GlobalLayout title="Editar dados" description="Atualizar dados do aluno">
      <FormStudent type="Update" />
    </GlobalLayout>
  );
};
export default Edit;
