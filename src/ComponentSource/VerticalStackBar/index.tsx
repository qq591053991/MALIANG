import React from 'react';
import ReactEcharts from 'echarts-for-react';
import MyEcharts from '@/components/MyEcharts';

export default function VerticalStackBar(props) {
  const { dataSource = [], legend, grid } = props;
  const defaultXData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const defaultYData = [150, 230, 224, 218, 135, 147, 260];
  const xAxis = dataSource?.map((item) => item?.xAxis) || defaultXData;
  const yAxis = dataSource?.map((item) => item?.yAxis) || defaultYData;
  const series = dataSource?.map((item) => item?.series);
  const xCategory = [...new Set(xAxis)];
  const sCategory = [...new Set(series)];

  const obj = {};
  sCategory?.forEach((x) => {
    obj[x] = dataSource
      ?.filter((d) => d?.series === x)
      ?.map((item) => item?.yAxis);
  });
  const options = {
    tooltip: {},
    legend,
    grid,
    xAxis: {
      type: 'category',
      data: xCategory,
    },
    yAxis: {
      type: 'value',
    },
    series: Object.keys(obj)?.map((key) => ({
      name: key,
      type: 'bar',
      stack: '总量',
      data: obj[key],
    })),
  };
  return <MyEcharts option={options} />;
}
