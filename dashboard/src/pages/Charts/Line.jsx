import React from 'react'
import { Header, LineChart } from '../../components'
import { useStateContext } from '../../contexts/ContextProvider';

const Line = () => {

  const { selectedYear } = useStateContext();

  return (
    <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
      <Header category="Chart" title={`Products Sold Per Month (${selectedYear})`} />
      <div className='w-full'>
        <LineChart />
      </div>
    </div>
  )
}

export default Line