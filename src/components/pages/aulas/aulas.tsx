'use client';

import React from 'react';
import styles from './aulas.module.css';
import GlobalLayout from '@/components/globalLayout/globalLayout';
import Calendar from './calendar/calendar';

const Aulas = () => {
  return (
    <GlobalLayout title="Aulas" description="Crie suas aulas">
      <Calendar />
    </GlobalLayout>
  );
};
export default Aulas;
