import { iComponentCategory } from '@/typings/SchemaCommon';
import { BaseModel } from '../BaseConfig';

export default new BaseModel({
  name: '通用标题',
  type: 'Title',
  icon: 'icon-biaoti',
  category: iComponentCategory.INOFRMATION,
  config: {
    text: '我是标题',
    color: '#fff',
    fontSize: 16,
    textShadow: 'rgb(145 225 255) 0px 0px 6px',
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
      key: 'textShadow',
      name: '文字阴影',
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
});
