'use client';

import { ColorsEBD } from '@/components/settings/appearance/appearance';
import React, { createContext, useContext, useEffect } from 'react';

export const themeColors = {
  color_1: {
    hexP: '#773EC7',
    hexS: '#9956F6',
  },
  color_2: {
    hexP: '#F8F859',
    hexS: '#f8e059',
  },
  color_3: {
    hexP: '#F87359',
    hexS: '#f78a74',
  },

  color_4: {
    hexP: '#F859A8',
    hexS: '#f574b4',
  },
  color_5: {
    hexP: '#3FB950',
    hexS: '#29903B',
  },
  color_6: {
    hexP: '#57E5F8',
    hexS: '#31e1f8',
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
    const { color_2, color_5, color_6 } = themeColors;

    setPropertyDoc({
      variable: '--primary',
      prop: hexP,
    });

    setPropertyDoc({
      variable: '--secondary',
      prop: hexS,
    });

    // Cores com toms mais claros, definir a cor do texto do botão com uma cor mais escura
    if (hexP === color_2.hexP || hexP === color_6.hexP) {
      setPropertyDoc({
        variable: '--colorTextButton',
        prop: '#111',
      });
    }
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
