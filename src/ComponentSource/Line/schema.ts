import { iComponentCategory } from '@/typings/SchemaCommon';

export default {
  name: '折线图',
  type: 'Line',
  icon: 'icon-xianxingtu',
  category: iComponentCategory.CONTORL,
  config: {
    dataType: 'dynamic',
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
      key: 'dataType',
      name: '数据类型',
      type: 'Radio',
      options: [
        {
          label: '静态数据',
          value: 'static',
        },
        {
          label: '动态数据',
          value: 'dynamic',
        },
      ],
    },
    // {
    //   key: 'method',
    //   name: '请求方法',
    //   type: 'Select',
    //   options: [
    //     {
    //       label: 'GET',
    //       value: 'GET'
    //     },
    //     {
    //       label: 'POST',
    //       value: 'POST'
    //     },
    //   ]
    // },
    {
      key: 'dataIndex',
      name: '数据指标',
      type: 'Select',
      options: [
        {
          label: '利率分布',
          value: 'interestRrate',
        },
        {
          label: '额度分布',
          value: 'quota',
        },
      ],
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
