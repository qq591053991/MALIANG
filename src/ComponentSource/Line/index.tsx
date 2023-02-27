import React from 'react';
import MyEcharts from '@/components/MyEcharts';

export default function Line(props) {
  const { dataSource = [], series, grid, xAxis, yAxis, legend, tooltip } = props;
  const defaultXData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const defaultYData = [150, 230, 224, 218, 135, 147, 260];
  const xAxisData = dataSource?.map((item) => item?.xAxis) || defaultXData;
  const yAxisData = dataSource?.map((item) => item?.yAxis) || defaultYData;
  const options = {
    xAxis: {
      type: 'category',
      data: xAxisData,
      ...xAxis
    },
    yAxis: {
      type: 'value',
      ...yAxis
    },
    tooltip,
    legend,
    grid,
    series: [
      {
        data: yAxisData,
        type: 'line',
        // ...formatEchartsProperty({ ...series?.[0] })
        ...series?.[0],
      },
    ],
  };
  return <MyEcharts option={options} />;
}
