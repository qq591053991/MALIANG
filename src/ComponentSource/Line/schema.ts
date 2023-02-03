import { iComponentCategory } from '@/typings/SchemaCommon';
import { BaseModel } from '../BaseConfig';

export default new BaseModel({
  name: '折线图',
  type: 'Line',
  icon: 'icon-xianxingtu',
  category: iComponentCategory.CONTORL,
  config: {
    dataType: 'api',
    requestUrl:
      'https://www.fastmock.site/mock/37597c10a5a6e25ce79c38731203c4fd/maliang/indicator/interest/rate/distribution',
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
      key: 'DataMapping',
      name: '数据接口',
      type: 'DataMapping',
    },
    {
      key: 'dataType',
      name: '数据类型',
      type: 'Select',
      options: [
        {
          label: '静态数据',
          value: 'static',
        },
        {
          label: '内置指标',
          value: 'dynamic',
        },
        {
          label: 'API',
          value: 'api',
        },
      ],
    },
    {
      key: 'method',
      name: '请求方式',
      type: 'Select',
      options: [
        {
          label: 'GET',
          value: 'get',
        },
        {
          label: 'POST',
          value: 'post',
        },
      ],
      dependencies: {
        items: [
          {
            dependKey: 'dataType',
            dependValues: ['api'],
          },
        ],
      },
    },
    {
      key: 'requestUrl',
      name: 'URL',
      type: 'TextArea',
      dependencies: {
        items: [
          {
            dependKey: 'dataType',
            dependValues: ['api'],
          },
        ],
      },
    },
    {
      key: 'dataIndex',
      name: '数据指标',
      type: 'DataIndexSelector',
      options: [],
      dependencies: {
        items: [
          {
            dependKey: 'dataType',
            dependValues: ['dynamic'],
          },
        ],
      },
    },
    // {
    //   key: 'dataTransform',
    //   name: '数据格式转换',
    //   type: 'DataTransform',
    // },
    {
      key: 'isPolling',
      name: '定时刷新',
      type: 'Switch',
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
      key: 'pollingInterval',
      name: '刷新时间',
      type: 'Number',
      dependencies: {
        items: [
          {
            dependKey: 'isPolling',
            dependValues: [true],
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
