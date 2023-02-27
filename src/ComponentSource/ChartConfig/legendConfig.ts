import { textStyleConfig, textStyleFormConfig } from "../BaseConfig";

export const legendFormConfig = [
    {
        key: 'legend',
        name: '图例',
        type: 'Group',
        config: [
            {
                key: 'left',
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
                key: 'top',
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
                        value: 'middle',
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
                key: 'itemWidth',
                name: '图形宽度',
                type: 'Number',
            },
            {
                key: 'itemHeight',
                name: '图形高度',
                type: 'Number',
            },
            { ...textStyleFormConfig },
        ],
    },
];

export const legendConfig = {
    legend: {
        left: 'auto',
        top: 'auto',
        orient: 'horizontal',
        padding: 10,
        itemGap: 4,
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
            ...textStyleConfig
        },
    }
}