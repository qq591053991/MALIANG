import { iComponentCategory } from '@/typings/SchemaCommon';
import { BaseModel } from '../BaseConfig';
import { gridFormConfig } from '../ChartConfig/gridConfig';
import { ChartDataConfig } from '../ChartModel';

export default new BaseModel({
  name: '百分比条形图',
  type: 'PercentBar',
  icon: 'icon-tiaoxingtu1',
  category: iComponentCategory.CHART,
  config: {
    width: 450,
    height: 220,
    grid: {
      left: 54,
      top: 10,
      right: 60,
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
  baseConfig: [
    { ...gridFormConfig }
  ],
  dataConfig: [...ChartDataConfig],
  eventConfig: [{}],
});
