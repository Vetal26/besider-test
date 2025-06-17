import type { MonthYear } from './types'

export const initDateState = (): MonthYear => {
  const date = new Date()

  return { month: date.getMonth() + 1, year: date.getFullYear() }
}
