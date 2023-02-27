import React, { CSSProperties } from 'react';
import ReactEcharts, { EChartsOption } from 'echarts-for-react';
import MyEcharts from '@/components/MyEcharts';

export default function RingChart(props: CSSProperties) {
  const { border = {}, ...otherStyle } = props
  return <div
    style={{
      ...border,
      ...otherStyle
    }}
  />;
}
