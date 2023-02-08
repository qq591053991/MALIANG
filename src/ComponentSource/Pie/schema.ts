import { iComponentCategory } from '@/typings/SchemaCommon';
import { ChartModel } from '../ChartModel';

export default new ChartModel({
  name: '饼图',
  type: 'Pie',
  icon: 'icon-shanxingtu',
  category: iComponentCategory.CHART,
  config: {
    dataType: 'static',
    requestUrl:
      'https://www.fastmock.site/mock/37597c10a5a6e25ce79c38731203c4fd/maliang/indicator/interest/rate/distribution',
    dataSource: [
      {
        xAxis: 'Mon',
        yAxis: Math.random(),
      },
      {
        xAxis: 'Tue',
        yAxis: Math.random(),
      },
      {
        xAxis: 'Wed',
        yAxis: Math.random(),
      },
      {
        xAxis: 'Thu',
        yAxis: Math.random(),
      },
      {
        xAxis: 'Fri',
        yAxis: Math.random(),
      },
      {
        xAxis: 'Sat',
        yAxis: Math.random(),
      },
      {
        xAxis: 'Sun',
        yAxis: Math.random(),
      },
    ],
    dataMapping: [
      { key: 'xAxis', mapping: '' },
      { key: 'yAxis', mapping: '' },
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
