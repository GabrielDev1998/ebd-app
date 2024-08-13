'use client';

import React from 'react';
import styles from './logo.module.css';
import Link from 'next/link';

import { Icon } from '@iconify/react/dist/iconify.js';

const Logo = () => {
  return (
    <Link href="/" className={styles.logo}>
      <Icon icon="bxs:graduation" />
    </Link>
  );
};
export default Logo;
