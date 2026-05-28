// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DashBoardDTO } from '~/DTO/DashboardDTO'

// Define a service using a base URL and expected endpoints
export const dashBoardApi = createApi({
  reducerPath: 'DashBoardApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://back.test/' }),
  endpoints: (builder) => ({
    getDashboard: builder.query<DashBoardDTO, string>({
      query: (name) => `dashboard`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDashboardQuery } = dashBoardApi