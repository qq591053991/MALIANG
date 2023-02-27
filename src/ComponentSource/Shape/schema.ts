import { iComponentCategory } from '@/typings/SchemaCommon';
import { BaseModel } from '../BaseConfig';

export default new BaseModel({
  name: '形状',
  type: 'Shape',
<<<<<<< HEAD
  icon: 'icon-waibiankuang',
  category: iComponentCategory.OTHER,
=======
  icon: 'icon-shanxingtu',
  category: iComponentCategory.CONTORL,
>>>>>>> 2be46f079b3e5c28f05bddc8fcf2794ba8e66fbc
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
<<<<<<< HEAD
    },
  ],
  dataConfig: [],
=======
    }
  ],
  dataConfig: [],
  styleConfig: [],
>>>>>>> 2be46f079b3e5c28f05bddc8fcf2794ba8e66fbc
  eventConfig: [],
});
