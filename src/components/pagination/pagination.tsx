import React from 'react';

import styles from './pagination.module.css';

type ITable = {
  pages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
};

function Pagination({ pages, currentPage, setCurrentPage }: ITable) {
  return (
    <div className={styles.controls}>
      <div className={styles.boxButtonPagination}>
        {Array.from(Array(pages), (_, index) => {
          return (
            <button
              type="button"
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`icon ${
                currentPage === index ? styles.active : 'false'
              }`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Pagination;
