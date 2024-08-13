'use client';

import React from 'react';
import styles from './form.module.css';
import Link from 'next/link';

type FormComponent = React.ComponentProps<'form'> & {
  children: React.ReactNode;
  className?: string;
  title?: string;
  link?: {
    text: string;
    href: string;
    pageLink: string;
  };
};

const Form = ({
  children,
  className,
  title,
  link,
  ...props
}: FormComponent) => {
  return (
    <div className={`${styles.boxForm} ${className}`}>
      {title && (
        <div className={styles.boxTitle}>
          <h2>{title}</h2>
          {link && (
            <p>
              {link.text} <Link href={link.href}>{link.pageLink}</Link>
            </p>
          )}
        </div>
      )}
      <form className={styles.form} {...props}>
        {children}
      </form>
    </div>
  );
};
export default Form;

