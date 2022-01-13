import React from 'react'
import { useState, useEffect } from 'react';

export default function StorePagination({ storesPerPage, totalStoresCount, paginate }) {
    const pageNumbers = [];
    const [currentPage, setCurrentPage] = useState(1)

    for (let i = 1; i <= Math.ceil(totalStoresCount / storesPerPage); i++) {
      pageNumbers.push(i);
    }

    const generatePageNumbers = () => {
      return pageNumbers.map(number => (
        <li key={number} className={(currentPage === number ? 'active ' : '') + 'controls page-item custom-page-item mx-1' }>
          <button onClick={() => {
              paginate(number);
              setCurrentPage(number)
            }} className='page-link custom-page-link'>
            {number}
          </button>
        </li>
      ))
    }
    
    useEffect(()=> {
      generatePageNumbers()
    }, [currentPage])

    useEffect(()=> {
      return () => setCurrentPage(1)
    }, [totalStoresCount])
  
    const pages = generatePageNumbers()
    return (
      <nav>
        <ul className='pagination flex-wrap'>
          {pages}
        </ul>
      </nav>
    );
}