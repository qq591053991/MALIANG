import { iComponentCategory } from '@/typings/SchemaCommon';
import { ChartModel, iChartType } from '../ChartModel';

export default new ChartModel({
  name: '百分比条形图',
  type: 'PercentBar',
  chartType: iChartType.BAR,
  icon: 'icon-zhuzhuangtu',
  category: iComponentCategory.CHART,
  config: {
    width: 450,
    height: 220,
    grid: {
      left: 54,
      top: 10,
      right: 50,
      bottom: 10,
    },
    dataMapping: [
      { key: 'xAxis', mapping: '' },
      { key: 'yAxis', mapping: '' },
    ],
    dataSource: [
      {
        xAxis: '大盘',
        yAxis: 100,
      },
      {
        xAxis: 'xx贷',
        yAxis: 60,
      },
      {
        xAxis: 'xx贷2',
        yAxis: 30,
      },
      {
        xAxis: 'xx贷3',
        yAxis: 20,
      },
      {
        xAxis: 'xx贷4',
        yAxis: 70,
      },
      {
        xAxis: 'xx贷5',
        yAxis: 40,
      },
      {
        xAxis: 'xx贷6',
        yAxis: 50,
      },
    ],
  },
  baseConfig: [],
  dataConfig: [],
  styleConfig: [],
  eventConfig: [{}],
});
