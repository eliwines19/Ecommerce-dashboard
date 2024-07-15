import React from 'react'
import { ChartComponent, SplineAreaSeries, SeriesCollectionDirective, SeriesDirective, Inject, DateTime, Legend } from '@syncfusion/ej2-react-charts'

import { YearSelector } from '../../components'

import { useStateContext } from '../../contexts/ContextProvider'

const Area = () => {

  const { currentMode, sales, totalEarnings, selectedYear } = useStateContext()
  const bgColor = currentMode === "Dark" ? '#33373E' : '#fff'

  const getChartData = () => {
    const monthlyEarnings = new Array(12).fill(0)

    sales.forEach((sale) => {
      const date = new Date(sale.date);
      const saleYear = date.getUTCFullYear()
      const monthIndex = date.getUTCMonth();
      if(saleYear === selectedYear){
        monthlyEarnings[monthIndex] += sale.productPrice;
      }
    })

    const totalEarningsNum = parseFloat(totalEarnings().replace(/,/g, ''));

    const monthlyEarningsPercentage = monthlyEarnings.map((earnings) => {
      return totalEarningsNum ? (earnings / totalEarningsNum) * 100 : 0
    })

    return monthlyEarningsPercentage.map((percentage, index) => {
      return { x: new Date(2024, index, 1), y: percentage }
    })
  }

  const areaCustomSeries = [{
    dataSource: getChartData(),
    xName: 'x',
    yName: 'y',
    name: 'Percentage',
    opacity: '0.8',
    type: 'SplineArea',
    width: '2',
  }];

  const areaPrimaryXAxis = {
    valueType: 'DateTime',
    labelFormat: 'MMM',
    majorGridLines: { width: 0 },
    intervalType: 'Months',
    edgeLabelPlacement: 'Shift',
    labelStyle: { color: 'gray' },
  };

  const areaPrimaryYAxis = {
    labelFormat: '{value}%',
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    labelStyle: { color: 'gray' },
  };

  return (
    <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
      <div className='mb-10'>
        <p className='text-gray-400 dark:text-gray-200'>
          Chart
        </p>
        <p className="text-3xl font-extrabold tracking-right text-slate-900 dark:text-gray-400">
          Monthly Sales Percentage of Total Earnings <YearSelector />
        </p>
      </div>
      <ChartComponent
        id="area-chart"
        height="420px"
        primaryXAxis={areaPrimaryXAxis}
        primaryYAxis={areaPrimaryYAxis}
        chartArea={{ border: { width: 0 } }}
        background={ bgColor }
        legendSettings={{ background: bgColor, textStyle: { color: currentMode === 'Dark' ? '#fff' : '#33373E' } }}
      >
        <Inject services={[SplineAreaSeries, DateTime, Legend]}/>
        <SeriesCollectionDirective>
          {areaCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  )
}

export default Area