import React from 'react';
//import { Calendar } from 'lucide-react';

type StatCardProps = {
    title: string;
    value: number | string;
    icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white w-[3rem] rounded-lg p-5 flex flex-col items-center border border-gray-300 min-w-[259px]">
            {icon}
        <p className="text-xl font-semibold mt-6">{value}</p>
        <p className="text-base font-normal mt-1">{title}</p>
    </div>
  );
};

export default StatCard;