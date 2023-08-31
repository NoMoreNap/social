import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API = 'http://45.12.73.235:8666/'

const baseQuery = fetchBaseQuery({
    baseUrl: API,
})

export const coreApi = createApi({
    reducerPath: 'core',
    baseQuery,
    tagTypes: ['user'],
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
            providesTags: ['user'],
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
            invalidatesTags: ['user'],
        }),
    }),
})

export const postsApi = createApi({
    reducerPath: 'posts',
    baseQuery,
    tagTypes: ['posts'],
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
            invalidatesTags: ['posts'],
        }),
        getAllPosts: build.query({
            query: () => {
                return {
                    url: `/posts/`,
                }
            },
            providesTags: ['posts'],
        }),
        editPost: build.mutation({
            query: ({ data, token, id }) => {
                return {
                    url: `/posts/${id}/`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    method: 'PATCH',
                    body: data,
                }
            },
            invalidatesTags: ['posts'],
        }),
        del: build.mutation({
            query: ({ token, id }) => {
                return {
                    url: `/posts/${id}/`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['posts'],
        }),
        getById: build.query({
            query: (id) => {
                return {
                    url: `/posts/${id}`,
                    method: 'GET',
                }
            },
        }),
    }),
})

export const { useRegUserMutation, useLoginMutation, useGetInfoQuery, useEditInfoMutation } = coreApi
export const { useAddPostMutation, useGetAllPostsQuery, useEditPostMutation, useGetByIdQuery, useDelMutation } = postsApi
