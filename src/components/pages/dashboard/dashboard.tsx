'use client';

import React from 'react';
import styles from './dashboard.module.css';
import GlobalLayout from '@/components/globalLayout/globalLayout';
import { dataLesson } from '@/lessons/lessons';
import { monthsToQuarters } from 'date-fns';
import { Icon } from '@iconify/react/dist/iconify.js';

const Dashboard = () => {
  const monthCurrent = new Date().getMonth();
  const quarterCurrent = monthsToQuarters(monthCurrent);
  const lessonQuarter = dataLesson[quarterCurrent];
  const totalSlides = lessonQuarter.lesson.length - 1;
  const [slide, setSlide] = React.useState(0);

  React.useEffect(() => {
    if (slide > totalSlides) setSlide(0);
    if (slide < 0) setSlide(totalSlides);
  }, [slide, totalSlides]);

  return (
    <GlobalLayout title="Dashboard" maxWidth="1400px">
      <div className={styles.containerDashboard}>
        <div className={`${styles.boxPanel} ${styles.boxLesson}`}>
          <div className={styles.boxControl}>
            <button
              className={`icon ${styles.control}`}
              onClick={() => setSlide(slide - 1)}
            >
              <Icon icon="solar:alt-arrow-left-line-duotone" />
            </button>
            <button
              className={`icon ${styles.control}`}
              onClick={() => setSlide(slide + 1)}
            >
              <Icon icon="solar:alt-arrow-right-line-duotone" />
            </button>
          </div>
          <p>{lessonQuarter.quarter}</p>
          <div className={styles.slideLessons}>
            {lessonQuarter.lesson.map((item, index) => (
              <div
                key={index}
                className={styles.lesson}
                style={{ transform: `translateX(-${`${slide}00%`})` }}
              >
                <p className={styles.room}>{item.room}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.boxPanel}>
          <h3>Aniversariantes</h3>
        </div>
        <div className={styles.boxPanel}>
          <h3>Ranking</h3>
        </div>
      </div>
    </GlobalLayout>
  );
};
export default Dashboard;
