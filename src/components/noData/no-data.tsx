'use client';

import React from 'react';
import styled from 'styled-components';

type INoData = React.ComponentProps<'div'> & {
  text: string;
};

const C = styled.div`
  display: flex;
  height: 300px;
  background-color: var(--background-2);
  width: 100%;
  border-radius: 8px;
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  & p {
    color: var(--textColor);
    font-weight: 400;
  }
`;

const NoData = ({ text, ...props }: INoData) => {
  return (
    <C {...props}>
      <p>{text}</p>
    </C>
  );
};
export default NoData;
