// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DashBoardDTO } from '~/DTO/DashboardDTO'
import type { NotesDTO } from '~/DTO/NotesDTO'
import type { Tag, TagDTO } from '~/DTO/TagDTO'

const getXsrfToken = (): string | undefined => {
  if (typeof document === 'undefined') {
    return undefined
  }

  const token = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith('XSRF-TOKEN='))
    ?.split('=')
    .slice(1)
    .join('=')

  return token ? decodeURIComponent(token) : undefined
};

// Define a service using a base URL and expected endpoints
export const dashBoardApi = createApi({
  reducerPath: 'DashBoardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL ?? '/api/',
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')

      const token = getXsrfToken()
      if (token) {
        headers.set('X-XSRF-TOKEN', token)
      }

      return headers
    },
  }),
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
    putTag: builder.mutation<Tag, Partial<Tag>>({
      query: (tag) => ({
        url: `tags`,
        method: 'POST',
          // Transform the class instance here before sending
        body: {
          name: tag.name,
        }
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDashboardQuery } = dashBoardApi
export const { usePutNoteMutation } = dashBoardApi
export const { usePutTagMutation } = dashBoardApi
