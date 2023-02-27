import { textStyleConfig, textStyleFormConfig } from "../BaseConfig"


export const axisLabelFormConfig = [
    {
        key: 'axisLabel',
        name: '刻度标签',
        type: 'Group',
        config: [
            {
                key: 'show',
                name: '是否显示',
                type: 'Switch',
            },
            {
                key: 'interval',
                name: '标签间隔',
                type: 'Number',
            },
            {
                key: 'inside',
                name: '内部',
                type: 'Switch',
            },
            {
                key: 'rotate',
                name: '旋转角度',
                type: 'Number',
                range: [-90, 90]
            },
            {
                key: 'margin',
                name: '外间距',
                type: 'Number',
            },
            ...textStyleFormConfig.config
        ],
    },
];

export const axisFormConfig = [
    {
        key: 'show',
        name: '是否显示',
        type: 'Switch'
    },
    {
        key: 'name',
        name: '轴名称',
        type: 'Text'
    },
    {
        key: 'nameTextStyle',
        name: '名称文字配置',
        type: 'Group',
        config: [
            {
                key: 'nameLocation',
                name: '显示位置',
                type: 'Select',
                options: [
                    {
                        label: '起点',
                        value: 'start'
                    },
                    {
                        label: '居中',
                        value: 'center'
                    },
                    {
                        label: '终点',
                        value: 'end'
                    }
                ]
            },
            {
                key: 'nameGap',
                name: '间距',
                type: 'Number'
            },
            {
                key: 'nameRotate',
                name: '旋转角度',
                type: 'Number',
            },
            ...textStyleFormConfig?.config
        ]
    },
    {
        key: 'inverse',
        name: '反向',
        type: 'Switch'
    },
    ...axisLabelFormConfig,
]

export const axisLabelConfig = {
    show: true,
    inside: false,
    rotate: 0,
    margin: 10,
    ...textStyleConfig.textStyle
}

export const axisConfig = {
    show: true,
    nameLocation: 'end',
    nameTextStyle: textStyleConfig.textStyle,
    nameGap: 10,
    nameRotate: 0,
    boundaryGap: true,
    axisLabel: axisLabelConfig,
}

export const xAxisFormConfig = [
    {
        key: 'xAxis',
        name: 'x轴',
        type: 'Group',
        config: [
            ...axisFormConfig,
            {
                key: 'boundaryGap',
                name: '两边留白',
                type: 'Switch'
            },
        ]
    }
];

export const yAxisFormConfig = [
    {
        key: 'yAxis',
        name: 'y轴',
        type: 'Group',
        config: axisFormConfig
    }
];