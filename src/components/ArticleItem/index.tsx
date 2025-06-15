import React, { memo } from 'react'
import { format } from 'date-fns'
import type { Article } from '../../app/services/news/types'
import styles from './ArticleItem.module.scss'

interface ArticleItemProps {
  article: Article
  isLastOfGroup: boolean
}

const ArticleItem: React.FC<ArticleItemProps> = memo(
  ({ article, isLastOfGroup }) => {
    const handleClickNews = () => window.open(article.web_url, '_blank')

    return (
      <article
        className={`${styles.article} ${
          isLastOfGroup ? styles.borderNone : ''
        }`}
        onClick={handleClickNews}
      >
        <div className={styles.article_image}>
          {article.multimedia?.[article.multimedia.length - 1] && (
            <img
              src={`https://www.nytimes.com/${
                article.multimedia[article.multimedia.length - 1].url
              }`}
              alt={article.abstract}
              loading="lazy"
            />
          )}
        </div>
        <div className={styles.article_content}>
          <h3 className={styles.source}>{article.source}</h3>
          <p className={styles.title}>{article.abstract}</p>
          <p className={styles.date}>
            {format(new Date(article.pub_date), 'PPp')}
          </p>
        </div>
      </article>
    )
  },
)

ArticleItem.displayName = 'ArticleItem'

export default ArticleItem
