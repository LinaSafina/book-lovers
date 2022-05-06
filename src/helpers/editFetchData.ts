import bookImage from '../assets/alif-caesar-rizqi-pratama-loUlSOXL81c-unsplash.jpg';
import { BookData } from '../types/types';

const editFetchData = (data: BookData) => {
  let authors = data.authors.reduce((prev, curr) => prev + curr.name + ' ', '');

  const bookCover =
    data?.formats['image/jpeg'] === undefined
      ? bookImage
      : data.formats['image/jpeg'];

  return {
    ...data,
    authors,
    cover: bookCover,
    downloadCount: data['download_count'],
  };
};

export default editFetchData;
