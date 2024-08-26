'use client';

import React from 'react';
import styles from './progress.module.css';
import GlobalLayout from '@/components/globalLayout/globalLayout';
import DataBase from '@/firebase/db/database';
import ProfileCustom from '@/components/profileCustom/profileCustom';
import ProgressBar from '@/components/progress-bar/progress-bar';
import NoData from '@/components/noData/no-data';

import { RoomType } from '../../rooms/rooms';
import { useParams } from 'next/navigation';
import { StudentsProps } from '../formStudent/formStudent';
import { Loader } from '@/components/loader/loader';
import {
  TypeAula,
  TypeCheckedCall,
  TypeInput,
} from '../../aulas/calendar/calendar';
import { dataLesson } from '@/lessons/lessons';
import { monthsToQuarters } from 'date-fns';

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
  const [buttonNav, setButtonNav] = React.useState(
    dataLesson[monthsToQuarters(new Date().getMonth())].quarter,
  );

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
        const studentCurrent = room.students.find(
          ({ id }) => id === student.id,
        );
        if (studentCurrent)
          setAulas(room.aulas.filter((aula) => aula.quarter === buttonNav));
      });
    }
  }, [dataDocs, student, buttonNav]);

  React.useMemo(() => {
    // Pegar a chamada de todas as aulas
    const getAllCall = () => {
      const arrCall: TypeCheckedCall[] = [];
      aulas.forEach((aula) => {
        if (aula.call) {
          Object.values(aula.call).forEach((arrItem) => {
            arrItem.forEach((item) => arrCall.push(item));
          });
        }
      });

      return arrCall;
    };

    const arrCall = getAllCall();

    const getTotalData = (type: TypeInput, condition: boolean) =>
      arrCall.filter(
        (item) =>
          item.type === type &&
          student?.id === item.id &&
          item.checked === condition,
      ).length;

    const getTotalPuntuactions = (type: TypeInput) => {
      return arrCall
        .filter(
          (item) =>
            item.type === type && student?.id === item.id && item.points,
        )
        .reduce((acc, item) => {
          return acc + item.points;
        }, 0);
    };

    const totalPresences = getTotalData('presence', true);
    const totalAbsences = getTotalData('presence', false);
    const totalBibles = getTotalData('bible', true);
    const totalMagazines = getTotalData('magazine', true);
    const progress = Number(
      (aulas.length ? (totalPresences * 100) / aulas.length : 0).toFixed(0),
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
      maxWidth="1400px"
    >
      <div className={styles.containerProgress}>
        {loading && <Loader />}
        <div className={`${styles.box} ${styles.containerProfileStudent}`}>
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
        <div className={styles.box}>
          <div className={styles.boxNav}>
            {dataLesson.map((item) => (
              <button
                key={item.quarter}
                className={`button-2 transparent ${
                  item.quarter === buttonNav && styles.active
                }`}
                onClick={() => {
                  setButtonNav(item.quarter);
                }}
              >
                <div className={styles.months}>
                  {item.months.map((month) => (
                    <span key={month}>{month}</span>
                  ))}
                </div>
                {item.quarter}
              </button>
            ))}
          </div>
          {aulas.length ? (
            <div className={styles.boxAulas}>
              {aulas.map((aula) => (
                <div className={styles.boxAula} key={aula.id}>
                  <div style={{ display: 'flex', gap: 'var(--g-10)' }}>
                    <span className={styles.numberAula}>
                      {aula.number_aula}
                    </span>
                    <div>
                      <p className={styles.date}>{aula.date}</p>
                      <h3 className={styles.titleAula}>{aula.title_aula}</h3>
                    </div>
                  </div>
                  <span
                    className={`${styles.identificador} ${
                      aula.call?.presence.filter(
                        (item) => item.checked && item.id === student?.id,
                      ).length
                        ? styles.presence
                        : styles.absence
                    }`}
                  ></span>
                </div>
              ))}
            </div>
          ) : (
            <NoData
              text="Aluno não compareceu nesse trimestre"
              style={{
                backgroundColor: 'var(--bgTertiary)',
                marginTop: 'var(--g-10)',
              }}
            />
          )}
          {/* <Pagination {...dataPagination} /> */}
        </div>
      </div>
    </GlobalLayout>
  );
};
export default Progress;
