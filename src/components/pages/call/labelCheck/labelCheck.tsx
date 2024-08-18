'use client';

import React, { ChangeEventHandler } from 'react';
import styles from './labelCheck.module.css';
import { Icon } from '@iconify/react/dist/iconify.js';

type TypeLabel = React.ComponentProps<'input'> & {
  id: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const LabelCheck = ({ id, checked, onChange, ...props }: TypeLabel) => {
  return (
    <label id={id} className={`${styles.label} ${checked && styles.checked}`}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        {...props}
      />
      {id === 'presence' && <Icon icon="solar:user-check-rounded-bold" />}
      {id === 'bible' && <Icon icon="fa6-solid:book-bible" />}
      {id === 'magazine' && <Icon icon="solar:notebook-minimalistic-bold" />}
    </label>
  );
};
export default LabelCheck;
