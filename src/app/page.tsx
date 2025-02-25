//  "use client"

// import ConnectedDataSources from "@/common/components/ShowcaseTable/ConnectedDataTable";
// import Sidebar from "@/common/components/Sidebar";
// import StatSection from "@/features/dashboard/StatSection/StatSection";
// import RecentQueriesTable from "@/common/components/ShowcaseTable";

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

"use client"
import ConnectedDataSources from "@/common/components/ShowcaseTable/ConnectedDataTable";
//import Sidebar from "@/common/components/Sidebar";
import StatSection from "@/common/components/StatSection";
import RecentQueriesTable from "@/common/components/ShowcaseTable";
import DataSourceUnlockInsights from "@/common/components/DataSourceUnlockInsight";
import { Stat } from "@/constants/types";
import { Layers, Link, MessageCircle, Users } from "lucide-react";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

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

const safeJSONParse = (value: string | undefined): { id: string; name: string } | null => {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

export default function Home() {

  const localUser = Cookies.get("user");
  console.log('User:', localUser);
  const user = localUser ? safeJSONParse(localUser) : null;
  if (!user) {
        redirect("/auth/signin");
      }
  return (
    <div className="flex">
      <div className="flex flex-col p-4 gap-2 w-[1180px]">
        <DataSourceUnlockInsights/>
        <div className="mb-6"><StatSection stats={dummyStats} statTitle="Quick Stats" /></div>
        <div className="flex gap-6 relative left-[-1.5rem]">
            <RecentQueriesTable />
            <ConnectedDataSources/>
        </div>
        {/* <UsageAnalytics /> */}
      </div>
    </div>
  );
}
