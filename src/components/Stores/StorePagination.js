import React from 'react'
import { useState } from 'react';

export default function StorePagination({ storesPerPage, totalStoresCount, paginate }) {
    const pageNumbers = [];
    const [currentPage, setCurrentPage] = useState(1)

    for (let i = 1; i <= Math.ceil(totalStoresCount / storesPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className='pagination flex-wrap'>
          {pageNumbers.map(number => (
            <li key={number} className={(currentPage === number ? 'active ' : '') + 'controls page-item mx-1' }>
              <a onClick={() => {
                  paginate(number);
                  setCurrentPage(number)
                }} className='page-link'>
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
}