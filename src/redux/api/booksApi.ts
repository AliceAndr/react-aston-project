import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IBookResponse {
  name?: string;
  [propName: string]: any;
}

export const booksApi = createApi({
  reducerPath: 'booksApi',
  tagTypes: ['Books'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://anapioficeandfire.com/api/books/' }),
  endpoints: (build) => ({
    getAllBooks: build.query<Record<string, any>[], void>({
      query: () => '',
    }),
    getOneBook: build.query<IBookResponse, string>({
      query: (name) => ({
        url: `?name=${name}`,
        method: "GET",
      }),
      transformResponse: (res: Array<IBookResponse>) => res[0]
    }),
    searchBook: build.query<IBookResponse, string>({
      query: (name) => ({
        url: `?name=${name}`,
        method: "GET",
      }),
      transformResponse: (res: Array<IBookResponse> | []) => {
        return res
          .filter((el) => el.name)
          .map((el) => {
            return {
              name: el.name,
              authors: el.authors[0],
              mediaType: el.mediaType,
              isbn: el.isbn,
              numberOfPages: el.numberOfPages,
              publisher: el.publisher,
              released: el.released
            };
          });
      },
    }),
  })
});

export const { useGetAllBooksQuery, useGetOneBookQuery, useSearchBookQuery } = booksApi;
