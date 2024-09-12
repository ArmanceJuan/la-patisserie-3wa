import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    credentials: "include",
  }),
  tagTypes: ["Pastry", "User"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.error("Logout failed:", err);
        }
      },
    }),
    checkAuth: builder.query({
      query: () => "/me",
      transformResponse: (response) => {
        console.log("API response:", response);
        return response;
      },
      providesTags: ["User"],
    }),
    getPastries: builder.query({
      query: () => "/api/pastries",
      providesTags: ["Pastry"],
    }),
    addPastry: builder.mutation({
      query: (pastry) => ({
        url: "/api/pastrie",
        method: "POST",
        body: pastry,
      }),
      invalidatesTags: ["Pastry"],
    }),
    updatePastry: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/api/pastrie/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Pastry"],
    }),
    deletePastry: builder.mutation({
      query: (id) => ({
        url: `/api/pastrie/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Pastry"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useCheckAuthQuery,
  useGetPastriesQuery,
  useAddPastryMutation,
  useUpdatePastryMutation,
  useDeletePastryMutation,
} = apiSlice;
