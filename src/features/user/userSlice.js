import { apiSlice } from "features/api/apiSlice";

const userExtendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: ({ userId, token }) => {
                return {
                    url: `/users/${userId}`,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            }
        })
    })
})



export const { useGetUserQuery } = userExtendedApiSlice; 