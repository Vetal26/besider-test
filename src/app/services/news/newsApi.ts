/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Article } from './types'

const API_KEY = import.meta.env.VITE_API_KEY

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  endpoints: (builder) => ({
    getNews: builder.query<Article[], { year: number; month: number }>({
      query: ({ year, month }) => `${year}/${month}.json?api-key=${API_KEY}`,
      transformResponse: (response: any) => {
        return response.response.docs.map((doc: any) => ({
          id: doc._id,
          title: doc.abstract,
          url: doc.web_url,
          image: doc.multimedia?.[0]?.url
            ? `https://www.nytimes.com/${doc.multimedia[0].url}`
            : null,
          date: doc.pub_date,
          source: doc.source,
        }))
      },
    }),
  }),
})

export const { useGetNewsQuery } = newsApi
