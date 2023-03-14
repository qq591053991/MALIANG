import { iComponentCategory } from '@/typings/SchemaCommon';
import { BaseModel, textStyleConfig, textStyleFormConfig } from '../BaseConfig';

export default new BaseModel({
  name: '时间',
  type: 'Timer',
  icon: 'icon-shijian',
  category: iComponentCategory.CONTORL,
  config: {
    height: 60,
    formatterStr: 'YYYY-MM-DD hh:mm:ss',
    showWeekDay: true,
    ...textStyleConfig.textStyle,
    fontSize: 16,
    // textShadow: 'rgb(145 225 255) 0px 0px 6px',
  },
  baseConfig: [
    {
      key: 'formatterStr',
      name: '时间格式',
      type: 'Text',
    },
    {
      key: 'showWeekDay',
      name: '显示星期',
      type: 'Switch',
    },
    ...textStyleFormConfig.config,
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
  ],
  dataConfig: [],
  eventConfig: [{}],
});
