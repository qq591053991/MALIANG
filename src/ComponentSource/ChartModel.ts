import { iComponentCategory } from '@/typings/SchemaCommon';
import { BaseConfig, BaseFormConfig, iBaseSchema } from './BaseConfig';
import { gridConfig, gridFormConfig } from './ChartConfig/gridConfig';
import { legendConfig, legendFormConfig } from './ChartConfig/legendConfig';
import { BarTypeConfig, BarTypeFormConfig } from './ChartTypeConfig/Bar';
import { LineTypeConfig, LineTypeFormConfig } from './ChartTypeConfig/Line';
import { PieTypeFormConfig, PieTypeConfig } from './ChartTypeConfig/Pie';

export interface iChartSchema extends iBaseSchema {
  chartType?: iChartType;
}

const ChartBaseFormConfig = [
  ...legendFormConfig
];

export const ChartDataConfig = [
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

const ChartBaseConfig = {
  dataType: 'static',
  requestUrl:
    'https://www.fastmock.site/mock/37597c10a5a6e25ce79c38731203c4fd/maliang/indicator/interest/rate/distribution',
  ...gridConfig,
  ...legendConfig,
};

export enum iChartType {
  LINE = 'line',
  BAR = 'bar',
  PIE = 'pie',
}

export function getChartTypeConfig(chartType?: iChartType) {
  switch (chartType) {
    case iChartType.LINE:
      return { ...LineTypeConfig };
    case iChartType.BAR:
      return { ...BarTypeConfig };
    case iChartType.PIE:
      return { ...PieTypeConfig };
    default:
      return {};
  }
}

export function getChartTypeFormConfig(chartType?: iChartType) {
  switch (chartType) {
    case iChartType.LINE:
      return [...LineTypeFormConfig];
    case iChartType.BAR:
      return [...BarTypeFormConfig];
    case iChartType.PIE:
      return [...PieTypeFormConfig];
    default:
      return [];
  }
}

export class ChartModel {
  constructor(config: iChartSchema) {
    return {
      ...config,
      config: {
        ...BaseConfig,
        ...ChartBaseConfig,
        ...getChartTypeConfig(config?.chartType),
        ...config?.config,
      },
      baseConfig: [
        ...BaseFormConfig,
        ...ChartBaseFormConfig,
        ...getChartTypeFormConfig(config?.chartType),
        ...config?.baseConfig,
      ],
      dataConfig: [
        ...ChartDataConfig,
        ...config?.dataConfig,
      ],
      eventConfig: [...config?.eventConfig],
    };
  }
}
