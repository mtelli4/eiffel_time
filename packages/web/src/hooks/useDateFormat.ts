import { useState, useEffect } from 'react'

const dateSelectOptions: { value: string; label: string }[] = [
  { value: 'dd/MM/yyyy', label: 'DD/MM/YYYY' },
  { value: 'MM/dd/yyyy', label: 'MM/DD/YYYY' },
  { value: 'yyyy-MM-dd', label: 'YYYY-MM-DD' },
]

type DateFormat = (typeof dateSelectOptions)[number]['value']

export const useDateFormat = (initialFormat?: DateFormat) => {
  const getInitialDateFormat = (): DateFormat => {
    const savedFormat = localStorage.getItem('dateFormat') as DateFormat
    return initialFormat || savedFormat || 'dd/MM/yyyy'
  }

  const [dateFormat, setDateFormat] = useState<DateFormat>(getInitialDateFormat)

  useEffect(() => {
    localStorage.setItem('dateFormat', dateFormat)
  }, [dateFormat])

  return { dateFormat, setDateFormat, dateSelectOptions }
}
