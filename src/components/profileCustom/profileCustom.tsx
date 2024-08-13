'use client';

import React, { ForwardRefExoticComponent } from 'react';

const ProfileCustom = ({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      style={{
        width: width ?? 40,
        height: height ?? 40,
        borderRadius: '50%',
        objectFit: 'cover',
      }}
    />
  );
};
export default ProfileCustom;
