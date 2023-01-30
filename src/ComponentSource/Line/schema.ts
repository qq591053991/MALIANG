import { iComponentCategory } from '@/typings/SchemaCommon';
import { BaseModel } from '../BaseConfig';

export default new BaseModel({
  name: '折线图',
  type: 'Line',
  icon: 'icon-xianxingtu',
  category: iComponentCategory.CONTORL,
  config: {
    dataType: 'dynamic',
    dataSource: {
      xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      yAxisData: [200, 430, 524, 318, 235, 147, 260],
    },
  },
  baseConfig: [
    // {
    //   key: 'title',
    //   name: '标题',
    //   type: 'Text',
    // },
    {
      key: 'color',
      name: '标题颜色',
      type: 'Color',
    },
    {
      key: 'fontSize',
      name: '标题文字大小',
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
      type: 'DataIndexSelector',
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
      dependencies: {
        items: [
          {
            dependKey: 'dataType',
            dependValues: ['dynamic'],
          },
        ],
      },
    },
    {
      key: 'dataSource',
      name: '数据源',
      type: 'MonacoEditor',
      dependencies: {
        items: [
          {
            dependKey: 'dataType',
            dependValues: ['static'],
          },
        ],
      },
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
});
