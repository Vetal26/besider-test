import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Article } from './services/news/types'

interface NewsState {
  articles: Article[]
  lastUpdated: string | null
}

const initialState: NewsState = {
  articles: [],
  lastUpdated: null,
}

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addArticles: (state, action: PayloadAction<Article[]>) => {
      // Filter out duplicates and add new articles to the beginning
      const newArticles = action.payload.filter(
        (newArticle) =>
          !state.articles.some(
            (article) => article.web_url === newArticle.web_url,
          ),
      )
      state.articles = [...newArticles, ...state.articles]
      state.lastUpdated = new Date().toISOString()
    },
    setArticles: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload
      state.lastUpdated = new Date().toISOString()
    },
  },
})

export const { addArticles, setArticles } = newsSlice.actions
export default newsSlice.reducer
