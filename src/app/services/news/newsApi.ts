import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Article, NewsResponse, QueryArguments } from './types'

const API_KEY = import.meta.env.VITE_API_KEY

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json')
      return headers
    },
  }),
  endpoints: (builder) => ({
    getNews: builder.query<Article[], QueryArguments>({
      query: ({ year, month }) => `${year}/${month}.json?api-key=${API_KEY}`,
      transformResponse: (response: NewsResponse) => {
        return response.response.docs.reverse()
      },
    }),
  }),
})

export const { useGetNewsQuery } = newsApi
