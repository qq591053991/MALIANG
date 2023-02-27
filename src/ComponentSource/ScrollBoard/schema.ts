import { iComponentCategory } from '@/typings/SchemaCommon';
import { BaseModel } from '../BaseConfig';

const mockDataSource = {
  header: ['列1', '列2', '列3'],
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
    width: 650,
    dataType: 'static',
    requestUrl:
      'https://www.fastmock.site/mock/37597c10a5a6e25ce79c38731203c4fd/maliang/indicator/interest/rate/distribution',
    dataSource: mockDataSource,
    globalConfig: {
      waitTime: 2000,
      rowNum: 6,
      index: true,
    },
    headerConfig: {
      headerHeight: 30,
      headerBGC: 'rgba(10, 115, 217, 0.2)',
    },
    lineConfig: {
      oddRowBGC: 'rgba(10, 115, 255, 0)',
      evenRowBGC: 'rgba(9,109,217,0.3)',
    },
    columns: [
      {
        columnWidth: 50,
        textStyle: {
          color: '#fff',
          fontSize: 14,
        },
      },
      {
        columnWidth: 200,
        textStyle: {
          color: '#fff',
          fontSize: 14,
        },
      },
      {
        columnWidth: 200,
        textStyle: {
          color: '#fff',
          fontSize: 14,
        },
      },
      {
        columnWidth: 200,
        textStyle: {
          color: '#fff',
          fontSize: 14,
        },
      },
    ],
  },
  baseConfig: [
    {
      key: 'globalConfig',
      name: '全局设定',
      type: 'Group',
      config: [
        {
          key: 'index',
          name: '显示序列号',
          type: 'Switch',
        },
        {
          key: 'rowNum',
          name: '表格行数',
          type: 'Number',
        },
        {
          key: 'waitTime',
          name: '轮播时间',
          type: 'Number',
        },
      ],
    },
    {
      key: 'headerConfig',
      name: '表头',
      type: 'Group',
      config: [
        {
          key: 'headerVisible',
          name: '是否显示',
          type: 'Switch',
        },
        {
          key: 'headerHeight',
          name: '表头行高',
          type: 'Number',
        },
        {
          key: 'headerBGC',
          name: '背景颜色',
          type: 'Color',
        },
      ],
    },
    {
      key: 'lineConfig',
      name: '行配置',
      type: 'Group',
      config: [
        {
          key: 'oddRowBGC',
          name: '奇数行背景色',
          type: 'Color',
        },
        {
          key: 'evenRowBGC',
          name: '偶数行背景色',
          type: 'Color',
        },
      ],
    },
    {
      key: 'columns',
      name: '自定义列',
      type: 'TabList',
      initialValue: {
        columnWidth: 200,
        textStyle: {
          color: '#fff',
          fontSize: 12,
        },
      },
      config: [
        {
          key: 'columnWidth',
          name: '列宽度',
          type: 'Number',
        },
        {
          key: 'align',
          name: '对齐方式',
          type: 'Select',
          options: [
            {
              label: '左对齐',
              value: 'left'
            },
            {
              label: '居中对齐',
              value: 'center'
            },
            {
              label: '右对齐',
              value: 'right'
            }
          ]
        },
        {
          key: 'textStyle',
          name: '文本样式',
          type: 'Group',
          config: [
            {
              key: 'color',
              name: '颜色',
              type: 'Color',
            },
            {
              key: 'fontSize',
              name: '字号',
              type: 'Number',
            },
          ],
        },
      ],
    },
  ],
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

  eventConfig: [{}],
});
