import { iComponentCategory } from '@/typings/SchemaCommon';
import { BaseModel } from '../BaseConfig';

export default new BaseModel({
  name: '中国地图',
  type: 'ChinaMap',
  icon: 'icon-ditu',
  category: iComponentCategory.CHART,
  config: {},
  baseConfig: [],
  dataConfig: [],
  eventConfig: [{}],
});
