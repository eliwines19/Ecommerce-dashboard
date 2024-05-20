import React from 'react';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationLegend, PieSeries, AccumulationDataLabel, Inject, AccumulationTooltip } from '@syncfusion/ej2-react-charts';


import { useStateContext } from '../../contexts/ContextProvider';

const Doughnut = ({ id, legendVisiblity, height }) => {

  const { currentMode, currentYear, sales, totalSales } = useStateContext();
  const bgColor = currentMode === 'Dark' ? '#33373E' : '#fff'

  const getChartData = () => {

    const salesCount = {}

    sales.forEach((sale) => {
      const { productName, date } = sale;
      const saleYear = new Date(date).getUTCFullYear()
      if(currentYear === saleYear){
        if(!salesCount[productName]){
          salesCount[productName] = 0
        }
        salesCount[productName] += 1
      }
    })

    const totalSalesNum = parseFloat(totalSales().replace(/,/g, ''));

    const result = Object.entries(salesCount).map((sale) => {
      const percentage = totalSalesNum > 0 ? Math.round((sale[1] / totalSalesNum * 100)) : 0
      console.log(`${percentage}%`)
      return {
        x: `${sale[0]}`,
        y: sale[1],
        text: `${percentage}%`
      } 
    })

    return result
  }

  return (
    <AccumulationChartComponent
      id={id}
      legendSettings={{ visible: true, legendVisiblity, background: bgColor, textStyle: { color: currentMode === 'Dark' ? '#fff' : '#33373E' } }}
      height={height}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      tooltip={{ enable: true }}
    >
      <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip]} />
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          name="Sale"
          dataSource={getChartData()}
          xName="x"
          yName="y"
          innerRadius="40%"
          startAngle={0}
          endAngle={360}
          radius="70%"
          explode
          explodeOffset="10%"
          explodeIndex={2}
          dataLabel={{
            visible: true,
            name: 'text',
            position: 'Inside',
            font: {
              fontWeight: '600',
              color: '#fff',
            },
          }}
        />
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
  );
};

export default Doughnut;