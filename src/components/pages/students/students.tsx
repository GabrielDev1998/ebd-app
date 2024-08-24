'use client';

import React from 'react';
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
import usePagination from '@/components/pagination/usePagination';
import Pagination from '@/components/pagination/pagination';
import { StudentsProps } from './formStudent/formStudent';
import Global from '@/utils/global';

const { popup } = Global();

const Students = () => {
  const { dataDocs, loading, updateData } = DataBase<RoomType>('rooms');
  const params: { id: string } = useParams();
  const [roomCurrent, setRoomCurrent] = React.useState<
    RoomType | null | undefined
  >(null);

  React.useEffect(() => {
    setRoomCurrent(dataDocs.find((room) => room.id === params.id));
  }, [params, dataDocs]);

  const dataPagination = usePagination(
    roomCurrent ? roomCurrent.students : [],
    7,
  );

  function handleClickDeleteStudent({ id, fullName }: StudentsProps) {
    if (roomCurrent) {
      const filteredStudents = roomCurrent.students.filter(
        (student) => student.id !== id,
      );

      popup(
        {
          icon: 'warning',
          title: 'Tem certeza?',
          text: 'Não será possível reverter essa ação.',
          confirmButtonText: 'Sim',
          cancelButtonText: 'Não',
          showCancelButton: true,
        },
        () => {
          updateData(
            roomCurrent.id,
            {
              ...roomCurrent,
              students: filteredStudents,
            },
            () => {
              popup({
                icon: 'success',
                title: 'Aluno deletado com sucesso.',
                text: `O aluno ${fullName} foi deletado com sucesso.`,
              });
            },
          );
        },
      );
    }
  }

  return (
    <GlobalLayout
      title="Alunos"
      description="Alunos matriculados na EBD"
      maxWidth="1400px"
    >
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

            {dataPagination.currentItens.length
              ? dataPagination.currentItens.map((student) => (
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
                        <Link
                          href="#"
                          onClick={() => handleClickDeleteStudent(student)}
                        >
                          <Icon icon="solar:trash-bin-trash-bold-duotone" />
                          Excluir
                        </Link>
                        <Link
                          href={`/student/edit/${roomCurrent?.id}/${student.id}`}
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
        <Pagination {...dataPagination} />
      </div>
    </GlobalLayout>
  );
};
export default Students;
