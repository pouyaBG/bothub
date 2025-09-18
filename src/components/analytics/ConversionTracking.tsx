import React from 'react';

interface ConversionGoal {
  name: string;
  current: number;
  target: number;
  percentage: number;
  color: string;
}

interface ConversionTrackingProps {
  goals: ConversionGoal[];
}

const ConversionTracking: React.FC<ConversionTrackingProps> = ({ goals }) => {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-sm border border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">ردیابی اهداف</h3>

      <div className="space-y-6">
        {goals.map((goal, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">{goal.name}</span>
              <span className="text-sm text-gray-400">
                {goal.current.toLocaleString()} / {goal.target.toLocaleString()}
              </span>
            </div>

            <div className="w-full bg-gray-600 rounded-full h-3 overflow-hidden">
              <div
                className="h-3 rounded-full transition-all duration-300 flex items-center justify-end pr-2"
                style={{
                  width: `${Math.min(goal.percentage, 100)}%`,
                  backgroundColor: goal.color,
                }}
              >
                {goal.percentage > 15 && (
                  <span className="text-white text-xs font-medium">
                    {goal.percentage.toFixed(1)}%
                  </span>
                )}
              </div>
            </div>

            {goal.percentage < 15 && (
              <div className="text-left mt-1">
                <span className="text-xs text-gray-400">
                  {goal.percentage.toFixed(1)}%
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversionTracking;