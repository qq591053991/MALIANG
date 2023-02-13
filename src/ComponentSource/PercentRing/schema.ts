import { iComponentCategory } from '@/typings/SchemaCommon';
import { ChartModel, iChartType } from '../ChartModel';

export default new ChartModel({
  name: '百分比环',
  type: 'PercentRing',
  chartType: iChartType.PIE,
  icon: 'icon-shanxingtu',
  category: iComponentCategory.CHART,
  config: {
    dataType: 'static',
    requestUrl:
      'https://www.fastmock.site/mock/37597c10a5a6e25ce79c38731203c4fd/maliang/indicator/interest/rate/distribution',
    dataSource: [
      {
        amis: 2700,
        actual: 10000,
      },
    ],
    dataMapping: [
      { key: 'amis', mapping: '' },
      { key: 'actual', mapping: '' },
    ],
    chartConfig: {
      ringConfig: {
        bgRingColor: 'rgba(21, 66, 229, 0.4)',
        outRingRadius: 100,
        valueRingColor:
          'linear-gradient(90deg, RGBA(7, 3, 181, 1) 0%, rgba(0,212,255,1) 100%)',
        innerRingRadius: 80,
      },
      fontStyle: {
        valueFontColor: '#29EEF3',
        valueFontSize: 48,
        unitFontColor: '#ffffff',
        unitFontSize: 20,
      },
    },
  },
  baseConfig: [
    {
      key: 'chartConfig',
      name: '图表',
      type: 'Group',
      config: [
        {
          key: 'ringConfig',
          name: '圆环',
          type: 'Group',
          config: [
            {
              key: 'bgRingColor',
              name: '背景环颜色',
              type: 'Color',
            },
            {
              key: 'outRingRadius',
              name: '外环半径比',
              type: 'Number',
            },
            {
              key: 'valueRingColor',
              name: '数值环颜色',
              type: 'Color',
            },
            {
              key: 'innerRingRadius',
              name: '内环半径比',
              type: 'Number',
            },
          ],
        },
        {
          key: 'fontStyle',
          name: '文字样式',
          type: 'Group',
          config: [
            {
              key: 'valueFontColor',
              name: '数值文字颜色',
              type: 'Color',
            },
            {
              key: 'valueFontSize',
              name: '数值文字大小',
              type: 'Number',
            },
            {
              key: 'unitFontColor',
              name: '单位文字颜色',
              type: 'Color',
            },
            {
              key: 'unitFontSize',
              name: '单位文字大小',
              type: 'Number',
            },
          ],
        },
      ],
    },
  ],
  dataConfig: [],
  styleConfig: [],
  eventConfig: [{}],
});
