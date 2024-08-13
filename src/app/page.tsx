'use client';

import React from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function HomePage() {
  return (
    <div className={styles.containerHome}>
      <span className={styles.bg}></span>
      <div className={styles.boxHome}>
        <h1>Sistema de Gestão EBD {new Date().getFullYear()}</h1>
        <p>
          Sistema para realizar a gestão dos alunos na EBD. Gerar relatórios,
          dashboards, aniversariantes do dia, mês e trimestre.
        </p>
        <Link href="/dashboard" className="button">
          <Icon icon="solar:rocket-bold-duotone" />
          Acessar sistema
        </Link>
      </div>
    </div>
  );
}
