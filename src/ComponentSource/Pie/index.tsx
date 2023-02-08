import React from 'react';
import ReactEcharts from 'echarts-for-react';

interface iPieProps {
  dataSource: any[];
  title: string;
  titleColor: string;
  legentTextColor: string;
  legentTextSize: number;
  color: string;
}

export default function Pie(props: iPieProps) {
  const {
    dataSource = [],
    title,
    titleColor = '#fff',
    legentTextColor = '#fff',
    legentTextSize = 16,
    color,
  } = props;

  const options = {
    title: {
      left: 'center',
      text: title,
      textStyle: {
        color: titleColor,
      },
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
      textStyle: {
        color: legentTextColor,
        fontSize: legentTextSize,
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: dataSource?.map((item: any) => ({
          name: item?.xAxis,
          value: item?.yAxis,
        })),
      },
    ],
  };
  return (
    <ReactEcharts option={options} style={{ height: '100%' }} theme="dark" />
  );
}
