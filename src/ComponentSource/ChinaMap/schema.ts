import { iComponentCategory } from '@/typings/SchemaCommon';

export default {
  name: '中国地图',
  type: 'ChinaMap',
  icon: 'icon-zhuzhuangtu',
  category: iComponentCategory.CHART,
  config: {},
  baseConfig: [
    {
      key: 'title',
      name: '文字',
      type: 'Text',
    },
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
  dataConfig: [
    {
      key: 'options',
      name: '选项',
      type: 'List',
    },
  ],
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
};
