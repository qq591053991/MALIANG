import { iComponentCategory } from '@/typings/SchemaCommon';
import { BaseModel } from '../BaseConfig';

export default new BaseModel({
  name: '装饰边框',
  type: 'BorderBox',
  icon: 'icon-xingzhuang-juxing',
  category: iComponentCategory.CONTORL,
  config: {
    width: 400,
    height: 400,
  },
  baseConfig: [
    {
      key: 'classType',
      name: '装饰边框类别',
      type: 'Select',
      options: [
        {
          label: '类别1',
          value: 'BorderBox1',
        },
        {
          label: '类别2',
          value: 'BorderBox2',
        },
        {
          label: '类别3',
          value: 'BorderBox3',
        },
        {
          label: '类别4',
          value: 'BorderBox4',
        },
        {
          label: '类别5',
          value: 'BorderBox5',
        },
        {
          label: '类别6',
          value: 'BorderBox6',
        },
        {
          label: '类别7',
          value: 'BorderBox7',
        },
        {
          label: '类别8',
          value: 'BorderBox8',
        },
        {
          label: '类别9',
          value: 'BorderBox9',
        },
        {
          label: '类别10',
          value: 'BorderBox10',
        },
        {
          label: '类别11',
          value: 'BorderBox11',
        },
        {
          label: '类别12',
          value: 'BorderBox12',
        },
        {
          label: '类别13',
          value: 'BorderBox13',
        },
      ],
    },
  ],
  dataConfig: [],
   
  eventConfig: [],
});
