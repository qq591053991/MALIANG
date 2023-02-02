import { iComponentCategory } from '@/typings/SchemaCommon';
import { BaseModel } from '../BaseConfig';

export default new BaseModel({
  name: '按钮',
  type: 'Button',
  icon: 'icon-yduifuxuankuangxuanzhong',
  category: iComponentCategory.CONTORL,
  config: {
    text: '按钮文字',
    width: 88,
    height: 32,
  },
  baseConfig: [
    {
      key: 'text',
      name: '按钮文字',
      type: 'Text',
    },
  ],
  dataConfig: [],
  styleConfig: [],
  eventConfig: [
    {
      key: 'ClickEvent',
      name: '点击事件',
      type: 'Event',
    },
  ],
});
