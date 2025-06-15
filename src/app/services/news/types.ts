export interface ArticleOld {
  id: string
  title: string
  url: string
  image: string | null
  date: string
  source: string
}

export interface Article {
  _id: string
  abstract: string
  web_url: string
  multimedia: Array<{ url: string }>
  pub_date: string
  source: string
}

export interface NewsResponse {
  response: {
    docs: Article[]
  }
}

export interface QueryArguments {
  year: number
  month: number
}
