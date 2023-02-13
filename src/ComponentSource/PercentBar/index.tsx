import React from 'react';
import ReactEcharts from 'echarts-for-react';
import MyEcharts from '@/components/MyEcharts';

export default function PercentBar(props) {
  const { dataSource = [], legend, grid } = props;
  const defaultXData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const defaultYData = [150, 230, 224, 218, 135, 147, 260];
  const xAxis = dataSource?.map((item) => item?.xAxis) || defaultXData;
  const yAxis = dataSource?.map((item) => item?.yAxis) || defaultYData;

  var max = Math.max.apply(null, yAxis);
  var emptyData = yAxis.map(function (v, i) {
    var sum = yAxis.reduce((prev, cur) => prev + cur, 0);
    var lab = ((v / sum) * 100).toFixed(2);
    var item = {
      value: sum,
      label: {
        //右边数值
        formatter: '{a|' + lab + '%}',
        position: 'right',
        rich: {
          a: {
            color: '#3eb4fa',
            fontSize: 16,
            padding: [5, 10],
          },
        },
      },
    };
    return item;
  });
  const options = {
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: function (params, ticket, callback) {
        var res = '';
        var name = xAxis[params.dataIndex];
        var value = yAxis[params.dataIndex];
        res = name + '<br />访问量：' + value;
        return res;
      },
    },
    legend,
    grid,
    xAxis: [
      {
        axisLabel: {
          //坐标轴字体颜色
          show: false,
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: 'rgba(255,255,255,0.12)',
          },
        },
        axisTick: {
          //y轴刻度线
          show: false,
        },
        splitLine: {
          //网格
          show: false,
        },
        max: function (value) {
          return value.max;
        },
      },
    ],
    yAxis: [
      {
        type: 'category',
        show: true,
        inverse: true,
        data: xAxis,
        axisTick: {
          //y轴刻度线
          show: false,
        },
        axisLabel: {
          formatter: '{value}',
          color: '#6fa7e0',
          fontSize: 16,
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      {
        type: 'category',
        name: '',
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        inverse: true,
        data: xAxis,
      },
    ],
    series: [
      {
        type: 'bar',
        barWidth: '30%',
        yAxisIndex: 1,
        emphasis: {
          disabled: true,
        },
        itemStyle: {
          normal: {
            color: 'rgba(7, 36, 74, 0.6)',
          },
        },
        label: {
          show: true,
        },
        tooltip: {
          show: false,
        },
        data: emptyData,
      },
      {
        show: true,
        type: 'bar',
        barWidth: '35%',
        z: 2,
        label: {
          show: true,
        },
        data: yAxis,
      },
    ],
  };
  return <MyEcharts option={options} />;
}
