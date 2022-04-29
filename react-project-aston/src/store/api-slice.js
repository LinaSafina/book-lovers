import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://gutendex.com/books' }),
  endpoints: (builder) => ({
    getBookById: builder.query({
      query: (id) => `/${id}`,
      // transformResponse: (responseData) => {
      //   const {
      //     id,
      //     title,
      //     authors,
      //     subjects,
      //     languages,
      //     copyright,
      //     formats,
      //     download_count,
      //   } = responseData;
      //   return {
      //     id,
      //     title,
      //     authors,
      //     subjects,
      //     languages,
      //     copyright,
      //     cover: formats['image/jpeg'],
      //     downloadCount: download_count,
      //   };
      // },
    }),
    getBooksByIds: builder.query({
      query: (ids) => `?ids=${ids}`,
    }),
    getBooks: builder.query({
      query: (query) => (query && `?${query}`) || '',
      // transformResponse: (responseData) => {
      //   const {
      //     count, results
      //   } = responseData;
      //   return {
      //    count, books: results
      //   }}
    }),
  }),
});

export const { useGetBookByIdQuery, useGetBooksByIdsQuery, useGetBooksQuery } =
  apiSlice;
