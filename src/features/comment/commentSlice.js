import { apiSlice } from "features/api/apiSlice";

const commentExtendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addComment: builder.mutation({
            query: ({ comment, token, postId }) => ({
                url: `/comments/${postId}`,
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: { comment }
            }),
            async onQueryStarted({ comment, postId }, { dispatch, queryFulfilled }) {
                try {
                    const { data: response } = await queryFulfilled;
                    const { data } = response;
                    console.log('this is comment ?', data);
                    const patchResult = dispatch(
                        apiSlice.util.updateQueryData('getPosts', undefined, draft => {
                            const post = draft.data.find(post => post.id === postId);
                            if (post) {
                                post.comments.push(data);
                            }
                        })
                    )
                } catch { }
            }
            // invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.postId }]
        }),
        removeComment: builder.mutation({
            query: ({ commentId }) => ({
                url: `/comments/${commentId}`,
                method: 'DELETE',
                // headers: {
                //     'Authorization': `Bearer ${token}`
                // }
            }),
            async onQueryStarted({ commentId, postId }, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;

                    const patchResult = dispatch(
                        apiSlice.util.updateQueryData('getPosts', undefined, draft => {
                            const post = draft.data.find(post => post.id === postId);
                            if (post) {
                                const commentIndex = post.comments.findIndex(comment => comment._id === commentId)
                                if (commentIndex != -1) {
                                    post.comments.splice(commentIndex, 1);
                                }
                            }
                        })
                    )
                } catch (err) {
                    throw (err)
                }
            }
        })
    })
})

export const { useAddCommentMutation, useRemoveCommentMutation } = commentExtendedApiSlice;

