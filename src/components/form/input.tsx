'use client';

import React from 'react';
import styles from './form.module.css';
import { FieldError, FieldErrors } from 'react-hook-form';

type InputComponent = React.ComponentProps<'input'> & {
  id: string;
  label?: string;
  type?: string;
  required: boolean;
  placeholder?: string;
  error?: FieldError;
};

const Input = React.forwardRef<HTMLInputElement, InputComponent>(function input(
  myProps,
  ref,
) {
  const { label, required, placeholder, type, id, error, ...props } = myProps;
  return (
    <div className={styles.boxInput}>
      <input
        id={id}
        className={styles.input}
        type={type ?? 'text'}
        required={required}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  );
});

export default Input;

export const ColumnInput = ({ children }: React.PropsWithChildren) => {
  return <div className={styles.columnInput}>{children}</div>;
};
