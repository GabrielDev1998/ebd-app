'use client';

import React from 'react';
import styles from './header.module.css';

import { Icon } from '@iconify/react/dist/iconify.js';
import { UseLayoutProvider } from '../layout-context';
import { AuthUser } from '@/firebase/auth/authProvider';

import ProfileCustom from '@/components/profileCustom/profileCustom';
import useOutside from '@/hooks/useOutside';
import LinkIcon from '@/components/linkIcon/linkIcon';

const Header = () => {
  const { isChanged, setIsChanged } = UseLayoutProvider();
  const { userCurrent, logoutUser } = AuthUser();
  const dataOutsideMenu = useOutside<HTMLDivElement>();

  return (
    <header className={styles.header}>
      <nav className={styles.navHeader}>
        <button
          type="button"
          aria-label="Abrir navegação lateral"
          className={styles.buttonNav}
          onClick={() => setIsChanged(!isChanged)}
        >
          <span>
            <Icon icon="solar:hamburger-menu-line-duotone" />
          </span>
        </button>
        {userCurrent && (
          <div className={styles.wrapperMenu}>
            <button
              className={styles.btnProfile}
              onClick={() => dataOutsideMenu.setIsOpen(true)}
            >
              <ProfileCustom
                src={userCurrent.photoURL ?? ''}
                alt={userCurrent.displayName ?? ''}
              />
            </button>
            <div
              className={`${styles.boxMenu} ${
                dataOutsideMenu.isOpen && styles.active
              }`}
              ref={dataOutsideMenu.ref}
            >
              <div className={styles.boxInfo}>
                <ProfileCustom
                  src={userCurrent.photoURL ?? ''}
                  alt={userCurrent.displayName ?? ''}
                  width={80}
                  height={80}
                />
                <div>
                  <h3>{userCurrent.displayName}</h3>
                  <p>{userCurrent.email}</p>
                </div>
                <button
                  type="submit"
                  className="button red"
                  onClick={() => logoutUser()}
                >
                  Sair da Plataforma
                </button>
              </div>
              <ul className={styles.menuUser}>
                <li>
                  <LinkIcon
                    text="Configurações"
                    href="/settings/profile"
                    icon="solar:settings-bold-duotone"
                  />
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
export default Header;
