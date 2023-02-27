import React from 'react';
import ReactEcharts, { EChartsReactProps } from 'echarts-for-react';
import { getGradientObject } from '@/components/FormComponents/GradientColor';
import { isObject } from 'lodash';

interface iColor {
  left: number;
  value: string;
}

function formatEchartsColor(color: string) {
  try {
    if (!color || isObject(color)) return color;
    const {
      isGradient,
      colors,
    }: { isGradient?: boolean; colors?: iColor[] } = getGradientObject(color);
    if (isGradient) {
      return {
        type: 'linear',
        x: 0,
        y: 1,
        x2: 0,
        y2: 0,
        colorStops: colors?.map((item) => ({
          offset: item?.left / 100,
          color: item?.value,
        })),
        global: false, // 缺省为 false
      };
    }
    return color;
  } catch (error) {
    return color;
  }
}

function formatEchartsProperty(echartsProperty: any) {
  if (typeof echartsProperty === 'function') {
    debugger
    return echartsProperty
  }
  if (!isObject(echartsProperty)) {
    return echartsProperty;
  }
  if (!Array.isArray(echartsProperty)) {
    Object.keys(echartsProperty)?.forEach((key: string) => {
      let value = echartsProperty[key];
      // 统一处理color属性转化为echarts格式
      if (key === 'color') {
        echartsProperty[key] = formatEchartsColor(value);
        return echartsProperty;
      }
      if (isObject(value)) {
        value = formatEchartsProperty(value);
      }
    });
    return echartsProperty;
  }
  if (Array.isArray(echartsProperty)) {
    echartsProperty = echartsProperty.map(
      (item) => (item = formatEchartsProperty(item)),
    );
  }

  return echartsProperty;
}

export default function MyEcharts(props: EChartsReactProps) {
  // 统一处理一些echarts属性
  const _option =
    formatEchartsProperty({ ...JSON.parse(JSON.stringify(props?.option)) }) ||
    {};
  return (
    <ReactEcharts
      {...{
        ...props,
        theme: props?.theme || 'default_theme',
        style: {
          height: '100%',
          ...props?.style,
        },
        option: _option,
      }}
    />
  );
}
