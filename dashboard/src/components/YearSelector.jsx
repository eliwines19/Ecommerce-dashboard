import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'

const YearSelector = () => {

  const { selectedYear, setSelectedYear, sales, currentColor } = useStateContext();

  const getSaleYears = () => {
    const years = new Set();

    sales.forEach(sale => {
      const year = new Date(sale.date).getFullYear();
      years.add(year)
    })

    return Array.from(years)
  }

  const handleChange = e => {
    setSelectedYear(Number(e.target.value));
  }

  return (
    <span>
      <select
        name='selectedYear'
        value={selectedYear}
        onChange={handleChange}
        style={{ backgroundColor: currentColor }}
        className='rounded-lg p-2 text-white'
      >
        {getSaleYears().map((year, index) => (
          <option key={index} value={year}>{year}</option>
        ))}
      </select>
    </span>
  )
}

export default YearSelector