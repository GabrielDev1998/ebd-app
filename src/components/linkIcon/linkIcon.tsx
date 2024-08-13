'use client';

import Link from 'next/link';
import React from 'react';

import styles from './linkIcon.module.css';
import styled from 'styled-components';
import { Icon } from '@iconify/react/dist/iconify.js';

type LinkIconComponent = {
  href: string;
  text: string;
  icon: string;
  className?: string;
};

const IconElement = styled.span`
  width: 24px;
  height: 24px;
  color: currentColor;
  & svg {
    width: 100%;
    height: 100%;
  }
`;

const LinkIcon = ({
  href,
  text,
  icon,
  className,
  ...props
}: LinkIconComponent & React.ComponentProps<'a'>) => {
  return (
    <Link href={href} className={`${styles.link} ${className}`} {...props}>
      <IconElement>
        <Icon icon={icon} />
      </IconElement>
      <span>{text}</span>
    </Link>
  );
};
export default LinkIcon;
