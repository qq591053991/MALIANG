import React from 'react';
import ReactEcharts, { EChartsOption } from 'echarts-for-react';
import MyEcharts from '@/components/MyEcharts';

interface iPieProps {
  dataSource: any[];
  legend: Record<string, any>;
}

export default function Pie(props: iPieProps) {
  const { dataSource = [], legend } = props;

  const options: EChartsOption = {
    tooltip: {
      trigger: 'item',
    },
    legend,
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: dataSource?.map((item: any) => ({
          name: item?.xAxis,
          value: item?.yAxis,
        })),
      },
    ],
  };
  return <MyEcharts option={options} />;
}
