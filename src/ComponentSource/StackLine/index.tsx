import React from 'react';
import ReactEcharts from 'echarts-for-react';
import MyEcharts from '@/components/MyEcharts';

export default function StackLine(props) {
  const {
    dataSource = [],
    series,
    legend,
    grid,
    xAxis,
    yAxis,
    tooltip
  } = props;
  const defaultXData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const defaultYData = [150, 230, 224, 218, 135, 147, 260];
  const xAxisData = dataSource?.map((item) => item?.xAxis) || defaultXData;
  const yAxisData = dataSource?.map((item) => item?.yAxis) || defaultYData;
  const seriesData = dataSource?.map((item) => item?.series);
  const xCategory = [...new Set(xAxisData)];
  const sCategory = [...new Set(seriesData)];

  const obj = {};
  sCategory?.forEach((x) => {
    obj[x] = dataSource
      ?.filter((d) => d?.series === x)
      ?.map((item) => item?.yAxis);
  });
  const options = {
    tooltip,
    legend,
    grid,
    xAxis: {
      type: 'category',
      data: xCategory,
      ...xAxis
    },
    yAxis: {
      type: 'value',
      ...yAxis
    },
    series: Object.keys(obj)?.map((key,index) => ({
      name: key,
      type: 'line',
      data: obj[key],
      ...series[index]
    })),
  };
  return <MyEcharts option={options} />;
}
