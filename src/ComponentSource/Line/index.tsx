import React from 'react';
import ReactEcharts from 'echarts-for-react';
import MyEcharts from '@/components/MyEcharts';

export default function Line(props) {
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
        type: 'line',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#00baff', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(0, 186, 255, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
  };
  return <MyEcharts option={options} />;
}
