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
    key: 'title',
    name: '标题',
    type: 'Text',
  },
  {
    key: 'titleColor',
    name: '标题颜色',
    type: 'Color',
  },
  {
    key: 'legentTextColor',
    name: '图例文字颜色',
    type: 'Color',
  },
  {
    key: 'legentTextSize',
    name: '图例文字大小',
    type: 'Number',
  },
  {
    key: 'color',
    name: '轴线/柱颜色',
    type: 'Color',
  },
  {
    key: 'series',
    name: '系列',
    type: 'Series',
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
