'use client';

import React from 'react';
import { Tooltip } from 'react-tooltip';

const CustomTooltip = ({ id }: { id: string }) => {
  return <Tooltip id={id} place="top" />;
};
export default CustomTooltip;
