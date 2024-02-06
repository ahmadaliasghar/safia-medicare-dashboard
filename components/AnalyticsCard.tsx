import React from 'react';

interface AnalyticsCardProps {
  style?: string;
  heading: string;
  color?: string;
  bg?: string;
  value: number;
  icon?: any;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ style, heading, color, bg, value, icon }) => {
  return (
    <div className={`max-w-sm px-6 py-8 ${style} border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700`}>
      <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
        <h6 className={`mb-4 text-xl font-semibold tracking-tight ${style} dark:text-white`}>{heading}</h6>
      </a>
      <div className="flex items-center justify-between p-2 mt-1 dark:bg-gray-700 rounded-lg ">
        <div className="flex items-center gap-3">
          {icon}
          <span className={`text-3xl font-bold text-${color}`}>{value}</span>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsCard;
