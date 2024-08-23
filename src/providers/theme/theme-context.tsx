'use client';

import { ColorsEBD } from '@/components/settings/appearance/appearance';
import React, { createContext, useContext, useEffect } from 'react';

export const themeColors = {
  color_1: {
    hexP: '#773EC7',
    hexS: '#9956F6',
  },
  color_2: {
    hexP: '#F87359',
    hexS: '#f78a74',
  },
  color_3: {
    hexP: '#F859A8',
    hexS: '#f574b4',
  },
};

const ThemeProvider = createContext<{
  themeStorage: ColorsEBD;
  setThemeStorage: React.Dispatch<React.SetStateAction<ColorsEBD>>;
  setPropertyDoc: (props: { variable: string; prop: string }) => void;
} | null>(null);

export const ThemeContext = ({ children }: { children: React.ReactNode }) => {
  const [themeStorage, setThemeStorage] = React.useState<ColorsEBD>({
    hexP: themeColors.color_1.hexP,
    hexS: themeColors.color_1.hexS,
  });

  const setPropertyDoc = ({
    variable,
    prop,
  }: {
    variable: string;
    prop: string;
  }) => {
    document.documentElement.style.setProperty(variable, prop);
  };

  useEffect(() => {
    const storageTheme = window.localStorage.getItem('theme');
    if (storageTheme) {
      const { hexP, hexS }: ColorsEBD = JSON.parse(storageTheme);
      setThemeStorage({
        hexP,
        hexS,
      });
    }
  }, []);

  useEffect(() => {
    const { hexP, hexS } = themeStorage;
    const { color_2 } = themeColors;

    setPropertyDoc({
      variable: '--primary',
      prop: hexP,
    });

    setPropertyDoc({
      variable: '--secondary',
      prop: hexS,
    });
  }, [themeStorage]);

  return (
    <ThemeProvider.Provider
      value={{ themeStorage, setThemeStorage, setPropertyDoc }}
    >
      {children}
    </ThemeProvider.Provider>
  );
};
export const ThemeEBD = () => {
  const theme = useContext(ThemeProvider);
  if (theme === null) throw new Error('Algum erro ocorreu');
  return theme;
};
