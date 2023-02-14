import React from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts, { registerMap } from 'echarts';
import MyEcharts from '@/components/MyEcharts';
import geoJson from './geo/100000';

registerMap('china', geoJson);

export default function ChinaMap(props) {
  const options = {
    geo: {
      map: 'china',
      aspectScale: 0.85,
      layoutCenter: ['50%', '60%'], //地图位置
      layoutSize: '100%',
      label: {
        emphasis: {
          show: false,
        },
      },
      itemStyle: {
        normal: {
          shadowColor: '#276fce',
          shadowOffsetX: 0,
          shadowOffsetY: 15,
          opacity: 0.5,
        },
        emphasis: {
          areaColor: '#276fce',
        },
      },
      regions: [
        {
          name: '南海诸岛',
          itemStyle: {
            areaColor: 'rgba(0, 10, 52, 1)',
            borderColor: 'rgba(0, 10, 52, 1)',
            normal: {
              opacity: 0,
              label: {
                show: false,
                color: '#009cc9',
              },
            },
          },
          label: {
            show: false,
            color: '#FFFFFF',
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      // 常规地图
      {
        type: 'map',
        mapType: 'china',
        aspectScale: 0.85,
        layoutCenter: ['50%', '60%'], //地图位置
        layoutSize: '100%',
        zoom: 1, //当前视角的缩放比例
        // roam: true, //是否开启平游或缩放
        scaleLimit: {
          //滚轮缩放的极限控制
          min: 1,
          max: 2,
        },
        itemStyle: {
          normal: {
            areaColor: '#0c274b',
            borderColor: '#1cccff',
            borderWidth: 1.5,
            opacity: 0.8,
          },
          emphasis: {
            areaColor: '#02102b',
            label: {
              color: '#fff',
            },
          },
        },
      },
    ],
  };
  return (
    <MyEcharts option={options} style={{ height: '100%', width: '100%' }} />
  );
}
