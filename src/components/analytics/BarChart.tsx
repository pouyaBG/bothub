import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface BarChartProps {
  data: Array<{ name: string; value: number; [key: string]: any }>;
  color?: string;
  height?: number;
}

const BarChart: React.FC<BarChartProps> = ({ data, color = '#3b82f6', height = 300 }) => {
  const categories = data.map(item => item.name);
  const seriesData = data.map(item => item.value);

  const options: Highcharts.Options = {
    chart: {
      type: 'column',
      height: height,
      backgroundColor: 'transparent',
      spacing: [20, 20, 20, 20]
    },
    title: {
      text: undefined
    },
    xAxis: {
      categories: categories,
      gridLineWidth: 0,
      lineWidth: 0,
      tickWidth: 0,
      labels: {
        style: {
          color: '#6b7280',
          fontSize: '12px'
        }
      }
    },
    yAxis: {
      title: {
        text: undefined
      },
      gridLineColor: '#f0f0f0',
      gridLineDashStyle: 'Dash',
      lineWidth: 0,
      tickWidth: 0,
      labels: {
        style: {
          color: '#6b7280',
          fontSize: '12px'
        }
      }
    },
    tooltip: {
      backgroundColor: '#ffffff',
      borderColor: '#e5e7eb',
      borderRadius: 8,
      shadow: {
        color: 'rgba(0, 0, 0, 0.1)',
        offsetX: 0,
        offsetY: 4,
        opacity: 0.1,
        width: 6
      },
      style: {
        fontSize: '12px'
      }
    },
    plotOptions: {
      column: {
        color: color,
        borderRadius: 4,
        borderWidth: 0,
        pointPadding: 0.1,
        groupPadding: 0.2,
        dataLabels: {
          enabled: false
        }
      }
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    series: [{
      type: 'column',
      name: 'مقدار',
      data: seriesData
    }]
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BarChart;