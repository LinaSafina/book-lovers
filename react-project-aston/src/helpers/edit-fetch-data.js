import bookImage from '../assets/alif-caesar-rizqi-pratama-loUlSOXL81c-unsplash.jpg';

const editFetchData = (data) => {
  let authors = data.authors.reduce((prev, curr) => prev + curr.name + ' ', '');

  let title = data.title;

  title = title.length > 50 ? title.slice(0, 49) + '...' : title;
  authors = authors.length > 40 ? authors.slice(0, 39) + '...' : authors;

  const bookCover =
    data?.formats['image/jpeg'] === undefined
      ? bookImage
      : data.formats['image/jpeg'];

  return {
    ...data,
    title,
    authors,
    cover: bookCover,
  };
};

export default editFetchData;
