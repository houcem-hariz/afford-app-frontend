import React from 'react'
import { useState } from 'react';

export default function ProductPagination({ productsPerPage, totalProductsCount, paginate }) {
    const pageNumbers = [];
    const [currentPage, setCurrentPage] = useState(1)

    for (let i = 1; i <= Math.ceil(totalProductsCount / productsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className='pagination flex-wrap'>
          {pageNumbers.map(number => (
            <li key={number} className={(currentPage === number ? 'active ' : '') + 'controls page-item mx-1' }>
              <button onClick={() => {
                  paginate(number);
                  setCurrentPage(number)
                }} className='page-link'>
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
}