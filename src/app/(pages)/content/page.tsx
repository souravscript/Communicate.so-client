import StatSection from "@/common/components/StatSection";
import { FileData } from "@/constants/types";
import Activities from "@/features/content/Activities";
import RecentlySyncedFiles from "@/features/content/RecentSyncedFiles";
import { FileText, Layers, Link, MessageCircle } from "lucide-react";

interface Stat {
    title: string;
    value: string | number;
    icon: JSX.Element;
}


const dummyStats: Stat[] = [
    {
        title: "Data Sources Connected",
        value: 10,
        icon: <Link className="text-blue-500" size={32} />
    },
    {
        title: "Queries Made This Week",
        value: "1.2k",
        icon: <MessageCircle className="text-blue-500" size={32} />
    },
    {
        title: "Most Accessed Category",
        value: "Sales, Business",
        icon: <Layers className="text-blue-500" size={32} />
    },
    {
        title: " Ingested Documents",
        value: 400,
        icon: <FileText className="text-blue-500" size={32} />
    },
  ];

  

  const mockFiles: FileData[] = [
    { fileName: "Financial Report 2024.docx", fileSizeKB: 120 },
    { fileName: "Bank Reports.pdf", fileSizeKB: 450 },
    { fileName: "Sales Report FY24.pdf", fileSizeKB: 300 },
    { fileName: "Earning Report FY24-25.pdf", fileSizeKB: 250 },
    { fileName: "Earning Report FY24-25.pdf", fileSizeKB: 250 },
    { fileName: "Earning Report FY24-25.pdf", fileSizeKB: 250 },
    { fileName: "Earning Report FY24-25.pdf", fileSizeKB: 250 },
  ];

  

  export default function Home() {
    return (
      <div className="flex h-full w-full relative">
        <div className="flex flex-col p-4 gap-8 w-full md:w-[50rem] max-w-5xl">
          <div className="w-full">
            <StatSection stats={dummyStats} statTitle="Content" />
          </div>
        <div className=""><Activities /></div>
        <RecentlySyncedFiles files={mockFiles} />
        </div>
      </div>
    );
  }
  