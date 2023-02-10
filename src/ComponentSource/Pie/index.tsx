import React from 'react';
import ReactEcharts, { EChartsOption } from 'echarts-for-react';
import MyEcharts from '@/components/MyEcharts';

interface iPieProps {
  dataSource: any[];
  legendTextColor: string;
  legendTextSize: number;
  color: string;
}

export default function Pie(props: iPieProps) {
  const {
    dataSource = [],
    legendTextColor = '#fff',
    legendTextSize = 16,
    color,
  } = props;

  const options: EChartsOption = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
      textStyle: {
        color: legendTextColor,
        fontSize: legendTextSize,
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
  return <MyEcharts option={options} />;
}
