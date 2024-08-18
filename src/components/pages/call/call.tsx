'use client';

import React, { useMemo } from 'react';
import styles from './call.module.css';
import { useParams } from 'next/navigation';
import GlobalLayout from '@/components/globalLayout/globalLayout';
import DataBase from '@/firebase/db/database';
import { RoomType } from '../rooms/rooms';
import ProfileCustom from '@/components/profileCustom/profileCustom';
import { Loader } from '@/components/loader/loader';

const Call = () => {
  const params: { id: string } = useParams();
  const { dataDocs, loading } = DataBase<RoomType>('rooms');
  const [roomCurrent, setRoomCurrent] = React.useState<RoomType | null>(null);

  useMemo(() => {
    dataDocs.forEach((room) => {
      if (room.aulas.length) {
        const aula = room.aulas.find((aula) => aula.id === params.id);
        if (aula) setRoomCurrent(room);
      }
    });
  }, [dataDocs, params]);

  return (
    <GlobalLayout title="Chamada">
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
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </GlobalLayout>
  );
};
export default Call;
