// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DashBoardDTO } from '~/DTO/DashboardDTO'
import type { NotesDTO } from '~/DTO/NotesDTO'
import type { TagDTO } from '~/DTO/TagDTO'

// Define a service using a base URL and expected endpoints
export const dashBoardApi = createApi({
  reducerPath: 'DashBoardApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://back.test/' }),
  endpoints: (builder) => ({
    getDashboard: builder.query<DashBoardDTO, string>({
      query: (name) => `dashboard`,
    }),
    //MUTATIONS
    putNote: builder.mutation<NotesDTO, Partial<NotesDTO>>({
      query: (note) => ({
        url: `note`,
        method: 'POST',
        body: note,
      }),
    }),
    putTag: builder.mutation<TagDTO, Partial<TagDTO>>({
      query: (tag) => ({
        url: `tag`,
        method: 'POST',
        body: tag,
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDashboardQuery } = dashBoardApi
export const { usePutNoteMutation } = dashBoardApi
export const { usePutTagMutation } = dashBoardApi
