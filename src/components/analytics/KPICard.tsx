import React from 'react';

interface KPICardProps {
  title: string;
  value: string | number;
  change: string;
  changeText: string;
  icon: React.ComponentType<any>;
  color: 'blue' | 'green' | 'purple' | 'yellow' | 'red';
  trend: 'up' | 'down' | 'neutral';
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  changeText,
  icon: Icon,
  color,
  trend,
}) => {
  const getColorClasses = () => {
    const colorMap = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      red: 'bg-red-50 text-red-600 border-red-200',
    };
    return colorMap[color];
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-sm border border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-300 mb-1">{title}</p>
          <p className="text-2xl font-bold text-white mb-2">{value}</p>
          <div className="flex flex-col space-y-1">
            <span className={`text-sm font-medium ${getTrendColor()}`}>
              {change}
            </span>
            <span className="text-xs text-gray-400">{changeText}</span>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${getColorClasses()}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default KPICard;