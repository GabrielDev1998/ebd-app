'use client';

import React from 'react';
import styles from './loader.module.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import styled from 'styled-components';

export const Loader = ({ text }: { text?: string }) => {
  return (
    <div className={styles.containerLoader}>
      <span>
        <Icon icon="svg-spinners:3-dots-fade" />
      </span>
      {text && <p>{text}</p>}
    </div>
  );
};

const Button = styled.button`
  width: 100%;
  height: 55px !important;
  gap: var(--g-10) !important;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: transparent !important;
    color: var(--primary) !important;
    border-color: currentColor !important;
  }
`;

export const ButtonLoader = ({
  text,
  loading,
  ...props
}: { text: string; loading: boolean } & React.ComponentProps<'button'>) => {
  return (
    <Button className="button-2" {...props}>
      {loading && <Icon icon="svg-spinners:180-ring-with-bg" />}
      {text}
    </Button>
  );
};
