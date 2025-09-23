import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["admin"],
    }),

    getUser: builder.query({
      query: () => ({
        url: `/user/getSingleUser`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    createAdmin: builder.mutation({
      query: (body) => ({
        url: `/user/createAdmin`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["admin"],
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserQuery, useCreateAdminMutation } =
  userApi;
