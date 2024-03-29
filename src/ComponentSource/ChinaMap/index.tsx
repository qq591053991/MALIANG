import React from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts, { registerMap } from 'echarts';
import MyEcharts from '@/components/MyEcharts';
import geoJson from './geo/100000';
import EChartsReact from 'echarts-for-react';

registerMap('china', geoJson);

export default function ChinaMap(props) {
  const options = {
    geo: {
      map: 'china',
      aspectScale: 0.85,
      layoutCenter: ['50%', '60%'], //地图位置
      layoutSize: '100%',
      label: {
        normal: {
          show: false,
        },
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
        label: {
          normal: {
            show: true,
            color: "rgba(249, 249, 249,1)", //省份标签字体颜色
            formatter: p => {
              if (p.name.endsWith('省') || p.name.endsWith('市')) {
                p.name = p.name.slice(0, -1)
                return p.name
              }
              switch (p.name) {
                case '内蒙古自治区':
                  return "内蒙古"
                  break;
                case '西藏自治区':
                  return "西藏"
                  break;
                case '新疆维吾尔自治区':
                  return "新疆"
                  break;
                case '宁夏回族自治区':
                  return "宁夏"
                  break;
                case '广西壮族自治区':
                  return "广西"
                  break;
                case '香港特别行政区':
                  return "香港"
                  break;
                case '澳门特别行政区':
                  return "澳门"
                  break;

              }
              return p.name;
            }
          },
          emphasis: {
            show: true,
            color: '#fff',
          }
        },
        itemStyle: {
          normal: {
            areaColor: '#0c274b',
            borderColor: '#1cccff',
            borderWidth: 1.5,
            opacity: 0.8,
          },
          emphasis: {
            // areaColor: '#02102b',
            areaColor: 'rgba(31,219,207,0.6)',
            label: {
              color: '#fff',
            },
          },
        },
        select: {
          itemStyle: {
            areaColor: 'rgba(8,123,249,1)',
          }
        }
      },
    ],
  };
  return (
    <EChartsReact option={options} style={{ height: '100%', width: '100%' }} />
  );
}
