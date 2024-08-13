'use client';

import React from 'react';
import styles from './loader.module.css';
import { Icon } from '@iconify/react/dist/iconify.js';

export const Loader = ({ text }: { text?: string }) => {
  return (
    <div className={styles.containerLoader}>
      <span>
        <Icon icon="svg-spinners:bars-scale-fade" />
      </span>
      {text && <p>{text}</p>}
    </div>
  );
};
