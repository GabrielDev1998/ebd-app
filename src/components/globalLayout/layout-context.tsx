'use client';

import React, { createContext, useContext, ReactNode, useState } from 'react';

type TypeLayoutContext = {
  // Adicione as props necessárias para o layout
  isChanged: boolean;
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
};

const LayoutProvider = createContext<TypeLayoutContext | null>(null);

export const LayoutContext = ({ children }: { children: ReactNode }) => {
  const [isChanged, setIsChanged] = useState(false);

  return (
    <LayoutProvider.Provider value={{ isChanged, setIsChanged }}>
      {children}
    </LayoutProvider.Provider>
  );
};

export const UseLayoutProvider = () => {
  const layout = useContext(LayoutProvider);
  if (layout === null) throw new Error('Algum erro ocorreu');
  return layout;
};
