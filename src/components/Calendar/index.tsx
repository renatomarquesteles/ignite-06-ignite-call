import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'

import { getWeekDays } from '../../utils/get-week-days'
import { api } from '../../lib/axios'

import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles'

interface CalendarWeek {
  week: number
  days: {
    date: dayjs.Dayjs
    disabled: boolean
  }[]
}

interface BlockedDates {
  blockedWeekDays: number[]
  blockedDates: number[]
}

interface CalendarProps {
  selectedDate: Date | null
  onDateSelected: (date: Date) => void
}

export function Calendar({ selectedDate, onDateSelected }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })
  const router = useRouter()

  const shortWeekDays = getWeekDays({ short: true })
  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const username = String(router.query.username)

  const { data: blockedDates } = useQuery<BlockedDates>(
    ['blocked-dates', currentDate.get('year'), currentDate.get('month')],
    async () => {
      const response = await api.get(`/users/${username}/blocked-dates`, {
        params: {
          year: currentDate.get('year'),
          month: currentDate.get('month') + 1,
        },
      })

      return response.data
    },
  )

  const calendarWeeks = useMemo(() => {
    if (!blockedDates) return []

    const daysInMonth = Array.from({ length: currentDate.daysInMonth() }).map(
      (_, i) => currentDate.set('date', i + 1),
    )

    const firstWeekDay = currentDate.get('day')

    const previousMonthFill = Array.from({ length: firstWeekDay })
      .map((_, i) => currentDate.subtract(i + 1, 'day'))
      .reverse()

    const lastDay = currentDate.set('date', currentDate.daysInMonth())
    const lastWeekDay = lastDay.get('day') // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    const nextMonthFill = Array.from({ length: 6 - lastWeekDay }).map((_, i) =>
      lastDay.add(i + 1, 'day'),
    )

    const calendarDays = [
      ...previousMonthFill.map((date) => ({ date, disabled: true })),
      ...daysInMonth.map((date) => ({
        date,
        disabled:
          date.endOf('day').isBefore(new Date()) ||
          blockedDates.blockedWeekDays.includes(date.get('day')) ||
          blockedDates.blockedDates.includes(date.get('date')),
      })),
      ...nextMonthFill.map((date) => ({ date, disabled: true })),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeek[]>(
      (weeks, _, i, original) => {
        const isStartOfAWeek = i % 7 === 0

        if (isStartOfAWeek) {
          weeks.push({
            week: i / 7,
            days: original.slice(i, i + 7),
          })
        }

        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [blockedDates, currentDate])

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, 'month')
    setCurrentDate(previousMonthDate)
  }

  function handleNextMonth() {
    const previousMonthDate = currentDate.add(1, 'month')
    setCurrentDate(previousMonthDate)
  }

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>

        <CalendarActions>
          <button onClick={handlePreviousMonth} title="Previous month">
            <CaretLeft />
          </button>
          <button onClick={handleNextMonth} title="Next month">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map(({ week, days }) => {
            return (
              <tr key={week}>
                {days.map(({ date, disabled }) => {
                  return (
                    <td key={date.toString()}>
                      <CalendarDay
                        onClick={() => onDateSelected(date.toDate())}
                        disabled={disabled}
                      >
                        {date.get('date')}
                      </CalendarDay>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
