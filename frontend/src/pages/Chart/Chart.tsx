import React, { useEffect, useState } from 'react';
import { catchHandler } from '../../utils/error_handling/error_handling';
import { sendData } from '../../utils/functions/basic';
import Canvas from './Canvas';

function Chart() {

  type ChartObject = {
    [key: string]: {
      labels: string[],
      values: number[]
    }
  }

  const charts = [ // Table headers
    { id: 1, title: 'location', field: 'storeLocation' },
    { id: 2, title: 'method', field: 'purchaseMethod' },
    { id: 3, title: 'coupon', field: 'couponUsed' },
    { id: 4, title: 'gender', field: 'customer.gender' },
    { id: 5, title: 'satisfaction', field: 'customer.satisfaction' },
  ]

  const chartDataDefault = charts.reduce((acc, item) => {
    return Object.assign(acc, {[item.title]: {
      labels: [],
      values: []
    }})
  }, {})

  const [isLoading, setIsLoading] = useState<Boolean>(false); // loading state
  const [chartData, setChartData] = useState<ChartObject>(chartDataDefault); // chartData

  useEffect(() => {
    getChartData();
  }, []);

  // get transactions ID's
  async function getChartData(): Promise<void> {
    try {
      setIsLoading(true);
      const requestData = {
        charts: charts
      }; // request's data
      const result = await sendData('POST', '/get_chart_data', requestData);
      if (result) setChartData(result); 
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      catchHandler(error, 'getChartData');
    }
  }

  return (
    <div className="page chart">
        {charts.map((item) => {
          const {id, title} = item
          return ( 
            isLoading ? <div className='chart__loader' key={id}/> :
            <Canvas
                key = {id}
                id = "transactions_chart"
                type = "polarArea"
                title = {title.toUpperCase() || "transactions"}
                label = "count"
                labels = {chartData[title]?.labels}
                values = {chartData[title]?.values}
                // legend_position = "top"
            />
          )
        })}
    </div>
  );
}

export default Chart;
