import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://gutendex.com/books' }),
  endpoints: (builder) => ({
    getBookById: builder.query({
      query: (id) => `/${id}`,
    }),
    getBooksByIds: builder.query({
      query: (ids) => `?ids=${ids}`,
      transformResponse: (responseData) => {
        const { results: books } = responseData;
        return books;
      },
    }),
    getBooks: builder.query({
      query: (query) => (query && `?${query}`) || '',
      transformResponse: (responseData) => {
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
