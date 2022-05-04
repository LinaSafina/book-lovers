import { useParams } from 'react-router-dom';

import BookDetails from '../components/BookDetails';
import Loading from '../components/Layout/Loading';
import { useGetBookByIdQuery } from '../store/api-slice';

const Details = () => {
  const params = useParams();
  const {
    data: book,
    isLoading,
    isSuccess,
    isError,
  } = useGetBookByIdQuery(params.bookId);

  let content = (
    <p className='info'>We couldn't find this book's description</p>
  );

  if (isLoading) {
    content = <Loading />;
  }

  if (isSuccess && book.detail !== 'Not found.') {
    content = <BookDetails book={book} />;
  }

  if (isError) {
    content = <p className='info'>{'Something went wrong!'}</p>;
  }

  return <div className='details'>{content}</div>;
};

export default Details;
