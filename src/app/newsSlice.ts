import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Article } from './services/news/types'

interface NewsState {
  articles: Article[]
}

const initialState: NewsState = {
  articles: [],
}

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addNewArticles: (state, action: PayloadAction<Article[]>) => {
      // Filter out duplicates and add new articles to the beginning
      const newArticles = action.payload.filter(
        (newArticle) =>
          !state.articles.some(
            (article) => article.web_url === newArticle.web_url,
          ),
      )
      state.articles = [...newArticles, ...state.articles]
    },
    addOldArticles: (state, action: PayloadAction<Article[]>) => {
      state.articles = state.articles.concat(action.payload)
    },
  },
})

export const { addNewArticles, addOldArticles } = newsSlice.actions
export default newsSlice.reducer
