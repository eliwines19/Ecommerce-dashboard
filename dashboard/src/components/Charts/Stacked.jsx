import React, { useRef } from 'react'
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, StackingColumnSeries, Tooltip, Export } from '@syncfusion/ej2-react-charts'

import ExportButton from '../ExportButton'

import { useStateContext } from '../../contexts/ContextProvider'

const Stacked = ({ width, height }) => {

  const { currentMode, salesSortedByDate, selectedYear } = useStateContext()
  const bgColor = currentMode === 'Dark' ? '#33373E' : '#fff'

  const getChartData = () => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const salesPerMonth = {};

    salesSortedByDate().reverse().forEach(sale => {
      const date = new Date(sale.date);
      const monthIndex = date.getUTCMonth();
      const monthName = monthNames[monthIndex];
      const saleYear = date.getUTCFullYear();

      if(saleYear === selectedYear){
        // Initialize the month's sales if not already done
        if (!salesPerMonth[monthName]) {
          salesPerMonth[monthName] = 0;
        }
        
        // Add the sale's price to the month's total
        salesPerMonth[monthName] += sale.productPrice;
      }
    });

    return Object.keys(salesPerMonth).map((month) => {
      return { x: month, y: salesPerMonth[month] }
    })
  }
  
  const stackedCustomSeries = [
    {
      dataSource: getChartData(),
      xName: 'x',
      yName: 'y',
      name: 'Earnings',
      type: 'StackingColumn',
      background: 'blue',
      fill: '#01BDAE'
    }
  ];
  
  const stackedPrimaryXAxis = {
    majorGridLines: { width: 0 },
    minorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    interval: 1,
    lineStyle: { width: 0 },
    labelIntersectAction: 'Rotate45',
    valueType: 'Category',
  };
  
  const stackedPrimaryYAxis = {
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    majorGridLines: { width: 1 },
    minorGridLines: { width: 1 },
    minorTickLines: { width: 0 },
    labelFormat: '${value}'
  };

  const chartInstance = useRef(null)

  return (
    <div>
      <ChartComponent
        title='Earnings Per Month'
        ref={chartInstance}
        width={width}
        height={height}
        id="charts"
        primaryXAxis={stackedPrimaryXAxis}
        primaryYAxis={stackedPrimaryYAxis}
        chartArea={{ border: { width: 0 } }}
        tooltip={{ enable: true }}
        background={ bgColor }
        legendSettings={{ background: bgColor, textStyle: { color: currentMode === 'Dark' ? '#fff' : '#33373E' } }}
      >
        <Inject services={[Legend, Category, StackingColumnSeries, Tooltip, Export]} />
        <SeriesCollectionDirective>
          {stackedCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} /> )}
        </SeriesCollectionDirective>
      </ChartComponent>
      <ExportButton chartInstance={chartInstance} title={'Earnings Per Month'} />
    </div>
  )
}

export default Stacked