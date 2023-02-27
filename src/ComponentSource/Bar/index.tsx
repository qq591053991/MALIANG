import React from 'react';
import ReactEcharts from 'echarts-for-react';
import MyEcharts from '@/components/MyEcharts';

export default function Bar(props) {
  const { dataSource = [], legend, grid, xAxis: xAxisConfig, yAxis: yAxisConfig, tooltip } = props;
  const defaultXData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const defaultYData = [150, 230, 224, 218, 135, 147, 260];
  const xAxisData = dataSource?.map((item) => item?.xAxis) || defaultXData;
  const yAxisData = dataSource?.map((item) => item?.yAxis) || defaultYData;
  const options = {
    xAxis: {
      ...xAxisConfig,
      type: 'category',
      data: xAxisData,
    },
    yAxis: {
      type: 'value',
      ...yAxisConfig
    },
    legend,
    grid,
    tooltip,
    series: [
      {
        data: yAxisData,
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
