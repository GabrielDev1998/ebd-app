'use client';

import React from 'react';
import styles from './calendar.module.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import useCalendar from './useCalendar';
import Modal from '@/components/modal/modal';
import Input from '@/components/form/input';
import Form from '@/components/form/form';
import CustomSelect from '@/components/form/select/custom-select';
import DataBase from '@/firebase/db/database';
import { RoomType } from '../../rooms/rooms';

const Calendar = () => {
  const { dataDocs } = DataBase<RoomType>('rooms');
  const { dataCalendar, setMonthCurrent } = useCalendar();
  const [modalAddAula, setModalAddAula] = React.useState(false);

  const [selectRooms, setSelectRooms] = React.useState('');

  return (
    <div className={styles.containerCalendar}>
      <Modal
        title="Adicionar aula"
        modal={modalAddAula}
        setModal={setModalAddAula}
      >
        <Form>
          <Input type="text" id="number_aula" label="Número" required />
          <Input type="text" id="title_aula" label="Título" required />
          <CustomSelect
            id="rooms"
            label="Salas"
            items={dataDocs.map((room) => room.name_room)}
            setValue={setSelectRooms}
            value={selectRooms}
          />
        </Form>
      </Modal>

      <div className={styles.navCalendar}>
        <div className={styles.boxControls}>
          <button
            className="icon"
            onClick={() => setMonthCurrent((monthCurrent) => monthCurrent - 1)}
          >
            <Icon icon="solar:alt-arrow-left-linear" />
          </button>
          <span>{dataCalendar.monthAndYear}</span>
          <button
            className="icon"
            onClick={() => setMonthCurrent((monthCurrent) => monthCurrent + 1)}
          >
            <Icon icon="solar:alt-arrow-right-linear" />
          </button>
        </div>
      </div>
      <div className={styles.boxCalendar}>
        {dataCalendar.dayAndWeek.map((item) => (
          <div key={item.day} className={styles.boxDay}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span className={styles.day}>{item.day}</span>
              <button
                className={styles.btnAdd}
                onClick={() => setModalAddAula(true)}
              >
                <Icon icon="ic:sharp-add" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Calendar;
