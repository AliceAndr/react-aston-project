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
    getOneHouse: build.query<IHousesResponse, string>({
      query: (name) => ({
        url: `?name=${name}`,
        method: "GET",
      }),
      transformResponse: (res: Array<IHousesResponse>) => res[0]
    }),
    searchHouse: build.query<IHousesResponse, any>({
      query: (arg) => {
        const { filteredSearchTerm, checkedItems } = arg;
        console.log(filteredSearchTerm, checkedItems, 'pleaaaaaase')
        return {
          url: `?name=${filteredSearchTerm || ''}&hasTitles=${checkedItems.hasTitles || ''}&hasSeats=${checkedItems.hasSeats || ''}&hasDiedOut=${checkedItems.hasDiedOut || ''}&page=1&pageSize=30`,
        };
      },
      transformResponse: (res: Array<IHousesResponse> | []) => {
        return res
          .filter((el) => el.name)
      },
    }),
  })
});

export const { useGetOneHouseQuery, useSearchHouseQuery } = housesApi;
