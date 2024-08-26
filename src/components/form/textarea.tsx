'use client';

import React from 'react';
import styles from './form.module.css';

type textAreaProps = {
  id?: string;
  placeholder?: string;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, textAreaProps>(
  function Input(myProps, ref) {
    const { ...props } = myProps;
    return (
      <div className={styles.boxInput}>
        <textarea ref={ref} {...props}></textarea>
      </div>
    );
  },
);

export default Textarea;
