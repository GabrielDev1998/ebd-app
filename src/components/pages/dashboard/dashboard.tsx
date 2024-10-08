'use client';

import React from 'react';
import styles from './dashboard.module.css';
import GlobalLayout from '@/components/globalLayout/globalLayout';
import DataBase from '@/firebase/db/database';

import { dataLesson, TypeQuarter } from '@/lessons/lessons';
import { monthsToQuarters } from 'date-fns';
import { Icon } from '@iconify/react/dist/iconify.js';
import { RoomType } from '../rooms/rooms';
import Global from '@/utils/global';
import BirthDay from './birth-day/birth-day';
import { Loader } from '@/components/loader/loader';
import Graphic from '@/components/graphic/graphic';
import CustomSelect from '@/components/form/select/custom-select';

export type typeDataStudent = {
  name: string;
  room: string;
  birthDate: string;
};

type TypeDataBirthDay = {
  quarter: typeDataStudent[];
  today: typeDataStudent[];
  month: typeDataStudent[];
};

const { zeroLeft, convertCurrency } = Global();

const Dashboard = () => {
  const { dataDocs, loading } = DataBase<RoomType>('rooms');
  const monthCurrent = new Date().getMonth();
  const quarterCurrent = monthsToQuarters(monthCurrent);
  const lessonQuarter = dataLesson[quarterCurrent];

  const totalSlides = lessonQuarter.lesson.length - 1;
  const [slide, setSlide] = React.useState(0);

  const [studentsBirthDay, setStudentsBirthDay] = React.useState<
    typeDataStudent[]
  >([]);

  const [dataBirthDay, setDataBirthDay] = React.useState<TypeDataBirthDay>({
    quarter: [],
    today: [],
    month: [],
  });

  const refZeroALeft = React.useRef(zeroLeft);
  const [selectRooms, setSelectRooms] = React.useState('');
  const [graphicOffer, setGraphicOffer] = React.useState<
    {
      quarter: TypeQuarter;
      total: number;
    }[]
  >([]);

  React.useEffect(() => {
    if (slide > totalSlides) setSlide(0);
    if (slide < 0) setSlide(totalSlides);
  }, [slide, totalSlides]);

  React.useEffect(() => {
    dataDocs.forEach((room) => {
      setStudentsBirthDay([]);

      room.students.forEach((student) => {
        setStudentsBirthDay((prevStudents) => [
          ...prevStudents,
          {
            name: student.fullName,
            room: student.room,
            birthDate: student.birthDate,
          },
        ]);
      });
    });
  }, [dataDocs]);

  React.useEffect(() => {
    const OBJDate = new Date();
    const dayCurr = OBJDate.getDate();
    const monthCurr = OBJDate.getMonth() + 1;

    const getBirthDays = (date: string) => {
      return studentsBirthDay.filter((student) =>
        student.birthDate.includes(date),
      );
    };

    const today = getBirthDays(
      `${refZeroALeft.current(dayCurr)}/${refZeroALeft.current(monthCurr)}`,
    );
    const month = getBirthDays(`/${refZeroALeft.current(monthCurr)}`);
    const { monthsNumber } = dataLesson[monthsToQuarters(monthCurr)];

    const arrQuarter: typeDataStudent[] = [];
    monthsNumber.forEach((month) => {
      getBirthDays(`/${refZeroALeft.current(month)}`).forEach((item) =>
        arrQuarter.push(item),
      );
    });

    setDataBirthDay({
      quarter: arrQuarter,
      today,
      month,
    });
  }, [studentsBirthDay]);

  React.useEffect(() => {
    if (dataDocs.length) setSelectRooms(() => dataDocs[1].name_room);
  }, [dataDocs]);

  React.useEffect(() => {
    const roomCurrent = dataDocs.find((room) => room.name_room === selectRooms);

    setGraphicOffer([]);

    if (roomCurrent) {
      const { aulas } = roomCurrent;

      const getTotalOffers = (quarter: TypeQuarter) => {
        const total = aulas
          .filter((aula) => aula.quarter === quarter)
          .map((item) => {
            const convertValue = item.report?.offer
              ? Number(item.report?.offer.replace('R$', '').replace(',', '.'))
              : 0;
            return convertValue;
          })
          .reduce((acc, value) => {
            return acc + value;
          }, 0);

        setGraphicOffer((prevGraphic) => [
          ...prevGraphic,
          {
            quarter,
            total,
          },
        ]);

        return { quarter, total };
      };

      getTotalOffers('1° trimestre');
      getTotalOffers('2° trimestre');
      getTotalOffers('3° trimestre');
      getTotalOffers('4° trimestre');
    }
  }, [dataDocs, selectRooms]);

  return (
    <GlobalLayout title="Dashboard" maxWidth="1400px">
      <div className={styles.containerDashboard}>
        {loading && <Loader />}
        <div className={styles.boxPanel}>
          <div className={`${styles.box} ${styles.boxLesson}`}>
            <div className={styles.boxControl}>
              <button
                className={`icon ${styles.control}`}
                onClick={() => setSlide(slide - 1)}
                aria-label="Voltar"
              >
                <Icon icon="solar:alt-arrow-left-line-duotone" />
              </button>
              <button
                className={`icon ${styles.control}`}
                onClick={() => setSlide(slide + 1)}
                aria-label="Próximo"
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
          <div className={`${styles.box} ${styles.containerRanking}`}>
            <h3>Ofertas</h3>
            <CustomSelect
              items={dataDocs.map((room) => room.name_room)}
              setValue={setSelectRooms}
              value={selectRooms}
              style={{ marginTop: 'var(--g-20)' }}
            />
            <div className={styles.boxGraphic}>
              <Graphic
                series={[
                  {
                    name: 'Ofertas',
                    data: graphicOffer.map((item) => item.total),
                  },
                ]}
                categories={graphicOffer.map((item) => item.quarter)}
                options={{
                  dataLabels: {
                    formatter(val) {
                      return `${convertCurrency(val)}`;
                    },
                  },
                  responsive: [
                    {
                      breakpoint: 960,
                      options: {
                        plotOptions: {
                          bar: {
                            horizontal: true,
                          },
                        },
                      },
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
        <div className={`${styles.box} ${styles.boxPanel}`}>
          <h3>Aniversariantes</h3>
          <div className={styles.containerBirthDay}>
            <BirthDay title="Hoje" data={dataBirthDay.today} />
            <BirthDay title="Mês" data={dataBirthDay.month} />
            <BirthDay title="Trimestre" data={dataBirthDay.quarter} />
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
};
export default Dashboard;
