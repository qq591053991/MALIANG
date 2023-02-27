import { default_theme } from "@/theme/echart-theme";
import { axisConfig, xAxisFormConfig, yAxisFormConfig } from "../ChartConfig/axisConfig";
import { gridConfig, gridFormConfig } from "../ChartConfig/gridConfig";
import { tooltipConfig, tooltipFormConfig } from "../ChartConfig/tooltipConfig";

export const seriesFormConfig = [
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
                            {
                                label: '点线',
                                value: 'dotted',
                            }
                        ],
                    },
                    {
                        key: 'opacity',
                        name: '不透明度',
                        type: 'Number',
                        step: 0.1,
                        range: [0, 1]
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
                        name: '不透明度',
                        type: 'Number',
                        range: [0, 1],
                        step: 0.1
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
                        name: '不透明度',
                        type: 'Number',
                        range: [0, 1],
                        step: 0.1
                    },
                ],
            },
            {
                key: 'smooth',
                name: '平滑曲线',
                type: 'Number',
                range: [0, 1],
                step: 0.1
            },
        ],
    }
]

export const seriesConfig = [
    {
        lineStyle: {
            color: '#0a73ff',
            width: 1,
            type: 'solid',
            opacity: 1,
        },
        itemStyle: {
            color: '#0a73ff',
            opacity: 1
        },
        areaStyle: {
            color: 'rgba(255,255,255,0)',
            opacity: 1
        },
        smooth: 0
    }
];

export const multSeriesConfig = default_theme.color.map((lineColor: string) => ({
    lineStyle: {
        color: lineColor,
        width: 1,
        type: 'solid',
        opacity: 1,
    },
    itemStyle: {
        color: lineColor,
        opacity: 1
    },
    areaStyle: {
        color: 'rgba(255,255,255,0)',
        opacity: 1
    },
    smooth: 0
}))

export const LineTypeFormConfig = [
    { ...gridFormConfig },
    ...xAxisFormConfig,
    ...yAxisFormConfig,
    { ...tooltipFormConfig },
];

export const LineTypeConfig = {
    width: 300,
    height: 200,
    ...tooltipConfig,
    ...gridConfig,
    yAxis: {
        ...axisConfig
    },
    xAxis: {
        ...axisConfig
    },
    series: seriesConfig
}