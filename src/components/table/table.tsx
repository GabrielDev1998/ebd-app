'use client';

import React from 'react';
import styles from './table.module.css';
import Image from 'next/image';

export const Table = ({ children }: React.PropsWithChildren) => {
  return (
    <div className={styles.containerTable}>
      <div className={styles.boxTable}>
        <table>{children}</table>
      </div>
    </div>
  );
};

export const TableHead = ({ children }: React.PropsWithChildren) => {
  return <thead>{children}</thead>;
};

export const TableRow = ({ children }: React.PropsWithChildren) => {
  return <tr>{children}</tr>;
};

export const TableCell = ({
  type,
  children,
}: {
  type: 'td' | 'th';
} & React.PropsWithChildren) => {
  if (type === 'td') return <td>{children}</td>;
  if (type === 'th') return <th>{children}</th>;
};

export const TableBody = ({ children }: React.PropsWithChildren) => {
  return <tbody>{children}</tbody>;
};

export const TableNotFound = ({
  colSpan,
  text,
}: { colSpan: number; text?: string } & React.PropsWithChildren) => {
  return (
    <tr>
      <td colSpan={colSpan} className={styles.notFound}>
        {text ? <p>{text}</p> : <p>Sem informações</p>}
      </td>
    </tr>
  );
};

export const TableProfile = ({src, name}: {src: string, name: string}) => {
  return <div className={styles.profile}>
    <Image src={src} alt={name} width={40} height={40} 
    style={{borderRadius: "50%", objectFit: "cover"}} 
    priority />
    <p>{name}</p>
  </div>
}