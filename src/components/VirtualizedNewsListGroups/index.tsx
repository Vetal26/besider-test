import { format } from 'date-fns'
import { useGetNewsQuery } from '../../app/services/news/newsApi'
import Loader from '../Loader'
import { GroupedVirtuoso } from 'react-virtuoso'
import styles from './VirtualizedNewsListGroups.module.scss'
import { useCallback, useEffect, useMemo, useState } from 'react'
import ArticleItem from '../ArticleItem'
import type { Article } from '../../app/services/news/types'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addArticles, setArticles } from '../../app/newsSlice'

const VirtualizedNewsListGroups = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const dispatch = useAppDispatch()
  const articles = useAppSelector((state) => state.news.articles)

  const {
    data: newArticles,
    isFetching,
    isError,
  } = useGetNewsQuery({
    year: currentYear,
    month: currentMonth,
  })

  const { groups, groupCounts } = useMemo(() => {
    const data = articles.reduce<Record<string, Array<Article>>>(
      (map, article) => {
        const date = format(new Date(article.pub_date), 'dd.MM.yyyy')
        if (map[date]) {
          if (map[date].length > 5) map[date].push(article)
        } else {
          map[date] = [article]
        }

        return map
      },
      {},
    )

    const groups: string[] = []
    const groupCounts: number[] = []

    for (const [date, news] of Object.entries(data)) {
      groups.push(date)
      groupCounts.push(news.length)
    }

    return { groups, groupCounts }
  }, [articles])

  // When new data arrives from API, update the store
  useEffect(() => {
    if (newArticles) {
      if (
        currentYear === new Date().getFullYear() &&
        currentMonth === new Date().getMonth() + 1
      ) {
        // For current month, add to existing articles
        dispatch(addArticles(newArticles))
      } else {
        // For older months, replace the articles
        dispatch(setArticles(newArticles))
      }
    }
  }, [newArticles, dispatch, currentYear, currentMonth])

  const onLoadOlder = useCallback(() => {
    let newMonth = currentMonth - 1
    let newYear = currentYear
    if (newMonth < 1) {
      newMonth = 12
      newYear--
    }
    setCurrentMonth(newMonth)
    setCurrentYear(newYear)
  }, [currentMonth, currentYear])

  if (isError) {
    return <h2 className={styles.error}>Failed to get news list</h2>
  }

  return (
    <>
      <GroupedVirtuoso
        useWindowScroll
        className={styles.groups}
        data={articles}
        style={{ height: '100%' }}
        overscan={500}
        groupCounts={groupCounts}
        groupContent={(index) => {
          return <h2 className={styles.title}>News for {groups[index]}</h2>
        }}
        itemContent={(index, groupIndex, article) => {
          return (
            <ArticleItem
              article={article}
              isLastOfGroup={index === groupCounts[groupIndex] - 1}
            />
          )
        }}
        endReached={onLoadOlder}
      />
      {isFetching && <Loader />}
    </>
  )
}

export default VirtualizedNewsListGroups
