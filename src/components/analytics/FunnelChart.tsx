import React from 'react';
import ReactECharts from 'echarts-for-react';

interface FunnelStage {
  label: string;
  value: number;
  percentage: number;
  color: string;
}

interface FunnelChartProps {
  stages: FunnelStage[];
  height?: number;
}

const FunnelChart: React.FC<FunnelChartProps> = ({ stages, height = 300 }) => {
  const seriesData = stages.map(stage => ({
    name: stage.label,
    value: stage.value,
    itemStyle: {
      color: stage.color
    }
  }));

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: '#ffffff',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      borderRadius: 8,
      textStyle: {
        fontSize: 12,
        color: '#374151'
      },
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowBlur: 6,
      shadowOffsetX: 0,
      shadowOffsetY: 4,
      formatter: '{b}: {c} ({d}%)'
    },
    series: [{
      name: 'Funnel',
      type: 'funnel',
      left: '10%',
      top: 60,
      bottom: 60,
      width: '80%',
      min: 0,
      max: Math.max(...stages.map(stage => stage.value)),
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending',
      gap: 2,
      label: {
        show: true,
        position: 'inside',
        formatter: '{b}',
        color: '#fff',
        fontSize: 12
      },
      labelLine: {
        length: 10,
        lineStyle: {
          width: 1,
          type: 'solid'
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1
      },
      emphasis: {
        label: {
          fontSize: 14
        }
      },
      data: seriesData
    }]
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: `${height}px`, width: '100%' }}
      opts={{ renderer: 'canvas' }}
    />
  );
};

export default FunnelChart;