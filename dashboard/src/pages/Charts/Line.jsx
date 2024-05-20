import React from 'react'

import { Header, LineChart } from '../../components'

const Line = () => {

  const currentYear = new Date().getFullYear();

  return (
    <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
      <Header category="Chart" title={`Products Sold Per Month (${currentYear})`} />
      <div className='w-full'>
        <LineChart />
      </div>
    </div>
  )
}

export default Line