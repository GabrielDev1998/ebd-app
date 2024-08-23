'use client';

import React from 'react';
import styles from './custom-select.module.css';
import useOutside from '@/hooks/useOutside';
import { Icon } from '@iconify/react/dist/iconify.js';

const CustomSelect = ({
  label,
  items,
  setValue,
  value,
  className,
  ...props
}: {
  label?: string;
  items: string[];
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  className?: string;
} & React.ComponentProps<'div'>) => {
  const { isOpen, ref, setIsOpen } = useOutside<HTMLUListElement>();

  const handleClickSelect: React.MouseEventHandler = ({
    target,
    currentTarget,
  }) => {
    if (target === currentTarget) setIsOpen(true);
  };

  return (
    <>
      {isOpen && <div className={`overlay ${styles.overlaySelect}`}></div>}
      <div className={`${styles.boxSelect} ${className}`} {...props}>
        {label && (
          <label
            className={`${value && styles.active}`}
            style={isOpen ? { color: 'var(--textColor-2)', top: '-10px' } : {}}
          >
            {label}
          </label>
        )}
        <div className={styles.select} onClick={handleClickSelect}>
          {value && <span className={styles.optionValue}>{value}</span>}
          <i className={`${styles.arrow} ${isOpen && styles.active}`}>
            <Icon icon="solar:alt-arrow-down-linear" />
          </i>
          <ul
            className={styles.listOptions}
            ref={ref}
            style={
              isOpen
                ? { visibility: 'visible', opacity: '1' }
                : { visibility: 'hidden', opacity: '0' }
            }
          >
            {items.map((item) => (
              <li
                key={item}
                onClick={() => {
                  setValue(item);
                  setIsOpen(false);
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
export default CustomSelect;
