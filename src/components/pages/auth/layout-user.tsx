'use client';

import React from 'react';
import styles from './layout-user.module.css';
import AlertNotification from '@/components/alertNotification/alertNotification';

const LayoutUser = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AlertNotification />
      <div className={styles.layout}>
        <div className={styles.box}>{children}</div>
      </div>
    </>
  );
};
export default LayoutUser;
