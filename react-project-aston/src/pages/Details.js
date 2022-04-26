import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookDetails from '../components/BookDetails';
import Loading from '../components/Layout/Loading';
import useFetch from '../hooks/use-fetch';

const Details = () => {
  const params = useParams();
  const {
    fetchBooksHandler,
    data: book,
    isLoading,
    error,
  } = useFetch(`/${params.bookId}`);

  useEffect(() => {
    const fetchData = async () => await fetchBooksHandler();
    fetchData();
  }, [fetchBooksHandler]);

  let content = (
    <p className='info'>We couldn't find this book's description</p>
  );

  if (book) {
    content = <BookDetails book={book} />;
  }

  if (isLoading) {
    content = <Loading />;
  }

  if (error) {
    content = <p className='info'>{error}</p>;
  }

  return <div className='details'>{content}</div>;
};

export default Details;
