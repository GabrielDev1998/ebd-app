'use client';

import React from 'react';
import styles from './progress.module.css';
import GlobalLayout from '@/components/globalLayout/globalLayout';
import DataBase from '@/firebase/db/database';
import { RoomType } from '../../rooms/rooms';
import { useParams } from 'next/navigation';
import { StudentsProps } from '../formStudent/formStudent';
import ProfileCustom from '@/components/profileCustom/profileCustom';
import { Loader } from '@/components/loader/loader';
import ProgressBar from '@/components/progress-bar/progress-bar';
import {
  TypeAula,
  TypeCheckedCall,
  TypeInput,
} from '../../aulas/calendar/calendar';

const Progress = () => {
  const { dataDocs, loading } = DataBase<RoomType>('rooms');
  const params: { id: string } = useParams();
  const [student, setStudent] = React.useState<
    StudentsProps | null | undefined
  >(null);
  const [aulas, setAulas] = React.useState<TypeAula[]>([]);
  const [aproveitamento, setAproveitamento] = React.useState<{
    aulas: number;
    presences: number;
    absences: number;
    bibles: number;
    magazines: number;
    puntuactions: number;
    progress: number;
  }>({
    aulas: 0,
    presences: 0,
    absences: 0,
    bibles: 0,
    magazines: 0,
    puntuactions: 0,
    progress: 0,
  });

  React.useEffect(() => {
    dataDocs.forEach((room) => {
      room.students.forEach((student) => {
        if (student.id === Number(params.id)) setStudent(student);
      });
    });
  }, [dataDocs, params]);

  React.useEffect(() => {
    if (student) {
      dataDocs.forEach((room) => {
        room.students.forEach(({ id }) => {
          if (id === student.id) setAulas(room.aulas);
        });
      });
    }
  }, [dataDocs, student]);

  React.useMemo(() => {
    // Pegar a chamada de todas as aulas
    const getAllCall = () => {
      const arrCall: TypeCheckedCall[] = [];
      if (student) {
        aulas.forEach((aula) => {
          if (aula.call) {
            Object.values(aula.call).forEach((arrItem) => {
              arrItem.forEach((item) => arrCall.push(item));
            });
          }
        });
      }
      return arrCall;
    };

    const arrCall = getAllCall();

    const getTotalData = (type: TypeInput, condition: boolean) =>
      arrCall.filter((item) => item.type === type && item.checked === condition)
        .length;

    const getTotalPuntuactions = (type: TypeInput) => {
      return arrCall
        .filter((item) => item.type === type && item.points)
        .reduce((acc, item) => {
          return acc + item.points;
        }, 0);
    };

    const totalPresences = getTotalData('presence', true);
    const totalAbsences = getTotalData('presence', false);
    const totalBibles = getTotalData('bible', true);
    const totalMagazines = getTotalData('magazine', true);
    const completedClasses = aulas.filter(
      (aula) => aula.status === 'Concluído',
    ).length;
    const progress = Number(
      (completedClasses
        ? (completedClasses * 100) / totalPresences
        : 0
      ).toFixed(0),
    );

    const totalPointsPresence = getTotalPuntuactions('presence');
    const totalPointsBible = getTotalPuntuactions('bible');
    const totalPointsMagazine = getTotalPuntuactions('magazine');

    const totalPuntuactions =
      totalPointsPresence + totalPointsBible + totalPointsMagazine;

    setAproveitamento({
      aulas: aulas.length,
      presences: totalPresences,
      absences: totalAbsences,
      bibles: totalBibles,
      magazines: totalMagazines,
      puntuactions: totalPuntuactions,
      progress: progress,
    });
  }, [aulas, student]);

  return (
    <GlobalLayout
      title="Progresso"
      description="Progresso do aluno ao decorrer das aulas"
    >
      <div className={styles.containerProgress}>
        {loading && <Loader />}
        <div className={styles.box}>
          {student && (
            <div className={styles.boxProfile}>
              <ProfileCustom
                src={student.profile}
                alt={student.fullName}
                width={150}
                height={150}
              />
              <h3>{student.fullName}</h3>
            </div>
          )}
          <ProgressBar progress={aproveitamento.progress} />
          <div className={styles.boxAproveitamento}>
            <div className={styles.aproveitamento}>
              <h3>Aulas</h3>
              <p>{aproveitamento.aulas}</p>
            </div>
            <div className={styles.aproveitamento}>
              <h3>Presenças</h3>
              <p>{aproveitamento.presences}</p>
            </div>
            <div className={styles.aproveitamento}>
              <h3>Ausências</h3>
              <p>{aproveitamento.absences}</p>
            </div>
            <div className={styles.aproveitamento}>
              <p>{aproveitamento.puntuactions} Pontos</p>
            </div>
            <div className={styles.aproveitamento}>
              <h3>Bíblias</h3>
              <p>{aproveitamento.bibles}</p>
            </div>
            <div className={styles.aproveitamento}>
              <h3>Revistas</h3>
              <p>{aproveitamento.magazines}</p>
            </div>
          </div>
        </div>
        <div className={styles.box}></div>
      </div>
    </GlobalLayout>
  );
};
export default Progress;
