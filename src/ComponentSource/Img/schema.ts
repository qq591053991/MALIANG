import { iComponentCategory } from '@/typings/SchemaCommon';
import { BaseModel } from '../BaseConfig';

export default new BaseModel({
  name: '图片',
  type: 'Img',
  icon: 'icon-yduifuxuankuangxuanzhong',
  category: iComponentCategory.CONTORL,
  config: {
    width: 650,
    height: 95,
    imgUrl:
      '//cdn-upload.datav.aliyun.com/upload/download/1630634667868-i-6y_Ohc.png',
  },
  baseConfig: [
    {
      key: 'imgUrl',
      name: '图片',
      type: 'Image',
    },
  ],
  dataConfig: [],
  styleConfig: [],
  eventConfig: [],
});
