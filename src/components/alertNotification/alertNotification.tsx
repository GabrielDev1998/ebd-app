'use client';

import React from 'react';
import styles from './alertNotification.module.css';

import { Toaster } from 'sonner';

const AlertNotification = () => {
  return (
    <div className={styles.alert}>
      <Toaster richColors position="top-right" />
    </div>
  );
};
export default AlertNotification;
