import React from 'react'
import { LineChart, YearSelector } from '../../components'

const Line = () => {

  return (
    <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
      <div className='mb-10'>
        <p className='text-gray-400 dark:text-gray-200'>
          Chart
        </p>
        <p className="text-3xl font-extrabold tracking-right text-slate-900 dark:text-gray-400">
          Products Sold Per Month <YearSelector />
        </p>
      </div>
      <div className='w-full'>
        <LineChart />
      </div>
    </div>
  )
}

export default Line