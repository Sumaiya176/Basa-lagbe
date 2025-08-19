import { baseApi } from "@/redux/api/baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (body) => ({
        url: "/contact",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useSendMessageMutation } = contactApi;
