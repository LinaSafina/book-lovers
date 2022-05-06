import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';

import BookSummary from './BookSummary';
import { historyActions } from '../store/history-slice';
import { BookData, LocationState } from '../types/types';

let isFirstLoading = true;

const BookList: React.FC<{ books: BookData[]; searchParams: {} }> = React.memo(
  (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { searchParams } = props;
    const location = useLocation();
    const state = location.state as LocationState;
    const previousPage = state?.page;
    const clickedComponent = state?.component;

    const clickCardHandler = (bookId: number) => {
      navigate(`/details/${bookId}`);
    };

    useEffect(() => {
      if (
        (previousPage === 'history' || clickedComponent === 'pagination') &&
        isFirstLoading === false
      ) {
        return;
      } else {
        dispatch(historyActions.add(searchParams));

        isFirstLoading = false;

        return;
      }
    }, [dispatch, searchParams, previousPage, clickedComponent]);

    const bookList = props.books.map((book) => {
      return (
        <BookSummary
          key={book.id}
          book={book}
          onClick={() => clickCardHandler(book.id)}
        />
      );
    });

    return <ul className='book-list'>{bookList}</ul>;
  }
);

export default BookList;
