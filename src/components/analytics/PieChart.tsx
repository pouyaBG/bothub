import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface PieChartProps {
  data: Array<{ name: string; value: number; color: string }>;
  height?: number;
}

const PieChart: React.FC<PieChartProps> = ({ data, height = 300 }) => {
  const seriesData = data.map(item => ({
    name: item.name,
    y: item.value,
    color: item.color
  }));

  const options: Highcharts.Options = {
    chart: {
      type: 'pie',
      height: height,
      backgroundColor: 'transparent',
      spacing: [20, 20, 20, 20]
    },
    title: {
      text: undefined
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
      },
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      itemStyle: {
        color: '#6b7280',
        fontSize: '12px'
      }
    },
    credits: {
      enabled: false
    },
    series: [{
      type: 'pie',
      name: 'درصد',
      data: seriesData
    }]
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PieChart;