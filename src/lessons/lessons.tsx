type TypeQuarter =
  | '1° trimestre'
  | '2° trimestre'
  | '3° trimestre'
  | '4° trimestre';

type TypeRoom = {
  id: string;
  name: string;
  lesson: string;
};

type TypeLessons = {
  quarter: TypeQuarter;
  numberQuarter: number;
  rooms: TypeRoom[];
  months: string[];
};

export const dataLesson: TypeLessons[] = [
  {
    quarter: '1° trimestre',
    numberQuarter: 1,
    rooms: [
      {
        id: '',
        name: '',
        lesson: '',
      },
    ],
    months: ['Janeiro', 'Fevereiro', 'Março'],
  },
  {
    quarter: '2° trimestre',
    numberQuarter: 2,
    rooms: [
      {
        id: '',
        name: '',
        lesson: '',
      },
    ],
    months: ['Abril', 'Maio', 'Junho'],
  },
  {
    quarter: '3° trimestre',
    numberQuarter: 3,
    rooms: [
      {
        id: '',
        name: '',
        lesson: '',
      },
    ],
    months: ['Julho', 'Agosto', 'Setembro'],
  },
  {
    quarter: '4° trimestre',
    numberQuarter: 4,
    rooms: [
      {
        id: '',
        name: '',
        lesson: '',
      },
    ],
    months: ['Outubro', 'Novembro', 'Dezembro'],
  },
];
