'use client';

import React from 'react';
import styles from './button-pattern.module.css';

const ButtonPattern = ({
  classname,
  text,
  ...props
}: { classname?: string; text: string } & React.ComponentProps<'button'>) => {
  return (
    <button {...props} className={`${styles.button} ${classname}`}>
      {text}
    </button>
  );
};
export default ButtonPattern;
