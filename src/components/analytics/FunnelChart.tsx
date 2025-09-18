import React from 'react';

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
  const maxValue = Math.max(...stages.map(stage => stage.value));

  return (
    <div className="space-y-4" style={{ height }}>
      {stages.map((stage, index) => {
        const width = (stage.value / maxValue) * 100;

        return (
          <div key={index} className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">{stage.label}</span>
              <div className="text-left">
                <span className="text-sm font-bold text-white">{stage.value.toLocaleString()}</span>
                <span className="text-xs text-gray-300 mr-2">({stage.percentage}%)</span>
              </div>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-8 relative overflow-hidden">
              <div
                className="h-8 rounded-full transition-all duration-300"
                style={{
                  width: `${width}%`,
                  backgroundColor: stage.color,
                }}
              >
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FunnelChart;