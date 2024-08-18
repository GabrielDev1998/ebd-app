'use client';

import React from 'react';

import styles from './form.module.css';

type PropsRadio = {
  name: string;
  id: string;
  value: string;
  label?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const Radio = ({ label, name, value, id, onChange }: PropsRadio) => {
  return (
    <label className={styles.labelRadio}>
      <input
        aria-label="Radio"
        type="radio"
        name={name}
        id={id}
        value={label}
        checked={value === label}
        onChange={onChange}
      />
      <span className={value === label ? styles.checked : 'false'}></span>
      {label && label}
    </label>
  );
};

export default Radio;
