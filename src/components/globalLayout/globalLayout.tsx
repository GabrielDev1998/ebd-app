'use client';

import React from 'react';
import styles from './globalLayout.module.css';
import Header from './header/header';
import AsideNav from './asideNav/asideNav';
import { UseLayoutProvider } from './layout-context';

type GlobalLayoutComponent = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  maxWidth?: string;
};

const GlobalLayout = ({
  children,
  description,
  title,
  maxWidth,
}: GlobalLayoutComponent) => {
  const { isChanged } = UseLayoutProvider();

  return (
    <div className={`${styles.globalLayout} ${isChanged && styles.active}`}>
      <Header />
      <main className="container" style={{ maxWidth: maxWidth ?? '1200px' }}>
        {title && (
          <div className={styles.boxTitle}>
            <h2>{title}</h2>
            {description && <p>{description}</p>}
          </div>
        )}
        {children}
      </main>
      <AsideNav />
    </div>
  );
};
export default GlobalLayout;
