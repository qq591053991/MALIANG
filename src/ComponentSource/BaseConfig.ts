import { iComponentCategory } from '@/typings/SchemaCommon';

export const BaseDataFormConfig = [
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
];

export const BaseConfig = {
  width: 200,
  height: 200,
  opacity: 1
  // left: 0,
  // top: 0,
};

export const BaseFormConfig = [
  {
    key: 'componentName',
    name: '名称',
    type: 'Text',
  },
  {
    key: 'width',
    name: '宽度',
    type: 'Number',
  },
  {
    key: 'height',
    name: '高度',
    type: 'Number',
  },
  {
    key: 'top',
    name: '纵向偏移',
    type: 'Number',
  },
  {
    key: 'left',
    name: '横向偏移',
    type: 'Number',
  },
  {
    key: 'opacity',
    name: '不透明度',
    type: 'Number',
    step: 0.1,
    range: [0, 1]
  },
  {
    key: 'zIndex',
    name: '组件层级',
    type: 'Number',
  },
];

export const textStyleConfig = {
  textStyle: {
    color: '#fff',
    fontFamily: 'system-ui',
    fontWeight: 'normal',
    fontSize: 12
  }
}

export const textStyleFormConfig = {
  key: 'textStyle',
  name: '文本样式',
  type: 'Group',
  config: [
    {
      key: 'fontFamily',
      name: '字体',
      type: 'Select',
      options: [
        {
          label: '默认字体',
          value: 'system-ui'
        },
        {
          label: '微软雅黑',
          value: `"Microsoft Yahei"`
        },
        {
          label: '黑体',
          value: `SimHei`
        },
        {
          label: '宋体',
          value: `SimSun`
        },
        {
          label: '仿宋',
          value: 'fangsong'
        },
        {
          label: 'fantasy',
          value: 'fantasy'
        },
        {
          label: 'arial',
          value: 'arial'
        },
        {
          label: 'tahoma',
          value: 'tahoma'
        },
        {
          label: 'sans-serif',
          value: 'sans-serif'
        },
      ]
    },
    {
      key: 'fontSize',
      name: '字号',
      type: 'Number',
    },
    {
      key: 'color',
      name: '颜色',
      type: 'Color',
    },
    {
      key: 'fontWeight',
      name: '字体粗细',
      type: 'Select',
      options: [
        {
          label: 'Normal',
          value: 'normal',
        },
        {
          label: 'Bold',
          value: 'bold',
        },
        {
          label: 'Bolder',
          value: 'bolder',
        },
        ...[...new Array(9)].map((item, index) => ({
          label: (index + 1) * 100,
          value: (index + 1) * 100,
        })),
      ],
    },
  ],
};

export interface iBaseSchema {
  name: string;
  type: string;
  icon: string;
  category: iComponentCategory;
  config: Record<string, any>;
  baseConfig: Record<string, any>[];
  dataConfig: Record<string, any>[];
  eventConfig: Record<string, any>[];
}

export class BaseModel {
  constructor(config: iBaseSchema) {
    return {
      ...config,
      config: {
        ...BaseConfig,
        ...config?.config,
      },
      baseConfig: [...BaseFormConfig, ...config?.baseConfig],
      dataConfig: [...config?.dataConfig],
      eventConfig: [...config?.eventConfig],
    };
  }
}
