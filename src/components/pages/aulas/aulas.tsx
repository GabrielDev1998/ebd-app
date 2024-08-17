'use client';

import React from 'react';
import styles from './aulas.module.css';
import GlobalLayout from '@/components/globalLayout/globalLayout';
import Calendar from './calendar/calendar';

const Aulas = () => {
  return (
    <GlobalLayout title="Aulas" description="Crie suas aulas" maxWidth="1400px">
      <Calendar />
    </GlobalLayout>
  );
};
export default Aulas;
