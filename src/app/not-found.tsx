import React from 'react';
import styles from './not-found.module.css';
import Link from 'next/link';

import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Página não encontrada | EBD',
};

const Found = () => {
  return (
    <div className={styles.containerFound}>
      <div className={styles.boxFound}>
        <h1>Página não encontrada</h1>
        <p>
          A página que você está procurando foi movida, removida, renomeada ou
          pode nunca existir!
        </p>
        <Link href="/" className="button">
          Voltar para o Início
        </Link>
      </div>
    </div>
  );
};
export default Found;
