import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IHousesResponse {
	name?: string;
	[propName: string]: any;
}

export const housesApi = createApi({
  reducerPath: 'housesApi',
  tagTypes: ['Houses'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://anapioficeandfire.com/api/houses/' }),
  endpoints: (build) => ({
    getHouses: build.query<Record<string, any>[], void>({
      // query: (limit = '') => `goods?${limit && `_limit=${limit}`}`,
      query: () => '?page=1&pageSize=10',
    }),
    getOneHouse: build.query<IHousesResponse, string>({
      query: (name) => ({
        url: `?name=${name}`,
        method: "GET",
      }),
      transformResponse: (res: Array<IHousesResponse>) => res[0]
    }),
    searchHouse: build.query<IHousesResponse, string>({
			query: (name) => ({
				url: `?name=${name}`,
				method: "GET",
			}),
			transformResponse: (res: Array<IHousesResponse> | []) => {
				return res
					.filter((el) => el.name)
			},
		}),
  })
});

export const {useGetHousesQuery, useGetOneHouseQuery, useSearchHouseQuery} = housesApi;
