import classNames from 'classnames';

import usePagination from '../../hooks/use-pagination';

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage = 1,
    pageSize,
  } = props.pagination;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  let lastPage = paginationRange[paginationRange.length - 1];

  const onFirst = () => {
    onPageChange(1);
  };

  const onLast = () => {
    onPageChange(lastPage);
  };

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <div className='pagination'>
      <button
        className={classNames('pagination-item button-arrow', {
          disabled: currentPage === 1,
        })}
        onClick={onFirst}
      >
        {'<<'}
      </button>
      <button
        className={classNames('pagination-item button-arrow', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        {'<'}
      </button>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === 'DOTS') {
          return (
            <span key='dots' className='pagination-item'>
              &#8230;
            </span>
          );
        }

        return (
          <button
            key={index}
            className={classNames('pagination-item page', {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        className={classNames('pagination-item button-arrow', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        {'>'}
      </button>
      <button
        className={classNames('pagination-item button-arrow', {
          disabled: currentPage === lastPage,
        })}
        onClick={onLast}
      >
        {'>>'}
      </button>
    </div>
  );
};

export default Pagination;
