'use client';

import { ColorsEBD } from '@/components/settings/appearance/appearance';
import React, { createContext, useContext, useEffect } from 'react';

export const themeColors = {
  color_1: {
    name: 'roxo',
    hexP: '#773EC7',
  },
  color_2: {
    name: 'laranja',
    hexP: '#F87359',
  },
  color_3: {
    name: 'rosa',
    hexP: '#F859A8',
  },
  color_4: {
    name: 'vermelho',
    hexP: '#FF3030',
  },
  color_5: {
    name: 'azul',
    hexP: '#078DEE',
  },
  color_6: {
    name: 'amarelo',
    hexP: '#FDA92D',
  },
  color_7: {
    name: 'verde',
    hexP: '#00A76F',
  },
};

const ThemeProvider = createContext<{
  themeStorage: ColorsEBD;
  setThemeStorage: React.Dispatch<React.SetStateAction<ColorsEBD>>;
  setPropertyElement: (props: { variable: string; prop: string }) => void;
} | null>(null);

export const ThemeContext = ({ children }: { children: React.ReactNode }) => {
  const [themeStorage, setThemeStorage] = React.useState<ColorsEBD>({
    color: '#773EC7',
  });

  const setPropertyElement = ({
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
      const { color }: ColorsEBD = JSON.parse(storageTheme);
      setThemeStorage({
        color,
      });
    }
  }, []);

  useEffect(() => {
    const { color } = themeStorage;
    setPropertyElement({
      variable: '--primary',
      prop: color,
    });
  }, [themeStorage]);

  return (
    <ThemeProvider.Provider
      value={{ themeStorage, setThemeStorage, setPropertyElement }}
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
