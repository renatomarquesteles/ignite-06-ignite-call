interface GetWeekDaysParams {
  short?: boolean
}

export function getWeekDays({ short = false }: GetWeekDaysParams = {}) {
  const formatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' }) // sunday, monday ... saturday

  return [0, 1, 2, 3, 4, 5, 6]
    .map((day) => formatter.format(new Date(Date.UTC(2021, 5, day))))
    .map((weekDay) => {
      if (short) {
        return weekDay.substring(0, 3).toUpperCase() // SUN, MON, etc...
      }

      return weekDay[0].toUpperCase() + weekDay.substring(1) // Sunday, Monday, etc...
    })
}

// This function is getting the dates from a month that starts on Sunday (position 0).
// So when we map it, it gets the week days from sunday to saturday
// new Date(Date.UTC(2021, 5, day))
