import { format } from 'date-fns'
import { useGetNewsQuery } from '../../app/services/news/newsApi'
import Loader from '../Loader'
import { GroupedVirtuoso } from 'react-virtuoso'
import styles from './VirtualizedNewsListGroups.module.scss'
import { useCallback, useEffect, useMemo, useState } from 'react'
import ArticleItem from '../ArticleItem'
import type { Article } from '../../app/services/news/types'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addNewArticles, addOldArticles } from '../../app/newsSlice'
import type { MonthYear } from '../../utils/types'
import { initDateState } from '../../utils/state'

const VirtualizedNewsListGroups = () => {
  const [currentDate, setCurrentDate] = useState<MonthYear>(initDateState)
  const [archiveDate, setArchiveDate] = useState<MonthYear>(initDateState)
  const dispatch = useAppDispatch()
  const articles = useAppSelector((state) => state.news.articles)

  const {
    data: newArticles,
    error,
    isLoading,
  } = useGetNewsQuery(currentDate, {
    pollingInterval: 30000,
  })

  const {
    data: oldArticles,
    isFetching,
    isError,
  } = useGetNewsQuery(archiveDate, {
    skip:
      currentDate.month === archiveDate.month &&
      currentDate.year === archiveDate.year,
  })

  const { groups, groupCounts } = useMemo(() => {
    const data = articles.reduce<Record<string, Array<Article>>>(
      (map, article) => {
        const date = format(new Date(article.pub_date), 'dd.MM.yyyy')
        if (map[date]) {
          map[date].push(article)
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

  useEffect(() => {
    if (newArticles) {
      dispatch(addNewArticles(newArticles))
    }
  }, [dispatch, newArticles])

  useEffect(() => {
    if (oldArticles) {
      dispatch(addOldArticles(oldArticles))
    }
  }, [oldArticles, dispatch])

  const getPrevMounthAndYear = (date: MonthYear): MonthYear => {
    let prevMonth = date.month - 1
    let prevYear = date.year
    if (prevMonth < 1) {
      prevMonth = 12
      prevYear--
    }

    return { month: prevMonth, year: prevYear }
  }

  const onLoadOlder = useCallback(() => {
    const prevDate = getPrevMounthAndYear(archiveDate)

    setArchiveDate(prevDate)
  }, [archiveDate])

  useEffect(() => {
    if (
      (error && 'originalStatus' in error && error.originalStatus === 403) ||
      (error && 'status' in error && error.status === 403)
    ) {
      setCurrentDate((prev) => getPrevMounthAndYear(prev))
      setArchiveDate((prev) => getPrevMounthAndYear(prev))
    }
  }, [error])

  if (isError || error) {
    return (
      <h2 className={styles.error}>
        Failed to get news list. Please wait a bit, news will appear soon
      </h2>
    )
  }

  if (isLoading) return <Loader />

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
        itemContent={(index, groupIndex) => {
          const lastIndex =
            groupCounts
              .slice(0, groupIndex + 1)
              .reduce((sum, count) => sum + count, 0) - 1
          return (
            <ArticleItem
              article={articles[index]}
              isLastOfGroup={index === lastIndex}
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
