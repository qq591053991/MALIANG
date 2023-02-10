import { EChartsOption } from 'echarts-for-react';

export const default_theme: EChartsOption = {
  color: [
    '#0a73ff',
    '#3dabff',
    '#57cdff',
    '#70deff',
    '#a3f6ff',
    '#bdfdff',
    '#d6fffe',
  ],
  backgroundColor: 'rgba(255,255,255,0)',
  textStyle: {},
  title: {
    textStyle: {
      color: '#516b91',
    },
    subtextStyle: {
      color: '#93b7e3',
    },
  },
  line: {
    itemStyle: {
      borderWidth: '2',
    },
    lineStyle: {
      width: '2',
    },

    symbolSize: '6',
    symbol: 'emptyCircle',
    smooth: false,
  },
  radar: {
    itemStyle: {
      borderWidth: '2',
    },
    lineStyle: {
      width: '2',
    },
    symbolSize: '6',
    symbol: 'emptyCircle',
    smooth: true,
  },
  bar: {
    itemStyle: {
      barBorderWidth: 0,
      barBorderColor: '#ccc',
    },
  },
  pie: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  scatter: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  boxplot: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  parallel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  sankey: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  funnel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  gauge: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  candlestick: {
    itemStyle: {
      color: '#edafda',
      color0: 'transparent',
      borderColor: '#d680bc',
      borderColor0: '#8fd3e8',
      borderWidth: '2',
    },
  },
  graph: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
    lineStyle: {
      width: 1,
      color: '#aaaaaa',
    },
    symbolSize: '6',
    symbol: 'emptyCircle',
    smooth: true,
    color: [
      '#0a73ff',
      '#3dabff',
      '#57cdff',
      '#70deff',
      '#a3f6ff',
      '#bdfdff',
      '#d6fffe',
    ],
    label: {
      color: '#eeeeee',
    },
  },
  map: {
    itemStyle: {
      areaColor: '#f3f3f3',
      borderColor: '#516b91',
      borderWidth: 0.5,
    },
    label: {
      color: '#000',
    },
    emphasis: {
      itemStyle: {
        areaColor: '#a5e7f0',
        borderColor: '#516b91',
        borderWidth: 1,
      },
      label: {
        color: '#516b91',
      },
    },
  },
  geo: {
    itemStyle: {
      areaColor: '#f3f3f3',
      borderColor: '#516b91',
      borderWidth: 0.5,
    },
    label: {
      color: '#000',
    },
    emphasis: {
      itemStyle: {
        areaColor: '#a5e7f0',
        borderColor: '#516b91',
        borderWidth: 1,
      },
      label: {
        color: '#516b91',
      },
    },
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: 'rgba(255,255,255,0.1)',
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#ececec',
      },
    },
    axisLabel: {
      show: true,
      color: 'rgb(144,160,174)',
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ['rgba(255,255,255,0.1)'],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(221,62,62,0.05)', 'rgba(200,200,200,0.02)'],
      },
    },
  },
  valueAxis: {
    axisLine: {
      show: false,
      lineStyle: {
        color: 'rgba(255,255,255,0.1)',
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#ececec',
      },
    },
    axisLabel: {
      show: true,
      color: 'rgb(144,160,174)',
    },
    splitLine: {
      show: true,
      lineStyle: {
        width: 1.2,
        type: 'dashed',
        color: ['rgba(20,65,142,0.84)'],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(221,62,62,0.05)', 'rgba(200,200,200,0.02)'],
      },
    },
  },
  logAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: 'rgba(255,255,255,0.1)',
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#ececec',
      },
    },
    axisLabel: {
      show: true,
      color: 'rgb(144,160,174)',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['rgba(255,255,255,0.2)'],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(221,62,62,0.05)', 'rgba(200,200,200,0.02)'],
      },
    },
  },
  timeAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: 'rgba(255,255,255,0.1)',
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#ececec',
      },
    },
    axisLabel: {
      show: true,
      color: 'rgb(144,160,174)',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['rgba(255,255,255,0.2)'],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(221,62,62,0.05)', 'rgba(200,200,200,0.02)'],
      },
    },
  },
  toolbox: {
    iconStyle: {
      borderColor: '#999999',
    },
    emphasis: {
      iconStyle: {
        borderColor: '#666666',
      },
    },
  },
  legend: {
    textStyle: {
      color: 'rgb(144,160,174)',
    },
  },
  tooltip: {
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    borderColor: 'none',
    borderWidth: 0,
    axisPointer: {
      lineStyle: {
        color: '#ff0000',
        width: 1,
      },
      crossStyle: {
        color: '#ff0000',
        width: 1,
      },
    },
    textStyle: {
      color: '#fff',
    },
  },
  timeline: {
    lineStyle: {
      color: '#8fd3e8',
      width: 1,
    },
    itemStyle: {
      color: '#8fd3e8',
      borderWidth: 1,
    },
    controlStyle: {
      color: '#8fd3e8',
      borderColor: '#8fd3e8',
      borderWidth: 0.5,
    },
    checkpointStyle: {
      color: '#8fd3e8',
      borderColor: '#8a7ca8',
    },
    label: {
      color: '#8fd3e8',
    },
    emphasis: {
      itemStyle: {
        color: '#8fd3e8',
      },
      controlStyle: {
        color: '#8fd3e8',
        borderColor: '#8fd3e8',
        borderWidth: 0.5,
      },
      label: {
        color: '#8fd3e8',
      },
    },
  },
  visualMap: {
    color: ['#516b91', '#59c4e6', '#a5e7f0'],
  },
  dataZoom: {
    backgroundColor: 'rgba(0,0,0,0)',
    dataBackgroundColor: 'rgba(255,255,255,0.3)',
    fillerColor: 'rgba(167,183,204,0.4)',
    handleColor: '#a7b7cc',
    handleSize: '100%',
    textStyle: {
      color: '#333',
    },
  },
  markPoint: {
    label: {
      color: '#eeeeee',
    },
    emphasis: {
      label: {
        color: '#eeeeee',
      },
    },
  },
};
