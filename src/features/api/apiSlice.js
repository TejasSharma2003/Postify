import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:4000/api/v1';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Post','Comment'],
  endpoints: (builder) => ({
    logoutUser: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: 'POST',
        credentials: 'include'
      })
    })
  }),
});


export const { useLogoutUserMutation } = apiSlice;
