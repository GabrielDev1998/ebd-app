'use client';

import React from 'react';
import styles from './students.module.css';
import GlobalLayout from '@/components/globalLayout/globalLayout';

const Students = () => {
  return (
    <GlobalLayout title="Alunos" description="Alunos matriculados na EBD">
      <div className={styles.students}></div>
    </GlobalLayout>
  );
};
export default Students;
