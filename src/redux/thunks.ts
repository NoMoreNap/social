import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API = 'http://45.12.73.235:8666/'

const baseQuery = fetchBaseQuery({
    baseUrl: API,
})

export const coreApi = createApi({
    reducerPath: 'core',
    baseQuery,
    endpoints: (build) => ({
        regUser: build.mutation({
            query: (data) => ({
                url: '/core/registration/',
                method: 'POST',
                body: data,
            }),
        }),
        login: build.mutation({
            query: (data) => {
                return {
                    url: '/core/authorization/',
                    method: 'POST',
                    body: data,
                }
            },
        }),
        getInfo: build.query({
            query: (id) => {
                return {
                    url: `/core/${id}`,
                }
            },
        }),
        editInfo: build.mutation({
            query: ({ data, token }) => {
                return {
                    url: `/core/change_profile/`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    method: 'POST',
                    body: data,
                }
            },
        }),
    }),
})

export const postsApi = createApi({
    reducerPath: 'posts',
    baseQuery,
    endpoints: (build) => ({
        addPost: build.mutation({
            query: ({ data, token }) => {
                return {
                    url: `/posts/`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    method: 'POST',
                    body: data,
                }
            },
        }),
    }),
})

export const { useRegUserMutation, useLoginMutation, useGetInfoQuery, useEditInfoMutation } = coreApi
export const { useAddPostMutation } = postsApi
