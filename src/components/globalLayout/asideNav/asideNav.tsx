'use client';

import React from 'react';
import styles from './asideNav.module.css';
import Logo from '@/components/logo/logo';
import LinkIcon from '@/components/linkIcon/linkIcon';

import { usePathname } from 'next/navigation';
import { UseLayoutProvider } from '../layout-context';

const AsideNav = () => {
  const pathname = usePathname();
  const { isChanged, setIsChanged } = UseLayoutProvider();

  return (
    <>
      <div
        className={`overlay ${styles.overlayAside} ${
          isChanged && styles.active
        }`}
        onClick={() => setIsChanged(false)}
      ></div>

      <aside className={`${styles.asideNav} ${isChanged && styles.active}`}>
        <nav className={styles.nav}>
          <div className={styles.boxLogo}>
            <Logo />
          </div>
          <ul className={styles.menu}>
            <li>
              <LinkIcon
                className={`${styles.linkMenu} ${
                  pathname.includes('dashboard') && styles.active
                }`}
                href="/dashboard"
                text="Dashboard"
                icon="clarity:dashboard-solid"
              />
            </li>
            <li>
              <LinkIcon
                className={`${styles.linkMenu} ${
                  pathname.includes('enroll') && styles.active
                }`}
                href="/student/enroll"
                text="Matricular"
                icon="solar:user-plus-bold-duotone"
              />
            </li>
            <li>
              <LinkIcon
                className={`${styles.linkMenu} ${
                  pathname.includes('students') && styles.active
                }`}
                href="/students"
                text="Alunos"
                icon="solar:users-group-rounded-bold-duotone"
              />
            </li>
            <li>
              <LinkIcon
                className={`${styles.linkMenu} ${
                  pathname.includes('aulas') && styles.active
                }`}
                href="/aulas"
                text="Aulas"
                icon="solar:diploma-bold-duotone"
              />
            </li>
            <li>
              <LinkIcon
                className={`${styles.linkMenu} ${
                  pathname.includes('rooms') && styles.active
                }`}
                href="/rooms"
                text="Salas"
                icon="bxs:graduation"
              />
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};
export default AsideNav;
