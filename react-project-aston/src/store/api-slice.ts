import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BookData, BooksData } from '../types/types';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://gutendex.com/books' }),
  endpoints: (builder) => ({
    getBookById: builder.query({
      query: (id) => `/${id}`,
      transformResponse: (responseData: BookData) => {
        const {
          id,
          detail,
          formats,
          title,
          download_count,
          languages,
          subjects,
          authors,
        } = responseData;
        return {
          id,
          detail,
          formats,
          title,
          download_count,
          languages,
          subjects,
          authors,
        };
      },
    }),
    getBooksByIds: builder.query({
      query: (ids) => `?ids=${ids}`,
      transformResponse: (responseData: BooksData) => {
        const { results: books } = responseData;
        return books;
      },
    }),
    getBooks: builder.query({
      query: (query) => (query && `?${query}`) || '',
      transformResponse: (responseData: BooksData) => {
        const { count, results } = responseData;
        return {
          count,
          books: results,
        };
      },
    }),
  }),
});

export const { useGetBookByIdQuery, useGetBooksByIdsQuery, useGetBooksQuery } =
  apiSlice;
