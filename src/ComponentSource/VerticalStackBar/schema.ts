import { iComponentCategory } from '@/typings/SchemaCommon';
import { BaseModel } from '../BaseConfig';
import { ChartModel, iChartType } from '../ChartModel';

const defaultDatasource = [
  {
    xAxis: '5%',
    yAxis: '200',
    series: '大盘',
  },
  {
    xAxis: '5%',
    yAxis: '100',
    series: 'xx贷',
  },
  {
    xAxis: '5%',
    yAxis: '200',
    series: 'xx贷款2',
  },
  {
    xAxis: '5%-8%',
    yAxis: '25',
    series: '大盘',
  },
  {
    xAxis: '5%-8%',
    yAxis: '125',
    series: 'xx贷',
  },
  {
    xAxis: '5%-8%',
    yAxis: '100',
    series: 'xx贷款2',
  },
  {
    xAxis: '12%-15%',
    yAxis: '190',
    series: '大盘',
  },
  {
    xAxis: '12%-15%',
    yAxis: '110',
    series: 'xx贷',
  },
  {
    xAxis: '12%-15%',
    yAxis: '170',
    series: 'xx贷款2',
  },
  {
    xAxis: '15%-18%',
    yAxis: '90',
    series: '大盘',
  },
  {
    xAxis: '15%-18%',
    yAxis: '60',
    series: 'xx贷',
  },
  {
    xAxis: '15%-18%',
    yAxis: '70',
    series: 'xx贷款2',
  },
  {
    xAxis: '18%-20%',
    yAxis: '240',
    series: '大盘',
  },
  {
    xAxis: '18%-20%',
    yAxis: '170',
    series: 'xx贷',
  },
  {
    xAxis: '18%-20%',
    yAxis: '280',
    series: 'xx贷款2',
  },
  {
    xAxis: '20%-24%',
    yAxis: '420',
    series: '大盘',
  },
  {
    xAxis: '20%-24%',
    yAxis: '190',
    series: 'xx贷',
  },
  {
    xAxis: '20%-24%',
    yAxis: '390',
    series: 'xx贷款2',
  },
];

export default new ChartModel({
  name: '垂直堆叠柱状图',
  type: 'VerticalStackBar',
  chartType: iChartType.BAR,
  icon: 'icon-zhuzhuangduidietu',
  category: iComponentCategory.CHART,
  config: {
    width: 540,
    height: 300,
    dataSource: defaultDatasource,
    dataMapping: [
      { key: 'xAxis', mapping: '' },
      { key: 'yAxis', mapping: '' },
      { key: 'series', mapping: '' },
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
