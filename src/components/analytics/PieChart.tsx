import React from 'react';
import ReactECharts from 'echarts-for-react';

interface PieChartProps {
  data: Array<{ name: string; value: number; color: string }>;
  height?: number;
}

const PieChart: React.FC<PieChartProps> = ({ data, height = 300 }) => {
  const seriesData = data.map(item => ({
    name: item.name,
    value: item.value,
    itemStyle: {
      color: item.color
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
      formatter: '{a}: <br/>{b}: {c} ({d}%)'
    },
    legend: {
      bottom: 0,
      left: 'center',
      textStyle: {
        color: '#6b7280',
        fontSize: 12
      }
    },
    series: [{
      name: 'درصد',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '40%'],
      data: seriesData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      label: {
        show: false
      },
      labelLine: {
        show: false
      }
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

export default PieChart;