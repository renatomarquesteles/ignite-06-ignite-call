import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'

import { Calendar } from '../../../../../components/Calendar'
import { api } from '../../../../../lib/axios'

import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [availability, setAvailability] = useState<Availability | null>(null)
  const router = useRouter()

  const isDateSelected = !!selectedDate
  const weekDay = selectedDate && dayjs(selectedDate).format('dddd')
  const monthDay = selectedDate && dayjs(selectedDate).format('MMMM D')
  const username = String(router.query.username)

  useEffect(() => {
    if (!selectedDate) return

    api
      .get(`/users/${username}/availability`, {
        params: {
          date: dayjs(selectedDate).format('YYYY-MM-DD'),
        },
      })
      .then((response) => {
        setAvailability(response.data)
      })
  }, [selectedDate, username])

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{monthDay}</span>
          </TimePickerHeader>

          <TimePickerList>
            {availability?.possibleTimes.map((hour) => (
              <TimePickerItem
                key={hour}
                disabled={!availability.availableTimes.includes(hour)}
              >
                {String(hour).padStart(2, '0')}:00
              </TimePickerItem>
            ))}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
