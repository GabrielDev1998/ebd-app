'use client';

import React from 'react';
import styles from './settings.module.css';
import GlobalLayout from '../globalLayout/globalLayout';
import LinkIcon from '../linkIcon/linkIcon';

import Profile from './profile/profile';
import Password from './password/password';
import Appearance from './appearance/appearance';

import { usePathname } from 'next/navigation';

const Settings = () => {
  const pathname = usePathname();

  function verifyPage(url: string) {
    return pathname.includes(url);
  }

  return (
    <GlobalLayout
      title="Configurações"
      description="Gerencie as informações de conta, dados pessoais e apararência da plataforma"
    >
      <div className={styles.containerSettings}>
        <aside className={styles.aside}>
          <ul className={styles.menu}>
            <li>
              <LinkIcon
                text="Editar perfil"
                href="profile"
                icon="solar:user-bold-duotone"
                className={`${verifyPage('profile') && styles.active}`}
              />
            </li>
            <li>
              <LinkIcon
                text="Alterar senha"
                href="password"
                icon="solar:lock-password-unlocked-bold-duotone"
                className={`${verifyPage('password') && styles.active}`}
              />
            </li>
            <li>
              <LinkIcon
                text="Aparência"
                href="appearance"
                icon="solar:pallete-2-bold-duotone"
                className={`${verifyPage('appearance') && styles.active}`}
              />
            </li>
          </ul>
        </aside>
        <div className={styles.boxContent}>
          {verifyPage('profile') && (
            <>
              <div className={styles.boxTitle}>
                <h2 className="title-24">Editar perfil</h2>
              </div>
              <Profile />
            </>
          )}

          {verifyPage('password') && (
            <>
              <div className={styles.boxTitle}>
                <h2 className="title-24">Alterar senha</h2>
              </div>
              <Password />
            </>
          )}

          {verifyPage('appearance') && (
            <div className={styles.boxAppearance}>
              <div className={styles.boxTitle}>
                <h2 className="title-24">Aparência</h2>
                <p>Definir a cor que a plataforma irá ficar.</p>
              </div>
              <Appearance />
            </div>
          )}
        </div>
      </div>
    </GlobalLayout>
  );
};
export default Settings;
