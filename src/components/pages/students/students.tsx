'use client';

import React, { useMemo } from 'react';
import styles from './students.module.css';
import GlobalLayout from '@/components/globalLayout/globalLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableNotFound,
  TableOptions,
  TableProfile,
  TableRow,
} from '@/components/table/table';
import DataBase from '@/firebase/db/database';
import { RoomType } from '../rooms/rooms';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Loader } from '@/components/loader/loader';

const Students = () => {
  const { dataDocs, loading } = DataBase<RoomType>('rooms');
  const params: { id: string } = useParams();

  const roomCurrent = useMemo(() => {
    const data = dataDocs.find((room) => room.id === params.id);
    return data ?? null;
  }, [params, dataDocs]);

  return (
    <GlobalLayout title="Alunos" description="Alunos matriculados na EBD">
      <div className={styles.containerStudents}>
        {loading && <Loader />}
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
              >
                <Link href="/student/enroll" className="button-2">
                  <Icon icon="ic:outline-add" />
                  Matricular
                </Link>
              </TableNotFound>
            )}

            {roomCurrent?.students.length
              ? roomCurrent.students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell type="td">
                      <TableProfile
                        name={student.fullName}
                        src={student.profile}
                      />
                    </TableCell>
                    <TableCell type="td">{student.birthDate}</TableCell>
                    <TableCell type="td">{student.room}</TableCell>
                    <TableCell type="td">{student.genre}</TableCell>
                    <TableCell type="td">{student.date_enroll}</TableCell>
                    <TableCell type="td">
                      <span data-status={student.status}>{student.status}</span>
                    </TableCell>
                    <TableCell type="td">
                      <TableOptions>
                        <Link href="#">
                          <Icon icon="solar:trash-bin-trash-bold-duotone" />
                          Excluir
                        </Link>
                        <Link
                          href={`/student/edit/${roomCurrent.id}/${student.id}`}
                        >
                          <Icon icon="solar:document-add-bold-duotone" />
                          Editar
                        </Link>
                        <Link href={`/student/progress/${student.id}`}>
                          <Icon icon="solar:cup-star-bold-duotone" />
                          Progresso
                        </Link>
                      </TableOptions>
                    </TableCell>
                  </TableRow>
                ))
              : null}

            {/*... */}
          </TableBody>
        </Table>
      </div>
    </GlobalLayout>
  );
};
export default Students;
