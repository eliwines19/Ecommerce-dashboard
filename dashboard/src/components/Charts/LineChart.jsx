import React, { useRef } from 'react'
import { ChartComponent, LineSeries, SeriesCollectionDirective, SeriesDirective, Inject, DateTime, Legend, Tooltip, Export } from '@syncfusion/ej2-react-charts'
import ExportButton from '../ExportButton'
import { useStateContext } from '../../contexts/ContextProvider'

const LineChart = () => {

  const { currentMode, sales, selectedYear } = useStateContext()
  const bgColor = currentMode === "Dark" ? '#33373E' : '#fff'

  const getChartData = () => {
    const monthlySales = new Array(12).fill(0);

    sales.forEach((sale) => {
      const date = new Date(sale.date);
      const monthIndex = date.getUTCMonth();
      const saleYear = date.getFullYear();

      if(selectedYear === saleYear){
        monthlySales[monthIndex] += 1;
      }
    })

    return monthlySales.map((totalSales, index) => {
      return { x: new Date(2024, index, 1), y: totalSales }
    })
  }

  const lineCustomSeries = [{
    dataSource: getChartData(),
    xName: 'x',
    yName: 'y',
    name: 'Products Sold',
    width: '2',
    marker: { visible: true, width: 10, height: 10 },
    type: 'Line'
  }];

  const LinePrimaryXAxis = {
    valueType: 'DateTime',
    labelFormat: 'MMM',
    intervalType: 'Months',
    edgeLabelPlacement: 'Shift',
    majorGridLines: { width: 0 },
    background: 'white',
  };
  
  const LinePrimaryYAxis = {
    labelFormat: '{value}',
    rangePadding: 'None',
    minimum: 0,
    interval: 1,
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
  };

  const chartInstance = useRef(null);

  return (
    <div>
      <ChartComponent
        title='Products Sold Per Month'
        ref={chartInstance}
        id="line-chart"
        height="420px"
        primaryXAxis={LinePrimaryXAxis}
        primaryYAxis={LinePrimaryYAxis}
        chartArea={{ border: { width: 0 } }}
        tooltip={{ enable: true }}
        background={ bgColor }
        legendSettings={{ background: bgColor, textStyle: { color: currentMode === 'Dark' ? '#fff' : '#33373E' } }}
      >
        <Inject services={[LineSeries, DateTime, Legend, Tooltip, Export]}/>
        <SeriesCollectionDirective>
          {lineCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
        </SeriesCollectionDirective>
      </ChartComponent>
      <ExportButton chartInstance={chartInstance} title={'Products Sold Per Month'}/>
    </div>
  )
}

export default LineChart