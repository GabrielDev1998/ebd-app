'use client';

import React from 'react';
import styles from './students.module.css';
import GlobalLayout from '@/components/globalLayout/globalLayout';
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/table/table';

const Students = () => {
  return (
    <GlobalLayout title="Alunos" description="Alunos matriculados na EBD">
      <div className={styles.containerStudents}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell type="th">Nome</TableCell>
              <TableCell type="th">Data de Nascimento</TableCell>
              <TableCell type="th">Turma</TableCell>
              <TableCell type="th">Gênero</TableCell>
              <TableCell type="th">Data da Matrícula</TableCell>
              <TableCell type="th">Status</TableCell>
              <TableCell type="th"></TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </div>
    </GlobalLayout>
  );
};
export default Students;
