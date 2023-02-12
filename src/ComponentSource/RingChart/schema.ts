import { iComponentCategory } from '@/typings/SchemaCommon';
import { ChartModel, iChartType } from '../ChartModel';

export default new ChartModel({
  name: '环形图',
  type: 'RingChart',
  chartType: iChartType.PIE,
  icon: 'icon-shanxingtu',
  category: iComponentCategory.CHART,
  config: {
    dataType: 'static',
    requestUrl:
      'https://www.fastmock.site/mock/37597c10a5a6e25ce79c38731203c4fd/maliang/indicator/interest/rate/distribution',
    dataSource: [
      {
        xAxis: 'Mon',
        yAxis: Math.random(),
      },
      {
        xAxis: 'Tue',
        yAxis: Math.random(),
      },
      {
        xAxis: 'Wed',
        yAxis: Math.random(),
      },
      {
        xAxis: 'Thu',
        yAxis: Math.random(),
      },
      {
        xAxis: 'Fri',
        yAxis: Math.random(),
      },
      {
        xAxis: 'Sat',
        yAxis: Math.random(),
      },
      {
        xAxis: 'Sun',
        yAxis: Math.random(),
      },
    ],
    dataMapping: [
      { key: 'xAxis', mapping: '' },
      { key: 'yAxis', mapping: '' },
    ],
  },
  baseConfig: [],
  dataConfig: [],
  styleConfig: [
    {
      key: 'color',
      name: '标题颜色',
      type: 'Color',
    },
    {
      key: 'fontSize',
      name: '文字大小',
      type: 'Number',
    },
  ],
  eventConfig: [{}],
});
