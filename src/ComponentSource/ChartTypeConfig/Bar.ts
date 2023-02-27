import { axisConfig, xAxisFormConfig, yAxisFormConfig } from "../ChartConfig/axisConfig";
import { gridFormConfig } from "../ChartConfig/gridConfig";
import { tooltipConfig, tooltipFormConfig } from "../ChartConfig/tooltipConfig";

export const BarTypeFormConfig = [
    ...xAxisFormConfig,
    ...yAxisFormConfig,
    { ...tooltipFormConfig },
    { ...gridFormConfig }
];

export const BarTypeConfig = {
    width: 300,
    height: 200,
    tooltip: {
        ...tooltipConfig.tooltip,
        axisPointer: {
            ...tooltipConfig.tooltip.axisPointer,
            type: 'shadow',
            shadowStyle: {
                color: '#dce7f8',
                opacity: 0.3,
            }
        }
    },
    yAxis: {
        ...axisConfig
    },
    xAxis: {
        ...axisConfig
    }
}