import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  iconColor: string;
  iconBgColor: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  iconColor,
  iconBgColor,
}) => {
  return (
    <div className="bg-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 space-x-reverse">
          <div className={`w-8 h-8 ${iconBgColor} rounded-lg flex items-center justify-center`}>
            <Icon size={16} className={iconColor} />
          </div>
          <span className="text-sm font-medium text-gray-300">{title}</span>
        </div>
        <span className="text-lg font-bold text-white">{value}</span>
      </div>
    </div>
  );
};

export default MetricCard;