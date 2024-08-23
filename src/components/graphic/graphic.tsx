'use client';

import React from 'react';
import styles from './graphic.module.css';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  Legend,
} from 'recharts';

const Graphic = () => {
  const data = [
    {
      name: 'Page A',
      points: 4000,
    },
    {
      name: 'Page B',
      points: 3000,
    },
    {
      name: 'Page C',
      points: 5000,
    },
    {
      name: 'Page D',
      points: 8000,
    },
  ];

  return (
    <div className={styles.graphic}>
      <ResponsiveContainer
        width="100%"
        height="100%"
        style={{ fontFamily: 'inherit', fontSize: '.845rem' }}
      >
        <BarChart width={150} height={40} data={data}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar dataKey="points" fill="var(--primary)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Graphic;
