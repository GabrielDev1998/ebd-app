'use client';

import React from 'react';
import styles from '../settings.module.css';
import { ThemeEBD, themeColors } from '@/providers/theme/theme-context';

export type ColorsEBD = {
  hexP: string;
  hexS: string;
};

const { color_1, color_2, color_3, color_4, color_5, color_6 } = themeColors;

const ColorOption = ({
  hexP,
  hexS,
}: {
  hexP: string;
  hexS: string;
} & ColorsEBD) => {
  const { setPropertyDoc } = ThemeEBD();

  const handleClickColor = () => {
    // Color primary
    setPropertyDoc({
      variable: '--primary',
      prop: hexP,
    });

    // Color secondary
    setPropertyDoc({
      variable: '--secondary',
      prop: hexS,
    });

    setPropertyDoc({
      variable: '--colorTextButton',
      prop: '#fff',
    });

    // Cores com toms mais claros, definir a cor do texto do botão com uma cor mais escura
    if (
      hexP === color_2.hexP ||
      hexP === color_5.hexP ||
      hexP === color_6.hexP
    ) {
      setPropertyDoc({
        variable: '--colorTextButton',
        prop: '#111',
      });
    }

    window.localStorage.setItem(
      'theme',
      JSON.stringify({
        hexP,
        hexS,
      }),
    );
  };

  return (
    <div data-cor={hexP} onClick={handleClickColor}>
      <span style={{ backgroundColor: hexP }}></span>
    </div>
  );
};

const Appearance = () => {
  return (
    <div className={`${styles.containerAppearance} animaLeft`}>
      <div className={styles.optionsColor}>
        <ColorOption hexP={color_1.hexP} hexS={color_1.hexS} />
        <ColorOption hexP={color_2.hexP} hexS={color_2.hexS} />
        <ColorOption hexP={color_3.hexP} hexS={color_3.hexS} />
        <ColorOption hexP={color_4.hexP} hexS={color_4.hexS} />
        <ColorOption hexP={color_5.hexP} hexS={color_5.hexS} />
        <ColorOption hexP={color_6.hexP} hexS={color_6.hexS} />
      </div>
    </div>
  );
};
export default Appearance;
