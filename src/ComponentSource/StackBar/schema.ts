import { iComponentCategory } from '@/typings/SchemaCommon';
import { BaseModel } from '../BaseConfig';

const defaultDatasource = [
  {
    xAxis: '5%',
    yAxis: '200',
    series: '大盘',
  },
  {
    xAxis: '5%',
    yAxis: '100',
    series: 'xx贷',
  },
  {
    xAxis: '5%',
    yAxis: '200',
    series: 'xx贷款2',
  },
  {
    xAxis: '5%-8%',
    yAxis: '25',
    series: '大盘',
  },
  {
    xAxis: '5%-8%',
    yAxis: '125',
    series: 'xx贷',
  },
  {
    xAxis: '5%-8%',
    yAxis: '100',
    series: 'xx贷款2',
  },
  {
    xAxis: '12%-15%',
    yAxis: '190',
    series: '大盘',
  },
  {
    xAxis: '12%-15%',
    yAxis: '110',
    series: 'xx贷',
  },
  {
    xAxis: '12%-15%',
    yAxis: '170',
    series: 'xx贷款2',
  },
  {
    xAxis: '15%-18%',
    yAxis: '90',
    series: '大盘',
  },
  {
    xAxis: '15%-18%',
    yAxis: '60',
    series: 'xx贷',
  },
  {
    xAxis: '15%-18%',
    yAxis: '70',
    series: 'xx贷款2',
  },
  {
    xAxis: '18%-20%',
    yAxis: '240',
    series: '大盘',
  },
  {
    xAxis: '18%-20%',
    yAxis: '170',
    series: 'xx贷',
  },
  {
    xAxis: '18%-20%',
    yAxis: '280',
    series: 'xx贷款2',
  },
  {
    xAxis: '20%-24%',
    yAxis: '420',
    series: '大盘',
  },
  {
    xAxis: '20%-24%',
    yAxis: '190',
    series: 'xx贷',
  },
  {
    xAxis: '20%-24%',
    yAxis: '390',
    series: 'xx贷款2',
  },
];

export default new BaseModel({
  name: '堆积柱状图',
  type: 'StackBar',
  icon: 'icon-zhuzhuangduidietu',
  category: iComponentCategory.CHART,
  config: {
    width: 540,
    height: 300,
    dataType: 'static',
    requestUrl:
      'https://www.fastmock.site/mock/37597c10a5a6e25ce79c38731203c4fd/maliang/indicator/interest/rate/distribution',
    dataSource: defaultDatasource,
    dataMapping: [
      { key: 'xAxis', mapping: '' },
      { key: 'yAxis', mapping: '' },
      { key: 'series', mapping: '' },
    ],
  },
  baseConfig: [],
  dataConfig: [
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
          value: 'quota',
        },
        {
          label: 'API',
          value: 'api',
        },
      ],
    },
    {
      key: 'dataMapping',
      name: '数据接口',
      type: 'DataMapping',
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
      defaultValue: 'get',
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
      key: 'dataQuota',
      name: '数据指标',
      type: 'DataQuotaSelector',
      options: [],
      dependencies: {
        items: [
          {
            dependKey: 'dataType',
            dependValues: ['quota'],
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
            dependValues: ['quota', 'api'],
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
