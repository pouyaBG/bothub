import React from "react";
import ReactECharts from 'echarts-for-react';

interface LineChartProps {
  data: Array<{ name: string; [key: string]: any }>;
  lines: Array<{
    dataKey: string;
    stroke: string;
    name: string;
  }>;
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({ data, lines, height = 300 }) => {
  const categories = data.map((item) => item.name);

  const series = lines.map((line) => ({
    name: line.name,
    type: 'line',
    data: data.map((item) => item[line.dataKey]),
    lineStyle: {
      color: line.stroke,
      width: 3
    },
    itemStyle: {
      color: line.stroke
    },
    symbol: 'circle',
    symbolSize: 8,
    emphasis: {
      focus: 'series'
    },
    smooth: true
  }));

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
    legend: {
      bottom: 0,
      left: 'center',
      textStyle: {
        color: '#6b7280',
        fontSize: 12
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
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
    series: series
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: `${height}px`, width: '100%' }}
      opts={{ renderer: 'canvas' }}
    />
  );
};

export default LineChart;
