import React from 'react';
import ReactEcharts from 'echarts-for-react';

export default function Bar(props) {
  const { dataSource = [] } = props;
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
    series: [
      {
        data: yAxis,
        type: 'bar',
      },
    ],
  };
  return (
    <ReactEcharts option={options} style={{ height: '100%' }} theme="dark" />
  );
}
