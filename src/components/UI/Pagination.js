
import React from 'react';
import classes from './Pagination.module.css';

const Pagination = ({ pagination = {}, searchJob, searchText }) => {
  const { number = 0, totalPages = 1, first, last, size } = pagination;

  if (totalPages <= 1) return null;

  const handlePagination = (newPage) => {
    if (newPage < 0 || newPage >= totalPages) return;
    searchJob(searchText, newPage, size);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPaginationNumbers = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(0, number - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => {
      const pageNum = startPage + i;
      return (
        <li
          key={pageNum}
          className={`${classes.pageItem} ${pageNum === number ? classes.active : ''}`}
          role="button"
          tabIndex="0"
          onClick={() => handlePagination(pageNum)}
          onKeyDown={(e) => e.key === 'Enter' && handlePagination(pageNum)}
        >
          {pageNum + 1}
        </li>
      );
    });
  };

  return (
    <div className={classes.paginationContainer}>
      <ul className={classes.pagination}>
        {/* Previous Button */}
        <li
          className={`${classes.pageItem} ${first ? classes.disabled : ''}`}
          role="button"
          tabIndex={first ? "-1" : "0"}
          onClick={!first ? () => handlePagination(number - 1) : undefined}
          onKeyDown={(e) => !first && e.key === 'Enter' && handlePagination(number - 1)}
        >
          <i className="material-icons">chevron_left</i>
        </li>

        {/* Page Numbers */}
        {renderPaginationNumbers()}

        {/* Next Button */}
        <li
          className={`${classes.pageItem} ${last ? classes.disabled : ''}`}
          role="button"
          tabIndex={last ? "-1" : "0"}
          onClick={!last ? () => handlePagination(number + 1) : undefined}
          onKeyDown={(e) => !last && e.key === 'Enter' && handlePagination(number + 1)}
        >
          <i className="material-icons">chevron_right</i>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
