import React from 'react';
import MyEcharts from '@/components/MyEcharts';

export default function Line(props) {
  const { dataSource = [], series, grid, legend } = props;
  const defaultXData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const defaultYData = [150, 230, 224, 218, 135, 147, 260];
  const xAxis = dataSource?.map((item) => item?.xAxis) || defaultXData;
  const yAxis = dataSource?.map((item) => item?.yAxis) || defaultYData;
  const options = {
    xAxis: {
      type: 'category',
      data: xAxis,
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'item',
    },
    legend,
    grid,
    series: [
      {
        data: yAxis,
        type: 'line',
        // ...formatEchartsProperty({ ...series?.[0] })
        ...series?.[0],
      },
    ],
  };
  return <MyEcharts option={options} />;
}
