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
    title: string | null;
    description: string | null;
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
        title:
          'TÍTULO: FAMILIA, UM PROJETO DE DEUS – Moldando lares estruturados, saudáveis e estabelecendo um legado de valores segundo a Bíblia Sagrada.',
        description: '',
      },
      {
        room: 'Soldadinhos de Cristo',
        title: '',
        description: '',
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
        title:
          'ORDENANÇAS BÍBLICAS – Doutrina Fundamentais Imperativas aos Cristãos para uma vida bem-sucedida e de Comunhão com Deus',
        description: '',
      },
      {
        room: 'Soldadinhos de Cristo',
        title: '',
        description: '',
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
        title:
          'A RELEVÂNCIA DA IGREJA, SUA ESSÊNCIA E MISSÃO – Reafirmando os fundamentos, a importância do compromisso com a Palavra de Deus, a Adoração sincera e o serviço autêntico, segundo os preceitos de Jesus Cristo.',
        description: '',
      },
      {
        room: 'Soldadinhos de Cristo',
        title: '',
        description: '',
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
        title:
          'OS DEZ MANDAMENTOS – Estabelecendo Princípios e Valores Morais, Sociais e Espirituais Imutáveis para uma Vida Abençoada',
        description: '',
      },
      {
        room: 'Soldadinhos de Cristo',
        title: '',
        description: '',
      },
    ],
  },
];
