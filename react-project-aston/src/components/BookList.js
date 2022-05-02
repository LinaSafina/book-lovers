import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React from 'react';

import BookSummary from './BookSummary';
import { historyActions } from '../store/history-slice';
import { useEffect } from 'react';

const BookList = React.memo((props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchParams } = props;
  const location = useLocation();
  const previousPage = location.state?.page;
  const clickedComponent = location.state?.component

  const clickCardHandler = (bookId) => {
    navigate(`/details/${bookId}`);
  };

  useEffect(() => {
    if (previousPage === 'history'||clickedComponent==='pagination') {
      return;
    }

    dispatch(historyActions.add(searchParams));

    return;
  }, [dispatch, searchParams, previousPage, clickedComponent]);

  const bookList = props.books.map((book) => {
    return (
      <BookSummary
        key={book.id}
        book={book}
        onClick={()=>clickCardHandler(book.id)}
      />
    );
  });

  return <ul className='book-list'>{bookList}</ul>;
});

export default BookList;
