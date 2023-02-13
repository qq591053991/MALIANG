import { iComponentCategory } from '@/typings/SchemaCommon';
import { BaseModel } from '../BaseConfig';

export default new BaseModel({
  name: '形状',
  type: 'Shape',
  icon: 'icon-shanxingtu',
  category: iComponentCategory.CONTORL,
  config: {
  },
  baseConfig: [
    {
      key: 'backgroundColor',
      name: '背景颜色',
      type: 'Color'
    },
    {
      key: 'borderRadius',
      name: '圆角',
      type: 'Number'
    },
    {
      key: 'border',
      name: '边框',
      type: 'Group',
      config: [
        {
          key: 'borderWidth',
          name: '边宽',
          type: 'Number'
        },
        {
          key: 'borderStyle',
          name: '类型',
          type: 'Select',
          options: [
            {
              label: '实线',
              value: 'solid'
            },
            {
              label: '虚线',
              value: 'dashed'
            },
          ]
        },
        {
          key: 'borderColor',
          name: '边框颜色',
          type: 'Color'
        }
      ]
    }
  ],
  dataConfig: [],
  styleConfig: [],
  eventConfig: [],
});
