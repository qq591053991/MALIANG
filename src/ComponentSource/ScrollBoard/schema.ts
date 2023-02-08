import { iComponentCategory } from '@/typings/SchemaCommon';
import { BaseModel } from '../BaseConfig';

const mockDataSource = {
  data: [
    [
      '裸体人像检测*置信度0.23',
      '人脸翻拍*置信度0.23',
      '中介背景识别*置信度0.23',
    ],
    ['注意力异常*置信度0.23', '年龄范围*20-29青年', '身份证翻拍*置信度0.34'],
    ['身份证造假*置信度0.23', '拍摄场景*车内', '额度评分*554'],
    [
      '裸体人像检测*置信度0.23',
      '人脸翻拍*置信度0.23',
      '中介背景识别*置信度0.23',
    ],
    ['注意力异常*置信度0.23', '年龄范围*20-29青年', '身份证翻拍*置信度0.34'],
    ['身份证造假*置信度0.23', '拍摄场景*车内', '额度评分*554'],
    [
      '裸体人像检测*置信度0.23',
      '人脸翻拍*置信度0.23',
      '中介背景识别*置信度0.23',
    ],
    ['注意力异常*置信度0.23', '年龄范围*20-29青年', '身份证翻拍*置信度0.34'],
    ['身份证造假*置信度0.23', '拍摄场景*车内', '额度评分*554'],
    [
      '裸体人像检测*置信度0.23',
      '人脸翻拍*置信度0.23',
      '中介背景识别*置信度0.23',
    ],
    ['注意力异常*置信度0.23', '年龄范围*20-29青年', '身份证翻拍*置信度0.34'],
    ['身份证造假*置信度0.23', '拍摄场景*车内', '额度评分*554'],
    [
      '裸体人像检测*置信度0.23',
      '人脸翻拍*置信度0.23',
      '中介背景识别*置信度0.23',
    ],
    ['注意力异常*置信度0.23', '年龄范围*20-29青年', '身份证翻拍*置信度0.34'],
    ['身份证造假*置信度0.23', '拍摄场景*车内', '额度评分*554'],
    [
      '裸体人像检测*置信度0.23',
      '人脸翻拍*置信度0.23',
      '中介背景识别*置信度0.23',
    ],
    ['注意力异常*置信度0.23', '年龄范围*20-29青年', '身份证翻拍*置信度0.34'],
    ['身份证造假*置信度0.23', '拍摄场景*车内', '额度评分*554'],
  ],
};

export default new BaseModel({
  name: '轮播表',
  type: 'ScrollBoard',
  icon: 'icon-lunbobiaoge',
  category: iComponentCategory.CONTORL,
  config: {
    dataType: 'static',
    requestUrl:
      'https://www.fastmock.site/mock/37597c10a5a6e25ce79c38731203c4fd/maliang/indicator/interest/rate/distribution',
    dataSource: mockDataSource,
    // dataMapping: [
    //   { key: 'xAxis', mapping: '' },
    //   { key: 'yAxis', mapping: '' },
    // ],
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
    // {
    //   key: 'dataMapping',
    //   name: '数据接口',
    //   type: 'DataMapping',
    // },
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
