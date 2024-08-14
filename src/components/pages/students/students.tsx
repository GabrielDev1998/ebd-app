'use client';

import React, { useEffect, useMemo, useState } from 'react';
import styles from './students.module.css';
import GlobalLayout from '@/components/globalLayout/globalLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableNotFound,
  TableProfile,
  TableRow,
} from '@/components/table/table';
import DataBase from '@/firebase/db/database';
import { RoomType } from '../rooms/rooms';
import { useParams } from 'next/navigation';
import { StudentsProps } from './formStudent/formStudent';

const Students = () => {
  const { dataDocs } = DataBase<RoomType>('rooms');
  const params: { id: string } = useParams();

  // console.log('Renderizou');

  const roomCurrent = useMemo(() => {
    const data = dataDocs.find((room) => room.id === params.id);
    return data ?? null;
  }, [params, dataDocs]);

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
          <TableBody>
            {/* Dados dos alunos */}
            {roomCurrent?.students.length === 0 && (
              <TableNotFound
                colSpan={7}
                text="Não tem alunos matriculados nessa turma"
              />
            )}

            {/*... */}
          </TableBody>
        </Table>
      </div>
    </GlobalLayout>
  );
};
export default Students;
