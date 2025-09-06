import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),

    getUser: builder.query({
      query: () => ({
        url: `/user/getSingleUser`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserQuery } = userApi;
