import React from 'react';
import ReactEcharts, { EChartsOption } from 'echarts-for-react';
import MyEcharts from '@/components/MyEcharts';

interface iRingChartProps {
  dataSource: any[];
  legend: any;
  grid: any;
  color: string;
}

export default function RingChart(props: iRingChartProps) {
  const { dataSource = [], legend, grid, color } = props;

  const options: EChartsOption = {
    tooltip: {
      trigger: 'item',
    },
    legend,
    grid,
    series: [
      {
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
