import React from 'react';
import ReactEcharts from 'echarts-for-react';

export default function Line(props) {
  const defaultXData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const defaultYData = [150, 230, 224, 218, 135, 147, 260];
  const { xAxisData = defaultXData, yAxisData = defaultYData } = props;
  const options = {
    xAxis: {
      type: 'category',
      data: xAxisData,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: yAxisData,
        type: 'line',
      },
    ],
  };
  return <ReactEcharts option={options} style={{ height: '100%' }} />;
}
