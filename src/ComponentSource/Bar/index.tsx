import React from 'react';
import ReactEcharts from 'echarts-for-react';
import MyEcharts from '@/components/MyEcharts';

export default function Bar(props) {
  const { dataSource = [], legend, grid } = props;
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
    legend,
    grid,
    series: [
      {
        data: yAxis,
        type: 'bar',
        barWidth: 15,
        itemStyle: {
          color: function (params) {
            return '#57cdff';
          },
        },
      },
    ],
  };
  return <MyEcharts option={options} />;
}
