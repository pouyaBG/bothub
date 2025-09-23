import React from 'react';
import ReactECharts from 'echarts-for-react';

interface BarChartProps {
  data: Array<{ name: string; value: number; [key: string]: any }>;
  color?: string;
  height?: number;
}

const BarChart: React.FC<BarChartProps> = ({ data, color = '#3b82f6', height = 300 }) => {
  const categories = data.map(item => item.name);
  const seriesData = data.map(item => item.value);

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
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
      shadowOffsetY: 4
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#6b7280',
        fontSize: 12
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#6b7280',
        fontSize: 12
      },
      splitLine: {
        lineStyle: {
          color: '#f0f0f0',
          type: 'dashed'
        }
      }
    },
    series: [{
      name: 'مقدار',
      type: 'bar',
      data: seriesData,
      itemStyle: {
        color: color,
        borderRadius: [4, 4, 0, 0]
      },
      barWidth: '60%'
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

export default BarChart;