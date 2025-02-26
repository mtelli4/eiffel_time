import { useState, useEffect } from 'react'

const dateSelectOptions: { value: string; label: string }[] = [
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
]

type DateFormat = (typeof dateSelectOptions)[number]['value']

export const useDateFormat = (initialFormat?: DateFormat) => {
  const getInitialDateFormat = (): DateFormat => {
    const savedFormat = localStorage.getItem('dateFormat') as DateFormat
    return initialFormat || savedFormat || 'DD/MM/YYYY'
  }

  const [dateFormat, setDateFormat] = useState<DateFormat>(getInitialDateFormat)

  useEffect(() => {
    localStorage.setItem('dateFormat', dateFormat)
  }, [dateFormat])

  return { dateFormat, setDateFormat, dateSelectOptions }
}
