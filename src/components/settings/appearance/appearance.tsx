'use client';

import React from 'react';
import styles from '../settings.module.css';
import { ThemeEBD, themeColors } from '@/providers/theme/theme-context';

export type ColorsEBD = {
  hexP: string;
  hexS: string;
};

const { color_1, color_2, color_3 } = themeColors;

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
    <div className="animaLeft">
      <div className={styles.optionsColor}>
        <ColorOption hexP={color_1.hexP} hexS={color_1.hexS} />
        <ColorOption hexP={color_2.hexP} hexS={color_2.hexS} />
        <ColorOption hexP={color_3.hexP} hexS={color_3.hexS} />
      </div>
    </div>
  );
};
export default Appearance;
