import StatCard from "@/common/components/StatCard";
import { Stat } from "@/constants/types";
//import { Link, MessageCircle, Layers, Users } from "lucide-react";

// interface Stat {
//     title: string;
//     value: string | number;
//     icon: JSX.Element;
// }

// const dummyStats: Stat[] = [
//     {
//         title: "Average Weekly Users",
//         value: 90,
//         icon: <Link className="text-blue-500" size={32} />
//     },
//     {
//         title: "Total Members",
//         value: 9000,
//         icon: <MessageCircle className="text-blue-500" size={32} />
//     },
//     {
//         title: "Average time spent",
//         value: "15 minutes",
//         icon: <Layers className="text-blue-500" size={32} />
//     },
//     {
//         title: "Active Monthly Users",
//         value: 400,
//         icon: <Users className="text-blue-500" size={32} />
//     },
// ];


interface StatSectionProps {
    stats: Stat[];
    statTitle: string;
  }
  
  const StatSection: React.FC<StatSectionProps> = ({ stats = [], statTitle }) => {
    return (
      <div className="flex flex-col items-start gap-4 mt-2 w-[1080px]">
        <h1 className="text-2xl font-bold">{statTitle}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {stats.map((stat, index) => (
            <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} />
          ))}
        </div>
      </div>
    );
  };
  
  export default StatSection;
  