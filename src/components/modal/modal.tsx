'use client';

import React from 'react';
import styles from './modal.module.css';
import { Icon } from '@iconify/react/dist/iconify.js';

const Modal = ({
  children,
  title,
  modal,
  setModal,
  ...props
}: {
  title: string;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
} & React.PropsWithChildren &
  React.ComponentProps<'div'>) => {
  return (
    <div
      className={`${styles.containerModal} ${modal && styles.active}`}
      onClick={({ target, currentTarget }) => {
        if (target === currentTarget) setModal(false);
      }}
    >
      <div className={styles.boxModal} {...props}>
        <div className={styles.boxTitle}>
          <h2>{title}</h2>
          <button className="icon" onClick={() => setModal(false)}>
            <Icon icon="ic:outline-close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
export default Modal;
