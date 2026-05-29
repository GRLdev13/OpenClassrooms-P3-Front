// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DashBoardDTO } from '~/DTO/DashboardDTO'
import type { AddNotesDTO, DeleteNoteDTO } from '~/DTO/NotesDTO'
import type { Tag, AddTagDTO } from '~/DTO/TagDTO'

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
  tagTypes: ['Dashboard'],
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
      providesTags: ['Dashboard'],
    }),
    //Use Mutation for POST sending
    putNote: builder.mutation<AddNotesDTO, Partial<AddNotesDTO>>({
      query: (note) => ({
        url: `notes`,
        method: 'POST',
    //Explicitly mapp the body of the request so the object is correctly mapped to its JSON counterpart
        body: {
          text: note.text,
          tag_id: note.tag_id,
        }
      }),
      // invalidatesTags: ['Dashboard'],
    }),
    putTag: builder.mutation<AddTagDTO, Partial<AddTagDTO>>({
      query: (tag) => ({
        url: `tags`,
        method: 'POST',
        body: {
          name: tag.name,
        }
      }),
      // invalidatesTags: ['Dashboard'],
    }),
    deleteNote: builder.mutation<DeleteNoteDTO, Partial<DeleteNoteDTO>>({
      query: (note) => ({
        url: `notes/${note.id_note}`,
        method: 'DELETE',
      }),
      // // invalidatesTags: ['Dashboard'],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDashboardQuery } = dashBoardApi
export const { usePutNoteMutation } = dashBoardApi
export const { usePutTagMutation } = dashBoardApi
export const { useDeleteNoteMutation } = dashBoardApi
