export type TypeQuarter =
  | '1° trimestre'
  | '2° trimestre'
  | '3° trimestre'
  | '4° trimestre';

type TypeLessons = {
  quarter: TypeQuarter;
  numberQuarter: number;
  months: string[];
  monthsNumber: number[];
  lesson: {
    room: string;
    title: string;
    description: string;
  }[];
};

export const dataLesson: TypeLessons[] = [
  {
    quarter: '1° trimestre',
    numberQuarter: 1,
    months: ['Janeiro', 'Fevereiro', 'Março'],
    monthsNumber: [0, 1, 2],
    lesson: [
      {
        room: 'Guerreiros',
        title: 'Deus é Fiel com todos nós',
        description: 'Deus vai abençoar todos nós',
      },
      {
        room: 'Soldadinhos de Cristo',
        title: 'Deus é Fiel com todas as crianças',
        description: 'Deus vai abençoar todas as crianças',
      },
    ],
  },
  {
    quarter: '2° trimestre',
    numberQuarter: 2,
    months: ['Abril', 'Maio', 'Junho'],
    monthsNumber: [3, 4, 5],
    lesson: [
      {
        room: 'Guerreiros',
        title: 'Deus é Fiel com todos nós',
        description: 'Deus vai abençoar todos nós',
      },
      {
        room: 'Soldadinhos de Cristo',
        title: 'Deus é Fiel com todas as crianças',
        description: 'Deus vai abençoar todas as crianças',
      },
    ],
  },
  {
    quarter: '3° trimestre',
    numberQuarter: 3,
    months: ['Julho', 'Agosto', 'Setembro'],
    monthsNumber: [6, 7, 8],
    lesson: [
      {
        room: 'Guerreiros',
        title: 'Deus é Fiel com todos nós',
        description: 'Deus vai abençoar todos nós',
      },
      {
        room: 'Soldadinhos de Cristo',
        title: 'Deus é Fiel com todas as crianças',
        description: 'Deus vai abençoar todas as crianças',
      },
    ],
  },
  {
    quarter: '4° trimestre',
    numberQuarter: 4,
    months: ['Outubro', 'Novembro', 'Dezembro'],
    monthsNumber: [9, 10, 11],
    lesson: [
      {
        room: 'Guerreiros',
        title: 'Deus é Fiel com todos nós',
        description: 'Deus vai abençoar todos nós',
      },
      {
        room: 'Soldadinhos de Cristo',
        title: 'Deus é Fiel com todas as crianças',
        description: 'Deus vai abençoar todas as crianças',
      },
    ],
  },
];
