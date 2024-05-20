import React from 'react'
import { Header, Pie as PieChart } from '../../components'
import { useStateContext } from '../../contexts/ContextProvider'

const Pie = () => {

  const { currentYear } = useStateContext()

  return (
    <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
      <Header category="Chart" title={`Percentage of Products Sold (${currentYear})`} />
      <div className='w-full'>
        <PieChart id="pie-chart" legendVisibility height="full" />
      </div>
    </div>
  )
}

export default Pie