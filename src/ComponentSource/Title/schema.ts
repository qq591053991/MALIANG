import { iComponentCategory } from '@/typings/SchemaCommon';

export default {
  name: '通用标题',
  type: 'Title',
  icon: 'icon-biaoti',
  category: iComponentCategory.INOFRMATION,
  config: {
    text: '我是标题',
    color: '#666',
    fontSize: 16,
  },
  baseConfig: [
    {
      key: 'text',
      name: '标题',
      type: 'Text',
    },
    {
      key: 'color',
      name: '标题颜色',
      type: 'Color',
    },
    {
      key: 'backgroundColor',
      name: '背景颜色',
      type: 'Color',
    },
    {
      key: 'fontSize',
      name: '字体大小',
      type: 'Number',
    },
  ],
  dataConfig: [
    {
      key: 'text',
      name: '标题',
      type: 'Text',
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
      name: '字体大小',
      type: 'Number',
    },
  ],
  eventConfig: [{}],
};
