'use client';

import React from 'react';
import styles from '../settings.module.css';
import { ThemeEBD, themeColors } from '@/providers/theme/theme-context';

export type ColorsEBD = {
  color: string;
};

const propsColors = themeColors;

const ColorOption = (props: ColorsEBD) => {
  const { setPropertyElement } = ThemeEBD();

  const handleClickColor = () => {
    Object.values(propsColors).forEach(({ name, hexP }) => {
      if (name.includes(props.color)) {
        setPropertyElement({
          variable: '--primary',
          prop: hexP,
        });

        window.localStorage.setItem(
          'theme',
          JSON.stringify({
            color: hexP,
            name,
          }),
        );
      }
    });
  };

  return (
    <div data-cor={props.color} onClick={handleClickColor}>
      <span style={{ backgroundColor: props.color }}></span>
    </div>
  );
};

const Appearance = () => {
  return (
    <div className="animaLeft">
      <div className={styles.optionsColor}>
        <ColorOption color={propsColors.color_1.name} />
        <ColorOption color={propsColors.color_2.name} />
        <ColorOption color={propsColors.color_3.name} />
        <ColorOption color={propsColors.color_4.name} />
      </div>
    </div>
  );
};
export default Appearance;
