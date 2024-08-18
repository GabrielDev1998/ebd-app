'use client';

import React from 'react';
import styles from './genre.module.css';
import Radio from '../radio';

export type TypeGenres = 'Masculino' | 'Feminino';

const Genre = ({
  genre,
  setGenre,
}: {
  genre: string;
  setGenre: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className={styles.genre}>
      <Radio
        id="masculino"
        label="Masculino"
        onChange={({ target }) => setGenre(target.value)}
        value={genre}
        name="rdsx"
      />
      <Radio
        id="feminino"
        label="Feminino"
        value={genre}
        onChange={({ target }) => setGenre(target.value)}
        name="rdsx"
      />
    </div>
  );
};
export default Genre;
