import { iComponentCategory } from '@/typings/SchemaCommon';
import { BaseConfig, BaseFormConfig, iBaseSchema } from './BaseConfig';

interface iChartSchema extends iBaseSchema {
  chartType: iChartType;
}

const ChartBaseFormConfig = [
  {
    key: 'legend',
    name: '图例',
    type: 'Group',
    config: [
      {
        key: 'horizontalPosition',
        name: '水平位置',
        type: 'Select',
        options: [
          {
            label: '自动',
            value: 'auto',
          },
          {
            label: '左对齐',
            value: 'left',
          },
          {
            label: '居中对齐',
            value: 'center',
          },
          {
            label: '右对齐',
            value: 'right',
          },
        ],
      },
      {
        key: 'verticalPosition',
        name: '竖直位置',
        type: 'Select',
        options: [
          {
            label: '自动',
            value: 'auto',
          },
          {
            label: '顶部对齐',
            value: 'top',
          },
          {
            label: '居中对齐',
            value: 'center',
          },
          {
            label: '底部对齐',
            value: 'bottom',
          },
        ],
      },
      {
        key: 'orient',
        name: '朝向',
        type: 'Select',
        options: [
          {
            label: '垂直',
            value: 'vertical',
          },
          {
            label: '水平',
            value: 'horizontal',
          },
        ],
      },
      {
        key: 'padding',
        name: '内边距',
        type: 'Number',
      },
      {
        key: 'itemGap',
        name: '图例项间距',
        type: 'Number',
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
          {
            key: 'fontSize',
            name: '字号',
            type: 'Number',
          },
        ],
      },
    ],
  },
];

const ChartDataConfig = [
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
  grid: {
    left: 30,
    right: 30,
    top: 30,
    bottom: 30,
  },
  legend: {
    horizontalPosition: 'auto',
    verticalPosition: 'auto',
    orient: 'horizontal',
    padding: 30,
    itemGap: 20,
    textStyle: {
      color: '#fff',
      fontWeight: 300,
      fontSize: 18,
    },
  },
};

export const LineSeries = [
  {
    key: 'grid',
    name: '网格',
    type: 'Group',
    config: [
      {
        key: 'left',
        name: '左边距',
        type: 'Number',
      },
      {
        key: 'top',
        name: '上边距',
        type: 'Number',
      },
      {
        key: 'right',
        name: '右边距',
        type: 'Number',
      },
      {
        key: 'bottom',
        name: '下边距',
        type: 'Number',
      },
    ],
  },
  {
    key: 'series',
    name: '系列',
    type: 'TabList',
    config: [
      {
        key: 'lineStyle',
        name: '线条样式',
        type: 'Group',
        config: [
          {
            key: 'color',
            name: '线条颜色',
            type: 'Color',
          },
          {
            key: 'width',
            name: '线条宽度',
            type: 'Number',
          },
          {
            key: 'type',
            name: '线条类型',
            type: 'Select',
            options: [
              {
                label: '实线',
                value: 'solid',
              },
              {
                label: '虚线',
                value: 'dashed',
              },
            ],
          },
          {
            key: 'opacity',
            name: '透明度',
            type: 'Number',
          },
        ],
      },
      {
        key: 'itemStyle',
        name: '折线拐点样式',
        type: 'Group',
        config: [
          {
            key: 'color',
            name: '折线拐点颜色',
            type: 'Color',
          },
          {
            key: 'opacity',
            name: '透明度',
            type: 'Number',
          },
        ],
      },
      {
        key: 'areaStyle',
        name: '折线区域样式',
        type: 'Group',
        config: [
          {
            key: 'color',
            name: '区域颜色',
            type: 'GradientColor',
          },
          {
            key: 'opacity',
            name: '透明度',
            type: 'Number',
          },
        ],
      },
      {
        key: 'smooth',
        name: '平滑曲线',
        type: 'Number',
      },
    ],
  },
];

export enum iChartType {
  LINE = 'line',
  BAR = 'bar',
  PIE = 'pie',
}

export function getChartTypeFormConfig(chartType: iChartType) {
  switch (chartType) {
    case iChartType.LINE:
      return [...LineSeries];

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
        ...config?.config,
        ...ChartBaseConfig,
      },
      baseConfig: [
        ...BaseFormConfig,
        ...config?.baseConfig,
        ...ChartBaseFormConfig,
        ...getChartTypeFormConfig(config.chartType),
      ],
      dataConfig: [...config?.dataConfig, ...ChartDataConfig],
      styleConfig: [...config?.styleConfig],
      eventConfig: [...config?.eventConfig],
    };
  }
}
