import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createListing: builder.mutation({
      query: (body) => {
        console.log(body);
        return {
          url: "/listing",
          method: "POST",
          body: body,
        };
      },
    }),

    getAllListing: builder.query({
      query: () => {
        return {
          url: "/listing",
          method: "GET",
        };
      },
    }),

    getSingleListing: builder.query({
      query: (id) => {
        return {
          url: `/listing/${id}`,
          method: "GET",
        };
      },
    }),

    updateListing: builder.mutation({
      query: (body) => {
        return {
          url: "/listing",
          method: "POST",
          body: body,
        };
      },
    }),

    deleteListing: builder.mutation({
      query: (id) => {
        console.log(id);
        return {
          url: `/listing/${id}`,
          method: "DELETE",
        };
      },
    }),

    myListing: builder.query({
      query: () => {
        console.log("kkkkkk");
        return {
          url: "/listing/myListings",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useCreateListingMutation,
  useUpdateListingMutation,
  useGetAllListingQuery,
  useGetSingleListingQuery,
  useDeleteListingMutation,
  useMyListingQuery,
} = authApi;
