import React from 'react';
import ReactEcharts, { EChartsOption } from 'echarts-for-react';
import MyEcharts from '@/components/MyEcharts';

interface iPercentRingProps {
  dataSource: any[];
  legend: Record<string, any>;
}

export default function PercentRing(props: iPercentRingProps) {
  const { dataSource = [], legend } = props;
  const value = 55;
  const options: EChartsOption = {
    tooltip: {
      trigger: 'item',
    },
    legend,
    title: {
      text: '{a|' + value + '}{c|%}',
      x: 'center',
      y: 'center',
      textStyle: {
        rich: {
          a: {
            fontSize: 48,
            color: '#29EEF3',
          },

          c: {
            fontSize: 20,
            color: '#ffffff',
            // padding: [5,0]
          },
        },
      },
    },
    series: [
      {
        name: '吃猪肉频率',
        type: 'pie',
        radius: ['58%', '45%'],
        silent: true,
        clockwise: true,
        startAngle: 90,
        z: 0,
        zlevel: 0,
        label: {
          normal: {
            position: 'center',
          },
        },
        data: [
          {
            value: value,
            name: '',
            itemStyle: {
              normal: {
                color: {
                  // 完成的圆环的颜色
                  colorStops: [
                    {
                      offset: 0,
                      color: '#4FADFD', // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#28E8FA', // 100% 处的颜色
                    },
                  ],
                },
              },
            },
          },
          {
            value: 100 - value,
            name: '',
            label: {
              normal: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                color: '#173164',
              },
            },
          },
        ],
      },
    ],
  };
  return <MyEcharts option={options} />;
}
