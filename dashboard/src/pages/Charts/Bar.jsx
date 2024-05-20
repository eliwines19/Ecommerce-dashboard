import React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel } from '@syncfusion/ej2-react-charts';

import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';

const Bar = () => {

  const { currentMode, currentYear, sales } = useStateContext()
  const bgColor = currentMode === 'Dark' ? '#33373E' : '#fff'

  const getChartData = () => {

    const productCount = {}

    sales.forEach((sale) => {
      const { productName, date } = sale;
      const saleYear = new Date(date).getUTCFullYear()
      if(saleYear === currentYear){
        if(!productCount[productName]){
          productCount[productName] = 0;
        }
        productCount[productName] += 1
      }
    })

    const sortedProductCount = Object.entries(productCount)
      .map(([productName, count]) => ({ productName, count }))
      .sort((a, b) => b.count - a.count);

    const top3Products = sortedProductCount.slice(0, 3)

    return top3Products
  }

  const barCustomSeries = [{
    dataSource: getChartData(),
    xName: 'productName',
    yName: 'count',
    name: 'Product',
    type: 'Column',
    marker: {
      dataLabel: {
        visible: true,
        position: 'Top',
        font: { fontWeight: '600', color: '#ffffff' },
      },
    },
  }];

  const barPrimaryXAxis = {
    valueType: 'Category',
    interval: 1,
    majorGridLines: { width: 0 },
  };

  const barPrimaryYAxis = {
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    lineStyle: { width: 0 },
    labelStyle: { color: 'transparent' },
  };

  return (
    <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
      <Header category="Chart" title={`Top Selling Products (${currentYear})`} />
      <ChartComponent
          id="charts"
          primaryXAxis={barPrimaryXAxis}
          primaryYAxis={barPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true }}
          background={ bgColor }
          legendSettings={{ background: bgColor, textStyle: { color: currentMode === 'Dark' ? '#fff' : '#33373E' } }}
      >
        <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]} />
        <SeriesCollectionDirective>
          {barCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  )
}

export default Bar