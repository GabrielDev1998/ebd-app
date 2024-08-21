export type TypeQuarter =
  | '1° trimestre'
  | '2° trimestre'
  | '3° trimestre'
  | '4° trimestre';

type TypeLessons = {
  quarter: TypeQuarter;
  numberQuarter: number;
  months: string[];
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
