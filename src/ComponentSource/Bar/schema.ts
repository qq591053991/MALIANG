import { iComponentCategory } from '@/typings/SchemaCommon';
import { ChartModel, iChartType } from '../ChartModel';

export default new ChartModel({
  name: '柱状图',
  type: 'Bar',
  chartType: iChartType.BAR,
  icon: 'icon-zhuzhuangtu',
  category: iComponentCategory.CONTORL,
  config: {},
  baseConfig: [],
  dataConfig: [],
  styleConfig: [],
  eventConfig: [{}],
});
