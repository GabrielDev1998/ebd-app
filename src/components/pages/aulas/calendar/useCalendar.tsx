'use client';

import React, { useMemo } from 'react';

type TypeDayAndWeek = { day: number; weekText: string; date: string }[];

type TypeCalendar = {
  firstDate: Date;
  lastDate: Date;
  monthAndYear: string;
  dayAndWeek: TypeDayAndWeek;
};

const useCalendar = () => {
  const OBJDate = useMemo(() => new Date(), []);
  const [monthCurrent, setMonthCurrent] = React.useState(OBJDate.getMonth());

  const dataCalendar: TypeCalendar | null = useMemo(() => {
    const arrMonths = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ];
    const ArrWeeks = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    const firstDate = new Date(OBJDate.getFullYear(), monthCurrent, 1); // Primeira data do mês
    const lastDate = new Date(OBJDate.getFullYear(), monthCurrent + 1, 0); // Última data do mês
    const month = firstDate.getMonth();
    const year = firstDate.getFullYear();

    const dayAndWeek: TypeDayAndWeek = [];
    for (let day = 1; day <= lastDate.getDate(); day++) {
      const OBJDate = new Date(year, month, day);
      const weekNumber = OBJDate.getDay();
      const weekText = ArrWeeks[weekNumber];
      const date = OBJDate.toLocaleDateString();

      dayAndWeek.push({
        day,
        weekText,
        date,
      });
    }

    return {
      firstDate,
      lastDate,
      monthAndYear: `${arrMonths[month]} ${year}`,
      dayAndWeek,
    };
  }, [OBJDate, monthCurrent]);

  return { monthCurrent, setMonthCurrent, dataCalendar };
};
export default useCalendar;
