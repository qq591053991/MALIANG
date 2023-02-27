import React from 'react';
import ReactEcharts, { EChartsOption } from 'echarts-for-react';
import MyEcharts from '@/components/MyEcharts';

interface iPercentRingProps {
  dataSource: any[];
  legend: Record<string, any>;
}

export default function PercentRing(props: iPercentRingProps) {
  const { dataSource = [{}], legend, chartConfig = {} } = props;
  const { ringConfig = {}, fontStyle = {} } = chartConfig;
  const { bgRingColor, outRingRadius, valueRingColor, innerRingRadius } =
    ringConfig;
  const { valueFontColor, valueFontSize, unitFontColor, unitFontSize } =
    fontStyle;
  const [{ amis = 100, actual = 100 }] = dataSource;
  const value = (amis / actual) * 100;
  const options: EChartsOption = {
    tooltip: {
      trigger: 'item',
    },
    legend,
    title: {
      text: `{a|${value}}{c|%}`,
      x: 'center',
      y: 'center',
      textStyle: {
        rich: {
          a: {
            fontSize: valueFontSize,
            color: valueFontColor,
          },

          c: {
            fontSize: unitFontSize,
            color: unitFontColor,
          },
        },
      },
    },
    series: [
      {
        type: 'pie',
        radius: [`${outRingRadius}%`, `${innerRingRadius}%`],
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
                color: valueRingColor,
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
                color: bgRingColor,
              },
            },
          },
        ],
      },
    ],
  };
  return <MyEcharts option={options} />;
}
