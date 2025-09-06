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
      invalidatesTags: ["Listing"],
    }),

    getAllListing: builder.query({
      query: () => {
        return {
          url: "/listing",
          method: "GET",
        };
      },
      providesTags: ["Listing"],
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
      invalidatesTags: ["Listing"],
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

    savedProperty: builder.mutation({
      query: (id) => {
        return {
          url: "/listing/savedProperty",
          method: "POST",
          body: { id },
        };
      },
      invalidatesTags: ["SavedProperty"],
    }),

    getSavedProperty: builder.query({
      query: () => {
        return {
          url: "/listing/savedProperty",
          method: "GET",
        };
      },
      providesTags: ["SavedProperty"],
    }),

    removeSavedProperty: builder.mutation({
      query: (id) => {
        return {
          url: `/listing/savedProperty/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["SavedProperty"],
    }),

    recentlyViewed: builder.mutation({
      query: (id) => {
        return {
          url: "/listing/recentlyViewed",
          method: "POST",
          body: { id },
        };
      },
      invalidatesTags: ["RecentlyViewedProperty"],
    }),

    getViewedProperty: builder.query({
      query: () => {
        return {
          url: "/listing/recentlyViewed",
          method: "GET",
        };
      },
      providesTags: ["RecentlyViewedProperty"],
    }),

    removeViewedProperty: builder.mutation({
      query: (id) => {
        return {
          url: `/listing/recentlyViewed/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["RecentlyViewedProperty"],
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
  useSavedPropertyMutation,
  useGetSavedPropertyQuery,
  useRemoveSavedPropertyMutation,
  useRecentlyViewedMutation,
  useGetViewedPropertyQuery,
  useRemoveViewedPropertyMutation,
} = authApi;
