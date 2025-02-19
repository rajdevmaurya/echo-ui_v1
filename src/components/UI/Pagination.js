import React, { Component } from 'react';
import classes from './Pagination.module.css';

class Pagination extends Component {
  handlePagination = (newPage) => {
    const { pagination, searchJob, searchText } = this.props;
    if (!pagination || newPage < 0 || newPage >= pagination.totalPages) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    searchJob(searchText, newPage, pagination.size);
  };

  renderPaginationNumbers = () => {
    const { pagination = {} } = this.props;
    const { number = 0, totalPages = 1 } = pagination;
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(0, number - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li
          key={i}
          className={`${classes.pageItem} ${i === number ? classes.active : ''}`}
          role="button"
          tabIndex="0"
          onClick={() => this.handlePagination(i)}
          onKeyDown={(e) => e.key === 'Enter' && this.handlePagination(i)}
        >
          {i + 1}
        </li>
      );
    }

    return pages;
  };

  render() {
    const { pagination = {} } = this.props;
    const { number = 0, first, last } = pagination;

    return (
      <div className={classes.paginationContainer}>
        <ul className={classes.pagination}>
          <li
            className={`${classes.pageItem} ${first ? classes.disabled : ''}`}
            role="button"
            tabIndex={first ? "-1" : "0"}
            onClick={!first ? () => this.handlePagination(number - 1) : undefined}
            onKeyDown={(e) => !first && e.key === 'Enter' && this.handlePagination(number - 1)}
          >
            <i className="material-icons">chevron_left</i>
          </li>

          {this.renderPaginationNumbers()}

          <li
            className={`${classes.pageItem} ${last ? classes.disabled : ''}`}
            role="button"
            tabIndex={last ? "-1" : "0"}
            onClick={!last ? () => this.handlePagination(number + 1) : undefined}
            onKeyDown={(e) => !last && e.key === 'Enter' && this.handlePagination(number + 1)}
          >
            <i className="material-icons">chevron_right</i>
          </li>
        </ul>
      </div>
    );
  }
}

export default Pagination;
