import { iComponentCategory } from '@/typings/SchemaCommon';

export default {
  name: '多选框',
  type: 'Checkbox',
  icon: 'icon',
  category: iComponentCategory.CONTORL,
  config: {
    text: '我是文字',
    color: '#666',
    fontSize: 16,
  },
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
