'use client';

import React from 'react';
import styles from './form.module.css';

type textAreaProps = {
  id?: string;
  placeholder?: string;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, textAreaProps>(
  function textarea({ id, placeholder, ...props }, ref) {
    return (
      <div className={styles.boxInput}>
        <textarea
          ref={ref}
          id={id}
          placeholder={placeholder}
          {...props}
        ></textarea>
      </div>
    );
  },
);

export default Textarea;
