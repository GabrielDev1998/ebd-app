'use client';

import React from 'react';
import styles from '../dashboard.module.css';
import { typeDataStudent } from '../dashboard';

const BirthDay = ({
  title,
  data,
}: {
  title: string;
  data: typeDataStudent[];
}) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        {data.map((item, index) => (
          <div key={index} className={styles.boxBirthDay}>
            <div>
              <p>{item.name}</p>
              <p className={styles.room}>{item.room}</p>
            </div>
            <p>{item.birthDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BirthDay;
