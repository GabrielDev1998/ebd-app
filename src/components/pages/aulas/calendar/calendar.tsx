'use client';

import React, { useEffect } from 'react';
import styles from './calendar.module.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import useCalendar from './useCalendar';

const Calendar = () => {
  const { dataCalendar, setMonthCurrent } = useCalendar();

  return (
    <div className={styles.containerCalendar}>
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
              <button className={styles.btnAdd}>
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
