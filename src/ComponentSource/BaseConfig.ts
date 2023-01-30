import { iComponentCategory } from '@/typings/SchemaCommon';

export const BaseConfig = {
  width: 200,
  height: 200,
  // left: 0,
  // top: 0,
};

export const BaseFormConfig = [
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
  // {
  //   key: 'top',
  //   name: '纵向偏移',
  //   type: 'Number',
  // },
  // {
  //   key: 'left',
  //   name: '横向偏移',
  //   type: 'Number',
  // },
];

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

export class BaseModel {
  constructor(config: iSchema) {
    return {
      ...config,
      config: {
        ...BaseConfig,
        ...config?.config,
      },
      baseConfig: [...BaseFormConfig, ...config?.baseConfig],
      dataConfig: [...config?.dataConfig],
      styleConfig: [...config?.styleConfig],
      eventConfig: [...config?.eventConfig],
    };
  }
}
