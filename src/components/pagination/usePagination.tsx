'use client';

import React from 'react';

function usePagination<T>(data: T[], itensPerPage: number = 10) {
  const [currentPage, setCurrentPage] = React.useState(0);

  const pages = Math.ceil(data.length / itensPerPage);
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItens = data.slice(startIndex, endIndex);

  return {
    pages,
    currentItens,
    setCurrentPage,
    currentPage,
  };
}

export default usePagination;
