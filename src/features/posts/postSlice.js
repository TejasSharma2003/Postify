import { apiSlice } from 'features/api/apiSlice';

const postsExtendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: (result = [], error, arg) => {
        return result
          ? [...result.data.map(({ id }) => ({ type: 'Post', id })), 'Post']
          : ['Post']
      }
    }),

    getPost: builder.query({
      query: postId => `/post/${postId}`
    }),

    addNewPost: builder.mutation({
      query: ({ form: post, token }) => {
        const headers = new Headers();
        //Don't need to include this even if we are sending multipartdata
        // headers.append('Content-Type', 'multipart/form-data'); 
        headers.append('Authorization', `Bearer ${token}`)
        return {
          url: '/posts',
          method: 'POST',
          credentials: 'include',
          headers: headers,
          body: post,
        }
      },
      invalidatesTags: ['Post']
    }),
    deletePost: builder.mutation({
      query: ({ docId, token }) => ({
        url: `/posts/${docId}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      async onQueryStarted({ docId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getPosts', undefined, draft => {
            const postIndex = draft.data.findIndex(post => post.id === docId)
            if (postIndex != -1) {
              draft.data.splice(postIndex, 1);
            }
          })
        )
        try {
          await queryFulfilled;

        } catch (err) {
          throw (err);
        }
      }
    }),

    addReaction: builder.mutation({
      query: ({ postId, token }) => ({
        url: `/posts/like-post/${postId}`,
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      async onQueryStarted({ postId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getPosts', undefined, draft => {
            const post = draft.data.find(post => post.id === postId)

            if (post) {
              post.likeCount++;
            }
          })
        )
        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();

        }
      }
    }),
    removeReaction: builder.mutation({
      query: ({ postId, token }) => ({
        url: `/posts/dislike-post/${postId}`,
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      async onQueryStarted({ postId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getPosts', undefined, draft => {
            const post = draft.data.find(post => post.id === postId);
            if (post) {
              post.likeCount--;
            }
          })
        )
        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();

        }
      }
    })
  })
});

export const { useGetPostsQuery, useAddNewPostMutation, useAddReactionMutation, useRemoveReactionMutation, useDeletePostMutation } = postsExtendedApiSlice;
