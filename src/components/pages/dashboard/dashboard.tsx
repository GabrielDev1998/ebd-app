'use client';

import React from 'react';
import styles from './dashboard.module.css';
import GlobalLayout from '@/components/globalLayout/globalLayout';

const Dashboard = () => {
  return (
    <GlobalLayout title="Dashboard">
      <div className={styles.containerDashboard}></div>
    </GlobalLayout>
  );
};
export default Dashboard;
