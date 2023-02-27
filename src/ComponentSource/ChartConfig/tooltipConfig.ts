
export const tooltipFormConfig = {
    key: 'tooltip',
    name: '提示框',
    type: 'Group',
    config: [
        {
            key: 'show',
            name: '是否显示',
            type: 'Switch',
        },
        {
            key: 'trigger',
            name: '触发器',
            type: 'Select',
            options: [
                {
                    label: '不触发',
                    value: 'none',
                },
                {
                    label: '数据项',
                    value: 'item',
                },
                {
                    label: '坐标轴',
                    value: 'axis',
                },
            ]
        },
        {
            key: 'axisPointer',
            name: '坐标轴指示器',
            type: 'Group',
            config: [
                {
                    key: 'type',
                    name: '类型',
                    type: 'Select',
                    options: [
                        {
                            label: '直线指示器',
                            value: 'line',
                        },
                        {
                            label: '阴影指示器',
                            value: 'shadow',
                        },
                        {
                            label: '交叉指示器',
                            value: 'cross',
                        },
                        {
                            label: '无指示器',
                            value: 'none',
                        },
                    ]
                },
                {
                    key: 'snap',
                    name: '自动吸附',
                    type: 'Switch',
                },
                {
                    key: 'lineStyle',
                    name: '指示线样式',
                    type: 'Group',
                    dependencies: {
                        items: [
                            {
                                dependKey: 'type',
                                dependValues: ['line'],
                            },
                        ],
                    },
                    config: [
                        {
                            key: 'color',
                            name: '颜色',
                            type: 'Color'
                        },
                        {
                            key: 'width',
                            name: '宽度',
                            type: 'Number'
                        },
                        {
                            key: 'type',
                            name: '类型',
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
                                {
                                    label: '点线',
                                    value: 'dotted',
                                }
                            ]
                        },
                        {
                            key: 'opacity',
                            name: '不透明度',
                            type: 'Number',
                            step: 0.1,
                            range: [0, 1]
                        },
                    ]
                },
                {
                    key: 'shadowStyle',
                    name: '指示阴影样式',
                    type: 'Group',
                    dependencies: {
                        items: [
                            {
                                dependKey: 'type',
                                dependValues: ['shadow'],
                            },
                        ],
                    },
                    config: [
                        {
                            key: 'color',
                            name: '颜色',
                            type: 'Color'
                        },
                        {
                            key: 'opacity',
                            name: '不透明度',
                            type: 'Number',
                            step: 0.1,
                            range: [0, 1]
                        },
                    ]
                },
                {
                    key: 'crossStyle',
                    name: '交叉指示线样式',
                    type: 'Group',
                    dependencies: {
                        items: [
                            {
                                dependKey: 'type',
                                dependValues: ['cross'],
                            },
                        ],
                    },
                    config: [
                        {
                            key: 'color',
                            name: '颜色',
                            type: 'Color'
                        },
                        {
                            key: 'width',
                            name: '宽度',
                            type: 'Number'
                        },
                        {
                            key: 'type',
                            name: '类型',
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
                                {
                                    label: '点线',
                                    value: 'dotted',
                                }
                            ]
                        },
                        {
                            key: 'opacity',
                            name: '不透明度',
                            type: 'Number',
                            step: 0.1,
                            range: [0, 1]
                        },
                    ]
                },
            ]
        }
    ]
}


export const tooltipConfig = {
    tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
            type: 'line',
            snap: true,
            lineStyle: {
                type: 'dashed',
                color: '#808080',
                opacity: 1,
                width: 1
            },
            shadowStyle: {
                color: '#808080',
                opacity: 0.1,
            },
            crossStyle: {
                type: 'dashed',
                color: '#808080',
                opacity: 1,
                width: 1
            },
        }
    }
}