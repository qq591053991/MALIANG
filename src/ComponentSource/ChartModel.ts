import { iComponentCategory } from '@/typings/SchemaCommon';
import { BaseConfig, BaseFormConfig } from './BaseConfig';

interface iSchema {
  name: string;
  type: string;
  icon: string;
  category: iComponentCategory;
  config: Record<string, any>;
  baseConfig: Record<string, any>[];
  dataConfig: Record<string, any>[];
  styleConfig: Record<string, any>[];
  eventConfig: Record<string, any>[];
}

const ChartStyleFormConfig = [
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
        name: '元素间距',
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
        key: 'smooth',
        name: '平滑曲线',
        type: 'Number',
      },
    ],
  },
];

export class ChartModel {
  constructor(config: iSchema) {
    return {
      ...config,
      config: {
        ...BaseConfig,
        ...config?.config,
      },
      baseConfig: [
        ...BaseFormConfig,
        ...config?.baseConfig,
        ...ChartStyleFormConfig,
      ],
      dataConfig: [...config?.dataConfig],
      styleConfig: [...config?.styleConfig],
      eventConfig: [...config?.eventConfig],
    };
  }
}
