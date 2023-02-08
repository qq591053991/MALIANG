import { iComponentCategory } from '@/typings/SchemaCommon';
import { BaseModel } from '../BaseConfig';

export default new BaseModel({
  name: '图片',
  type: 'Img',
  icon: 'icon-yduifuxuankuangxuanzhong',
  category: iComponentCategory.CONTORL,
  config: {
    width: 88,
    height: 32,
  },
  baseConfig: [
    {
      key: 'Img',
      name: '图片',
      type: 'Select',
    },
  ],
  dataConfig: [],
  styleConfig: [],
  eventConfig: [],
});
