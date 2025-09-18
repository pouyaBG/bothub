import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

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
    type: 'line' as const,
    name: line.name,
    data: data.map((item) => item[line.dataKey]),
    color: line.stroke,
    marker: {
      radius: 4,
      lineWidth: 2,
      lineColor: line.stroke,
      fillColor: "#ffffff",
    },
  }));

  const options: Highcharts.Options = {
    chart: {
      type: "line",
      height: height,
      backgroundColor: "transparent",
      spacing: [20, 20, 20, 20],
    },
    title: {
      text: undefined,
    },
    xAxis: {
      categories: categories,
      gridLineWidth: 0,
      lineWidth: 0,
      tickWidth: 0,
      labels: {
        style: {
          color: "#6b7280",
          fontSize: "12px",
        },
      },
    },
    yAxis: {
      title: {
        text: undefined,
      },
      gridLineColor: "#f0f0f0",
      gridLineDashStyle: "Dash",
      lineWidth: 0,
      tickWidth: 0,
      labels: {
        style: {
          color: "#6b7280",
          fontSize: "12px",
        },
      },
    },
    tooltip: {
      backgroundColor: "#ffffff",
      borderColor: "#e5e7eb",
      borderRadius: 8,
      shadow: {
        color: "rgba(0, 0, 0, 0.1)",
        offsetX: 0,
        offsetY: 4,
        opacity: 0.1,
        width: 6,
      },
      style: {
        fontSize: "12px",
      },
    },
    plotOptions: {
      line: {
        lineWidth: 3,
        dataLabels: {
          enabled: false,
        },
        states: {
          hover: {
            lineWidth: 4,
          },
        },
        marker: {
          states: {
            hover: {
              radius: 6,
            },
          },
        },
      },
    },
    legend: {
      align: "center",
      verticalAlign: "bottom",
      itemStyle: {
        color: "#6b7280",
        fontSize: "12px",
      },
    },
    credits: {
      enabled: false,
    },
    series: series,
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineChart;
