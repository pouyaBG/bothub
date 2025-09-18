import React from 'react';

interface Command {
  name: string;
  count: number;
  percentage: number;
}

interface PopularCommandsProps {
  commands: Command[];
}

const PopularCommands: React.FC<PopularCommandsProps> = ({ commands }) => {
  const maxCount = Math.max(...commands.map(cmd => cmd.count));

  return (
    <div className="space-y-3">
      {commands.map((command, index) => {
        const width = (command.count / maxCount) * 100;

        return (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-white">{command.name}</span>
                <span className="text-sm text-gray-300">{command.count.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PopularCommands;