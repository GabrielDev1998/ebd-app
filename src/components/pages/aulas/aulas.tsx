'use client';

import React from 'react';
import styles from './aulas.module.css';
import GlobalLayout from '@/components/globalLayout/globalLayout';

const Aulas = () => {
  return (
    <GlobalLayout title="Aulas" description="Crie suas aulas">
      <div className={styles.aulas}></div>
    </GlobalLayout>
  );
};
export default Aulas;
