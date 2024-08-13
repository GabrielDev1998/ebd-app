'use client';

import React from 'react';
import styles from './layout-user.module.css';
import Logo from '@/components/logo/logo';
import AlertNotification from '@/components/alertNotification/alertNotification';

type LayoutUserComponent = {
  children: React.ReactNode;
  text: string;
};

const LayoutUser = ({ children, text }: LayoutUserComponent) => {
  return (
    <>
      <AlertNotification />
      <div className={styles.layout}>
        <div className={styles.box}>
          <div className={styles.header}>
            <Logo />
          </div>
          <div className={styles.boxTitle}>
            <h1>{text}</h1>
          </div>
        </div>
        <div className={styles.box}>{children}</div>
      </div>
    </>
  );
};
export default LayoutUser;
