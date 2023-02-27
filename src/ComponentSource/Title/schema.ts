import { iComponentCategory } from '@/typings/SchemaCommon';
import { BaseModel, textStyleConfig, textStyleFormConfig } from '../BaseConfig';

export default new BaseModel({
  name: '通用标题',
  type: 'Title',
  icon: 'icon-biaoti',
  category: iComponentCategory.INOFRMATION,
  config: {
    text: '我是标题',
    ...textStyleConfig.textStyle,
    fontSize: 30,
    // textShadow: 'rgb(145 225 255) 0px 0px 6px',
  },
  baseConfig: [
    {
      key: 'text',
      name: '标题',
      type: 'Text',
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
  dataConfig: [
    {
      key: 'text',
      name: '标题',
      type: 'Text',
    },
  ],
  eventConfig: [{}],
});
