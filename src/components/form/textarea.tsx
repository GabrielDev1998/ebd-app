'use client';

import React from 'react';
import styles from './form.module.css';

const Textarea = ({ ...props }: React.ComponentProps<'textarea'>) => {
  return (
    <div className={styles.boxInput}>
      <textarea {...props}></textarea>
    </div>
  );
};
export default Textarea;
