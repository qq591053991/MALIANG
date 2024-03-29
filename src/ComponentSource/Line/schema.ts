import { iComponentCategory } from '@/typings/SchemaCommon';
import { ChartModel, iChartType } from '../ChartModel';
import { seriesFormConfig } from '../ChartTypeConfig/Line';

export default new ChartModel({
  name: '折线图',
  type: 'Line',
  chartType: iChartType.LINE,
  icon: 'icon-xianxingtu',
  category: iComponentCategory.CHART,
  config: {
    dataType: 'api',
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
  baseConfig: [...seriesFormConfig],
  dataConfig: [],
  eventConfig: [{}],
});
