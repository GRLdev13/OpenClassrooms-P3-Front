// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DashBoardDTO } from "~/DTO/DashboardDTO";
import type { AddNotesDTO, DeleteNoteDTO } from "~/DTO/NotesDTO";
import type { Tag, AddTagDTO } from "~/DTO/TagDTO";
import type { LoginUserDTO, RegisterUserDTO } from "~/DTO/UserDTO";

const getXsrfToken = (): string | undefined => {
  if (typeof document === "undefined") {
    return undefined;
  }

  const token = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("XSRF-TOKEN="))
    ?.split("=")
    .slice(1)
    .join("=");

  return token ? decodeURIComponent(token) : undefined;
};

// Define a service using a base URL and expected endpoints
export const dashBoardApi = createApi({
  reducerPath: "DashBoardApi",
  tagTypes: ["Dashboard"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://back.test/",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");

      const token = getXsrfToken();
      if (token) {
        headers.set("X-XSRF-TOKEN", token);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getDashboard: builder.query<DashBoardDTO, string>({
      query: (name) => `dashboard`,
      providesTags: ["Dashboard"],
    }),
    //Use Mutation for POST sending
    putNote: builder.mutation<AddNotesDTO, Partial<AddNotesDTO>>({
      query: (note) => ({
        url: `notes`,
        method: "POST",
        //Explicitly map the body of the request so the object is correctly mapped to its JSON counterpart
        body: {
          text: note.text,
          tag_id: note.tag_id,
        },
      }),
    }),
    putRegister: builder.mutation<RegisterUserDTO, Partial<RegisterUserDTO>>({
      query: (user) => ({
        url: `register`,
        method: "POST",
        body: {
          name: user.name,
          email: user.email,
          password: user.password,
          passwordConfirmation: user.passwordConfirmation,
        },
      }),
    }),
    putLogin: builder.mutation<LoginUserDTO, Partial<LoginUserDTO>>({
      query: (user) => ({
        url: `login`,
        method: "POST",
        body: {
          name: user.name,
          email: user.email,
          password: user.password,
        },
      }),
    }),
    putTag: builder.mutation<AddTagDTO, Partial<AddTagDTO>>({
      query: (tag) => ({
        url: `tags`,
        method: "POST",
        body: {
          name: tag.name,
        },
      }),
    }),
    deleteNote: builder.mutation<DeleteNoteDTO, Partial<DeleteNoteDTO>>({
      query: (note) => ({
        url: `notes/${note.id_note}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDashboardQuery } = dashBoardApi;
export const { usePutNoteMutation } = dashBoardApi;
export const { usePutTagMutation } = dashBoardApi;
export const { usePutLoginMutation } = dashBoardApi;
export const { usePutRegisterMutation } = dashBoardApi;
export const { useDeleteNoteMutation } = dashBoardApi;
