'use client';

import React from 'react';
import styles from './progress-bar.module.css';

const ProgressBar = ({
  progress,
  ...props
}: {
  progress: number;
} & React.ComponentProps<'div'>) => {
  return (
    <div {...props}>
      <div className={styles.infoProgress}>
        <p>{progress}%</p>
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: progress + '%' }}
        ></div>
      </div>
    </div>
  );
};
export default ProgressBar;
