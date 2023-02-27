import { iComponentCategory } from '@/typings/SchemaCommon';
import { BaseDataFormConfig, BaseModel, textStyleConfig, textStyleFormConfig } from '../BaseConfig';

export default new BaseModel({
  name: '数字翻牌器',
  type: 'DigitFlop',
  icon: 'icon-NumberRow-1',
  category: iComponentCategory.INOFRMATION,
  config: {
    width: 165,
    height: 100,
    titleConfig: {
      show: true,
      ...textStyleConfig.textStyle,
      fontSize: 24,
    },
    flop: {
      show: true,
      ...textStyleConfig.textStyle,
      fontFamily: 'fantasy',
      fontSize: 36,
      duration: 500,
      splitTime: 50,
      fixed: 0
    },
    prefixConfig: {
      show: true,
      ...textStyleConfig.textStyle,
      fontSize: 16,
    },
    suffixConfig: {
      show: true,
      ...textStyleConfig.textStyle,
      fontSize: 16,
    },
    dataType: 'static',
    dataMapping: [
      { key: 'title', mapping: '' },
      { key: 'value', mapping: '' },
      { key: 'prefix', mapping: '' },
      { key: 'suffix', mapping: '' },
    ],
    dataSource: [
      {
        title: '数字翻牌器',
        value: 489776,
        prefix: "￥",
        suffix: "元"
      }
    ],
  },
  baseConfig: [
    {
      key: 'titleConfig',
      name: '标题配置',
      type: 'Group',
      config: [
        {
          key: 'show',
          name: '是否显示',
          type: 'Switch',
        },
        ...textStyleFormConfig.config,
        {
          key: 'textShadow',
          name: '文字阴影',
          type: 'Color',
        },
        {
          key: 'backgroundColor',
          name: '背景颜色',
          type: 'Color',
        },
      ]
    },
    {
      key: 'flop',
      name: '翻牌器配置',
      type: 'Group',
      config: [
        {
          key: 'duration',
          name: '动画时间',
          type: 'Number',
          range: [0, 1000000]
        },
        {
          key: 'splitTime',
          name: '动画时间切片',
          type: 'Number',
          range: [10, 1000]
        },
        {
          key: 'fixed',
          name: '保留小数位',
          type: 'Number',
          range: [0, 7]
        },
        ...textStyleFormConfig.config,
        {
          key: 'textShadow',
          name: '文字阴影',
          type: 'Color',
        }
      ]
    },
    {
      key: 'prefixConfig',
      name: '前缀配置',
      type: 'Group',
      config: [
        {
          key: 'show',
          name: '是否显示',
          type: 'Switch',
        },
        ...textStyleFormConfig.config,
        {
          key: 'textShadow',
          name: '文字阴影',
          type: 'Color',
        },
        {
          key: 'backgroundColor',
          name: '背景颜色',
          type: 'Color',
        },
      ]
    },
    {
      key: 'suffixConfig',
      name: '后缀配置',
      type: 'Group',
      config: [
        {
          key: 'show',
          name: '是否显示',
          type: 'Switch',
        },
        ...textStyleFormConfig.config,
        {
          key: 'textShadow',
          name: '文字阴影',
          type: 'Color',
        }
      ]
    },
  ],
  dataConfig: [
    ...BaseDataFormConfig
  ],
  eventConfig: [{}],
});
