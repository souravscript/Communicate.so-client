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
    { 
      id: "1",
      name: "Financial Report 2024.docx",
      type: "docx",
      size: "120 KB",
      lastSync: new Date().toISOString(),
      dataSource: "Local Drive",
      status: "synced"
    },
    { 
      id: "2",
      name: "Bank Reports.pdf",
      type: "pdf",
      size: "450 KB",
      lastSync: new Date().toISOString(),
      dataSource: "Google Drive",
      status: "synced"
    },
    { 
      id: "3",
      name: "Sales Report FY24.pdf",
      type: "pdf",
      size: "300 KB",
      lastSync: new Date().toISOString(),
      dataSource: "Dropbox",
      status: "syncing"
    },
    { 
      id: "4",
      name: "Earning Report FY24-25.pdf",
      type: "pdf",
      size: "250 KB",
      lastSync: new Date().toISOString(),
      dataSource: "OneDrive",
      status: "synced"
    },
    { 
      id: "5",
      name: "Market Analysis Q1 2024.pdf",
      type: "pdf",
      size: "250 KB",
      lastSync: new Date().toISOString(),
      dataSource: "SharePoint",
      status: "failed"
    },
    { 
      id: "6",
      name: "Budget Forecast 2024.xlsx",
      type: "xlsx",
      size: "250 KB",
      lastSync: new Date().toISOString(),
      dataSource: "Local Drive",
      status: "synced"
    },
    { 
      id: "7",
      name: "Project Timeline.pptx",
      type: "pptx",
      size: "250 KB",
      lastSync: new Date().toISOString(),
      dataSource: "Google Drive",
      status: "synced"
    }
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