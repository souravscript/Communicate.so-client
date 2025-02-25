"use client";

//import DashboardBanner from "@/common/components/Banners/DashboardBanner";
import DataSourceUnlockInsights from "../../../common/components/DataSourceUnlockInsight";
import RecentQueriesTable from "@/common/components/ShowcaseTable";
import ConnectedDataSources from "@/common/components/ShowcaseTable/ConnectedDataTable";
import StatSection from "@/common/components/StatSection";
import { Stat } from "@/constants/types";
//import { QueryData, Stat } from "@/constants/types";
// import UsageAnalytics from "@/features/dashboard/UsageAnalytics";
import { Layers, Link, MessageCircle, Users } from "lucide-react";

// import DashboardBanner from "@/common/components/Banners/DashboardBanner";
// import RecentQueriesTable from "@/common/components/ShowcaseTable";
// import ConnectedDataSources from "@/common/components/ShowcaseTable/ConnectedDataTable";
// import Sidebar from "@/common/components/Sidebar";
// import StatSection from "@/features/dashboard/StatSection/StatSection";
// import styled from "styled-components";

// export default function Home() {
//   return (
//     <>
//     <Wrapper>
//       <Left>
//         <Sidebar/>
//       </Left>
//       <RightContainer>
//           {/* <Header/> */}
//           <DashboardBanner/>
//           <Spacer/>
//           <StatSection />
//           <Spacer/>
//           <QueriesContainer>
//             <TableContainer>
//             <RecentQueriesTable/>
//             </TableContainer>
           
//            <TableContainer>
//            <ConnectedDataSources/>
//            </TableContainer>
            
//           </QueriesContainer>
//         </RightContainer>
//     </Wrapper>
//     </>
//   );
// }

// const Wrapper = styled.div`
//   display:flex;
//   height:100%;
//   width:100%;
// `

// const Left = styled.div`
//   display:flex;
//   flex-basis:30%;
// `

// const RightContainer = styled.div`
//   display:flex;
//   flex-direction:column;
//   padding:16px 32px;
//   gap:8px;
//   align-items:center
//   width:100%;
//   flex-basis:70%;
//   max-width: 1200px;
// `

// const QueriesContainer = styled.div`
// display:flex;
// gap:16px;
// `

// const TableContainer = styled.div`
//   display:flex;
//   flex-basis:50%;
// `

// const Spacer = styled.div`
//   margin-top:32px
// `


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
      title: " Total Members",
      value: 400,
      icon: <Users className="text-blue-500" size={32} />
  },
];

// const mockQueryData: QueryData[] = [
//   { date: "2024-01-01", sales: 10, technology: 5, business: 8, total: 23 },
//   { date: "2024-01-02", sales: 15, technology: 7, business: 10, total: 32 },
//   { date: "2024-01-03", sales: 20, technology: 10, business: 12, total: 42 },
//   { date: "2024-01-04", sales: 18, technology: 8, business: 15, total: 41 },
//   { date: "2024-01-05", sales: 25, technology: 12, business: 18, total: 55 },
//   { date: "2024-01-06", sales: 22, technology: 9, business: 20, total: 51 },
//   { date: "2024-01-07", sales: 30, technology: 15, business: 25, total: 70 },
// ];

export default function Home() {
  return (
    <div className="flex">
      <div className="flex flex-col p-4 gap-2 w-[1180px]">
        <DataSourceUnlockInsights/>
        <div className="mb-6"><StatSection stats={dummyStats} statTitle="Quick Stats" /></div>
        <div className="flex gap-0 relative left-[-1rem]">
            <RecentQueriesTable />
            <ConnectedDataSources/>
        </div>
        {/* <UsageAnalytics /> */}
      </div>
    </div>
  );
}



// export default function Home() {

//   return (
//     <>
//     <div className="flex h-full w-full">

//       <div className="flex flex-col p-4 gap-2 items-center w-full ">
//           <DataSourceUnlockInsights/>
//           <div className="mt-8"></div>
//           <StatSection stats={dummyStats} statTitle="Quick Stats" />
//           <div className="mt-8"></div>
//           <div className="flex gap-4">
//             <div className="flex basis-1/2">
//               <RecentQueriesTable />
//             </div>
//             <div className="flex basis-1/2">
//               <ConnectedDataSources/>
//             </div>
//             <UsageAnalytics queryData={mockQueryData}/>
//           </div>
//         </div>
//     </div>
//     </>
//   );
// }