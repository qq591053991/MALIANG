import React from 'react';
import ReactEcharts, { EChartsReactProps } from 'echarts-for-react';

export default function MyEcharts(props: EChartsReactProps) {
  return (
    <ReactEcharts
      {...{
        ...props,
        theme: props?.theme || 'default_theme',
        style: {
          height: '100%',
          ...props?.style,
        },
      }}
    />
  );
}
