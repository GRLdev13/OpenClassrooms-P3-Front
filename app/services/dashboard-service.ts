// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DashBoardDTO } from "~/DTO/DashboardDTO";
import type { AddNotesDTO, DeleteNoteDTO } from "~/DTO/NotesDTO";
import type { Tag, AddTagDTO } from "~/DTO/TagDTO";
import type { LoginUserDTO, RegisterUserDTO } from "~/DTO/UserDTO";

//XSRF token shennanigans
// let token_headers = "";

// async function httpGetAsync(): Promise<Token | any> {
//   var xmlHttp = new XMLHttpRequest();
//   let toto = (xmlHttp.onreadystatechange = function () {
//     if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
//       return xmlHttp.response as Token;
//   });
//   xmlHttp.open("GET", "http://back.test/token", true); // true for asynchronous
//   xmlHttp.send(null);
//   return toto;
// }

// const getXsrfToken = async (): Promise<string | undefined> => {
//   if (token_headers) {
//     return token_headers;
//   } else {
//     const response = await httpGetAsync();

//     console.log("hard call sometinh", response);

//     if (response && response === typeof Token) {
//       const xsrfCookieString = response?.headers as Headers;
//       let toto = xsrfCookieString
//         .getSetCookie()
//         ?.find((cookie) => cookie.trim().startsWith("XSRF-TOKEN="));
//       if (xsrfCookieString) {
//         token_headers = toto ? toto : "";
//         return toto;
//       }
//     }
//   }
// };

// Define a service using a base URL and expected endpoints
export const dashBoardApi = createApi({
  reducerPath: "DashBoardApi",
  tagTypes: ["Dashboard"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://back.test/",
    credentials: "include",
    prepareHeaders: (headers) => {
      //TODO: XSRF token header potentialy idk
    },
  }),
  endpoints: (builder) => ({
    getLaravelToken: builder.query<Token, string>({
      query: (name) => `token`,
      transformResponse: (response: string, meta) => {
        return {
          data: response,
          headers: meta?.response?.headers, // Capture the headers here
        };
      },
    }),
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
export const { useGetLaravelTokenQuery } = dashBoardApi;
export const { useGetDashboardQuery } = dashBoardApi;
export const { usePutNoteMutation } = dashBoardApi;
export const { usePutTagMutation } = dashBoardApi;
export const { usePutLoginMutation } = dashBoardApi;
export const { usePutRegisterMutation } = dashBoardApi;
export const { useDeleteNoteMutation } = dashBoardApi;
