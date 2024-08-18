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

const Call = () => {
  const params: { id: string } = useParams();
  const { dataDocs, loading } = DataBase<RoomType>('rooms');
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
    enrolleds: roomCurrent ? roomCurrent.students.length : 0,
    magazines: 0,
    offer: '',
    presences: 0,
    teacher: '',
    visitors: '',
  });

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

  React.useEffect(() => {
    if (roomCurrent)
      setAulaCurrent(roomCurrent.aulas.find((aula) => aula.id === params.id));
  }, [roomCurrent, params]);

  const verifyInputChecked = (id: number, type: TypeInput) => {
    return inputs[type].find((input) => input.id === id)?.checked ?? false;
  };

  const handleChangeChecked: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const id = target.id as TypeInput;
    const idStudent = Number(target.getAttribute('data-id'));

    setInputs((inputs) => {
      return {
        ...inputs,
        [id]: inputs[id].map((input) =>
          input.id === idStudent
            ? {
                ...input,
                checked: !input.checked,
                id: idStudent,
              }
            : input,
        ),
      };
    });
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
        ) : null}
        <div className={styles.containerInfo}>
          <div className={styles.boxInfo}>
            <h2>Resumo</h2>
            <div className={styles.boxResumo}>
              <div>
                <h3>Matriculados</h3>
                <p>0</p>
              </div>
              <div>
                <h3>Presentes</h3>
                <p>0</p>
              </div>
              <div>
                <h3>Ausentes</h3>
                <p>0</p>
              </div>
            </div>
          </div>
          {aulaCurrent?.status === 'Concluído' ? (
            <div className={`${styles.boxInfo} ${styles.boxFinish}`}>
              <h2>Chamada finalizada!</h2>
              <button className="button">Reabrir chamada</button>
            </div>
          ) : (
            <button className="button">Finalizar chamada</button>
          )}
        </div>
      </div>
    </GlobalLayout>
  );
};
export default Call;
