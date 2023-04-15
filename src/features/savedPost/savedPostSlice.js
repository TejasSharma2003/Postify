import { apiSlice } from "features/api/apiSlice";

const savedPostApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSavedPosts: builder.query({
            query: (token) => ({
                url: '/saved-posts',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }),
        addSavePost: builder.mutation({
            query: ({ postId, token }) => {
                return {
                    url: `/saved-posts/${postId}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            }
        }),
        removeSavedPost: builder.mutation({
            query: ({ postId, token }) => {
                return {
                    url: `/saved-posts/${postId}`,
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            }
        })
    })
})

export const { useGetSavedPostsQuery, useAddSavePostMutation, useRemoveSavedPostMutation } = savedPostApiSlice;