import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Article, NewsResponse, QueryArguments } from './types'

const API_KEY = import.meta.env.VITE_API_KEY

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  tagTypes: ['News'],
  endpoints: (builder) => ({
    getNews: builder.query<Article[], QueryArguments>({
      query: ({ year, month }) => `${year}/${month}.json?api-key=${API_KEY}`,
      transformResponse: (response: NewsResponse) => {
        return response.response.docs.reverse().slice(350, 380)
      },
      // transformResponse: (response: any) => {
      //   return response.response.docs.reduce(
      //     (map: Record<string, Array<Article>>, doc: any) => {
      //       const date = format(new Date(doc.pub_date), 'dd.MM.yyyy')
      //       const article = {
      //         id: doc._id,
      //         title: doc.abstract,
      //         url: doc.web_url,
      //         image: doc.multimedia?.[doc.multimedia.length - 1]?.url
      //           ? `https://www.nytimes.com/${
      //               doc.multimedia[doc.multimedia.length - 1].url
      //             }`
      //           : null,
      //         multimedia: doc.multimedia,
      //         date: doc.pub_date,
      //         source: doc.source,
      //       }
      //       if (map[date]) {
      //         map[date].push(article)
      //       } else {
      //         map[date] = [article]
      //       }

      //       return map
      //     },
      //     {},
      //   )
      // },
    }),
  }),
})

export const { useGetNewsQuery } = newsApi
