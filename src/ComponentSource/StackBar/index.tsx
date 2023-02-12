import React from 'react';
import ReactEcharts from 'echarts-for-react';
import MyEcharts from '@/components/MyEcharts';

export default function StackBar(props) {
  const { dataSource = [] } = props;
  // const defaultXData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  // const defaultYData = [150, 230, 224, 218, 135, 147, 260];
  // const xAxis = dataSource?.map((item) => item?.xAxis) || defaultXData;
  const yAxis = dataSource?.map((item) => item?.yAxis) || defaultYData;
  const series = dataSource?.map((item) => item?.series);

  const options = {
    tooltip: {},
    legend: {},
    dataset: {
      dimensions: ['xAxis', ...[...new Set(series)]],
      source: dataSource?.map((item) => ({
        ...item,
        [item?.series]: item?.yAxis,
      })),
    },
    xAxis: { type: 'category' },
    yAxis: {},
    series: [...new Set(series)]?.map((item) => ({ type: 'bar' })) || [],
  };
  return <MyEcharts option={options} />;
}
