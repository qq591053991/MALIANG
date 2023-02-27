import { iComponentCategory } from '@/typings/SchemaCommon';
import { axisConfig, axisLabelConfig } from '../ChartConfig/axisConfig';
import { ChartModel, iChartType } from '../ChartModel';
import { multSeriesConfig, seriesConfig, seriesFormConfig } from '../ChartTypeConfig/Line';

const defaultDatasource = [
  {
    xAxis: '2022/01',
    yAxis: 16.8,
    series: 'FDP15+客户比例',
  },
  {
    xAxis: '2022/01',
    yAxis: 0.16,
    series: 'FDP30+客户比例',
  },
  {
    xAxis: '2022/02',
    yAxis: 10.03,
    series: 'FDP15+客户比例',
  },
  {
    xAxis: '2022/02',
    yAxis: 0.54,
    series: 'FDP30+客户比例',
  },
  {
    xAxis: '2022/03',
    yAxis: 4.16,
    series: 'FDP15+客户比例',
  },
  {
    xAxis: '2022/03',
    yAxis: 0.46,
    series: 'FDP30+客户比例',
  },
  {
    xAxis: '2022/04',
    yAxis: 4.81,
    series: 'FDP15+客户比例',
  },
  {
    xAxis: '2022/04',
    yAxis: 0.69,
    series: 'FDP30+客户比例',
  },
  {
    xAxis: '2022/05',
    yAxis: 3.65,
    series: 'FDP15+客户比例',
  },
  {
    xAxis: '2022/05',
    yAxis: 0.67,
    series: 'FDP30+客户比例',
  },
  {
    xAxis: '2022/06',
    yAxis: 4.69,
    series: 'FDP15+客户比例',
  },
  {
    xAxis: '2022/06',
    yAxis: 0.59,
    series: 'FDP30+客户比例',
  },
  {
    xAxis: '2022/07',
    yAxis: 4.26,
    series: 'FDP15+客户比例',
  },
  {
    xAxis: '2022/07',
    yAxis: 0.66,
    series: 'FDP30+客户比例',
  },
  {
    xAxis: '2022/08',
    yAxis: 7.31,
    series: 'FDP15+客户比例',
  },
  {
    xAxis: '2022/08',
    yAxis: 1.61,
    series: 'FDP30+客户比例',
  },
  {
    xAxis: '2022/09',
    yAxis: 12.45,
    series: 'FDP15+客户比例',
  },
  {
    xAxis: '2022/09',
    yAxis: 2.34,
    series: 'FDP30+客户比例',
  },
  {
    xAxis: '2022/10',
    yAxis: 6.61,
    series: 'FDP15+客户比例',
  },
  {
    xAxis: '2022/10',
    yAxis: 2.63,
    series: 'FDP30+客户比例',
  },
  {
    xAxis: '2022/11',
    yAxis: 4.66,
    series: 'FDP15+客户比例',
  },
  {
    xAxis: '2022/11',
    yAxis: 1.13,
    series: 'FDP30+客户比例',
  },
  {
    xAxis: '2022/12',
    yAxis: 7.55,
    series: 'FDP15+客户比例',
  },
  {
    xAxis: '2022/12',
    yAxis: 2.13,
    series: 'FDP30+客户比例',
  },
];

export default new ChartModel({
  name: '堆叠折线图',
  type: 'StackLine',
  chartType: iChartType.LINE,
  icon: 'icon-stack-line',
  category: iComponentCategory.CHART,
  config: {
    width: 540,
    height: 300,
    grid: {
      top: 45,
      right: 10,
      bottom: 45,
      left: 30,
    },
    xAxis: {
      ...axisConfig,
      axisLabel: {
        ...axisLabelConfig,
        rotate: 30,
        interval: 0
      }
    },
    dataSource: defaultDatasource,
    dataMapping: [
      { key: 'xAxis', mapping: '' },
      { key: 'yAxis', mapping: '' },
      { key: 'series', mapping: '' },
    ],
    series: multSeriesConfig
  },
  baseConfig: [...seriesFormConfig],
  dataConfig: [],
  eventConfig: [{}],
});
