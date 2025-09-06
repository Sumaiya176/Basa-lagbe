import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    register: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/user",
          method: "POST",
          body: userInfo,
        };
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
      }),
    }),

    resetPassword: builder.mutation({
      query: (body) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body,
      }),
    }),

    editProfile: builder.mutation({
      query: (body) => ({
        url: `/auth/edit-profile`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useResetPasswordMutation,
  useEditProfileMutation,
} = authApi;
