'use client';

import React from 'react';
import styles from './call.module.css';
import { useParams } from 'next/navigation';
import GlobalLayout from '@/components/globalLayout/globalLayout';
import DataBase from '@/firebase/db/database';
import { RoomType } from '../rooms/rooms';
import ProfileCustom from '@/components/profileCustom/profileCustom';
import { Loader } from '@/components/loader/loader';
import LabelCheck from './labelCheck/labelCheck';
import {
  TypeAula,
  TypeInput,
  TypeInputCall,
  TypeReportAula,
} from '../aulas/calendar/calendar';
import Global from '@/utils/global';
import NoData from '@/components/noData/no-data';

const { popup } = Global();

const Call = () => {
  const params: { id: string } = useParams();
  const { dataDocs, loading, updateData } = DataBase<RoomType>('rooms');
  const [roomCurrent, setRoomCurrent] = React.useState<RoomType | null>(null);
  const [aulaCurrent, setAulaCurrent] = React.useState<
    TypeAula | null | undefined
  >(null);
  const [inputs, setInputs] = React.useState<TypeInputCall>({
    presence: [],
    bible: [],
    magazine: [],
  });
  const [reportAula, setReportAula] = React.useState<TypeReportAula>({
    absences: 0,
    bibles: 0,
    enrolleds: 0,
    magazines: 0,
    offer: '',
    presences: 0,
    teacher: '',
    visitors: '',
  });

  const [offer, setOffer] = React.useState('');
  const [teacher, setTeacher] = React.useState('');
  const [visitors, setVisitors] = React.useState('');

  React.useMemo(() => {
    dataDocs.forEach((room) => {
      if (room.aulas.length) {
        const aula = room.aulas.find((aula) => aula.id === params.id);
        if (aula) setRoomCurrent(room);
      }
    });
  }, [dataDocs, params]);

  React.useMemo(() => {
    const createInput = (types: TypeInput[]) => {
      if (roomCurrent?.students) {
        roomCurrent.students.forEach((student) => {
          types.forEach((type) => {
            setInputs((inputs) => {
              return {
                ...inputs,
                [type]: [
                  ...inputs[type],
                  {
                    id: student.id,
                    checked: false,
                    points: 0,
                    type,
                  },
                ],
              };
            });
          });
        });
      }
    };

    createInput(['presence', 'magazine', 'bible']);
  }, [roomCurrent]);

  React.useMemo(() => {
    if (roomCurrent)
      setAulaCurrent(roomCurrent.aulas.find((aula) => aula.id === params.id));
  }, [roomCurrent, params]);

  React.useMemo(() => {
    if (roomCurrent) {
      setReportAula({
        presences: inputs.presence.filter((input) => input.checked).length,
        absences: inputs.presence.filter((input) => !input.checked).length,
        bibles: inputs.bible.filter((input) => input.checked).length,
        magazines: inputs.magazine.filter((input) => input.checked).length,
        enrolleds: roomCurrent.students.length,
        offer,
        teacher,
        visitors,
      });
    }
  }, [roomCurrent, inputs, offer, teacher, visitors]);

  React.useMemo(() => {
    if (aulaCurrent && aulaCurrent.call) {
      setInputs(aulaCurrent.call);
      setOffer(aulaCurrent.report?.offer ?? '');
      setTeacher(aulaCurrent.report?.teacher ?? '');
      setVisitors(aulaCurrent.report?.visitors ?? '');
    }
  }, [aulaCurrent]);

  const verifyInputChecked = (id: number, type: TypeInput) => {
    return inputs[type].find((input) => input.id === id)?.checked ?? false;
  };

  const handleChangeChecked: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const id = target.id as TypeInput;
    const idStudent = Number(target.getAttribute('data-id'));

    if (aulaCurrent?.status !== 'Concluído') {
      setInputs((inputs) => {
        return {
          ...inputs,
          [id]: inputs[id].map((input) =>
            input.id === idStudent
              ? {
                  ...input,
                  checked: !input.checked,
                  id: idStudent,
                  type: id,
                  points: target.checked ? 50 : 0,
                }
              : input,
          ),
        };
      });
    } else {
      popup({
        icon: 'error',
        title: 'Atenção!',
        text: 'A chamada já está concluída.',
      });
    }
  };

  const updateDataAula = (data: TypeAula, text: string) => {
    if (roomCurrent && aulaCurrent) {
      updateData(
        roomCurrent.id,
        {
          ...roomCurrent,
          aulas: roomCurrent.aulas.map((aula) =>
            aula.id === aulaCurrent.id
              ? {
                  ...aula,
                  ...data,
                }
              : aula,
          ),
        },
        () => {
          popup({
            icon: 'success',
            title: 'Sucesso!',
            text,
          });
        },
      );
    }
  };

  const handleClickFinish = () => {
    if (aulaCurrent) {
      updateDataAula(
        {
          ...aulaCurrent,
          call: inputs,
          status: 'Concluído',
          report: reportAula,
        },
        'Chamada finalizada com sucesso',
      );
    }
  };

  const handleClickReopen = () => {
    if (aulaCurrent) {
      updateDataAula(
        {
          ...aulaCurrent,
          status: 'Em andamento',
        },
        'Chamada reaberta com sucesso.',
      );
    }
  };

  return (
    <GlobalLayout title="Chamada" description="Realizar a chamada dos alunos">
      <div className={styles.containerCall}>
        {loading && <Loader />}
        {roomCurrent?.students.length ? (
          <div className={styles.boxStudents}>
            {roomCurrent.students.map((student) => (
              <div key={student.id} className={styles.boxStudent}>
                <div className={styles.profileStudent}>
                  <ProfileCustom
                    src={student.profile}
                    alt={student.fullName}
                    width={40}
                    height={40}
                  />
                  <p>{student.fullName}</p>
                </div>
                <div className={styles.boxInputs}>
                  <LabelCheck
                    id="presence"
                    checked={verifyInputChecked(student.id, 'presence')}
                    onChange={handleChangeChecked}
                    data-id={student.id}
                  />
                  <LabelCheck
                    id="bible"
                    checked={verifyInputChecked(student.id, 'bible')}
                    onChange={handleChangeChecked}
                    data-id={student.id}
                  />
                  <LabelCheck
                    id="magazine"
                    checked={verifyInputChecked(student.id, 'magazine')}
                    onChange={handleChangeChecked}
                    data-id={student.id}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoData
            text="Não tem alunos matriculados nessa turma"
            style={{ backgroundColor: 'var(--bg-1)' }}
          />
        )}
        <div className={styles.containerInfo}>
          <div className={styles.boxInfo}>
            <h2>Resumo</h2>
            <div className={styles.boxResumo}>
              <div>
                <h3>Matriculados</h3>
                <p>{reportAula.enrolleds}</p>
              </div>
              <div>
                <h3>Presentes</h3>
                <p>{reportAula.presences}</p>
              </div>
              <div>
                <h3>Ausentes</h3>
                <p>{reportAula.absences}</p>
              </div>
              <div>
                <h3>Bíblias</h3>
                <p>{reportAula.bibles}</p>
              </div>
              <div>
                <h3>Revistas</h3>
                <p>{reportAula.magazines}</p>
              </div>
              <div>
                <h3>Visitantes</h3>
                <input
                  type="text"
                  id="visitors"
                  value={visitors}
                  onChange={({ target }) => setVisitors(target.value)}
                  placeholder="Visitantes"
                  disabled={aulaCurrent?.status === 'Concluído'}
                />
              </div>
              <div>
                <h3>Professor</h3>
                <input
                  type="text"
                  id="teacher"
                  value={teacher}
                  onChange={({ target }) => setTeacher(target.value)}
                  placeholder="Professor"
                  disabled={aulaCurrent?.status === 'Concluído'}
                />
              </div>
              <div>
                <h3>Ofertas</h3>
                <input
                  type="text"
                  id="offer"
                  value={offer}
                  onChange={({ target }) => setOffer(target.value)}
                  placeholder="Ofertas"
                  disabled={aulaCurrent?.status === 'Concluído'}
                />
              </div>
            </div>
          </div>
          {roomCurrent?.students.length ? (
            <>
              {aulaCurrent?.status === 'Concluído' ? (
                <div className={`${styles.boxInfo} ${styles.boxFinish}`}>
                  <h2>Chamada finalizada!</h2>
                  <button className="button" onClick={handleClickReopen}>
                    Reabrir chamada
                  </button>
                </div>
              ) : (
                <button className="button" onClick={handleClickFinish}>
                  Finalizar chamada
                </button>
              )}
            </>
          ) : null}
        </div>
      </div>
    </GlobalLayout>
  );
};
export default Call;
