 "use client";

//import DataSourceTable from "@/common/components/DataSourceTable";
import StatSection from "@/common/components/StatSection";
import {  Category, Member, Stat } from "@/constants/types";
import MemberList from "@/features/Members/MembersList";
import { Layers, Link, MessageCircle, Users } from "lucide-react";
//import { useState } from "react";

// const columns = [
//   { key: 'source', label: 'Name', sortable: true },
//   { key: 'addedOn', label: 'Category', sortable: true },
//   { key: 'lastSync', label: 'Last Sync', sortable: true },
// ];

// import DashboardBanner from "@/common/components/Banners/DashboardBanner";
// import DataSourceTable from "@/common/components/DataSourceTable.tsx";
// import Sidebar from "@/common/components/Sidebar";
// import StatSection from "@/features/dashboard/StatSection/StatSection";
// import { useState } from "react";
// import styled from "styled-components";

// const tableData = [
//     { source: 'Slack', addedOn: '11 Apr 2024', lastSync: '13 Apr 2024' },
//     { source: 'Salesforce', addedOn: '10 Apr 2024', lastSync: '10 Apr 2024' },
//   ];
  
//   const columns = [
//     { key: 'source', label: 'Name', sortable: true },
//     { key: 'addedOn', label: 'Category', sortable: true },
//     { key: 'lastSync', label: 'Last Sync', sortable: true },
//   ];

// export default function Home() {
//     const [tableData, setTableData] = useState([
//       { source: 'John Doe', addedOn: '09 Apr 2024', lastSync: '12 Apr 2024' },
//       { source: 'Jane Smith', addedOn: '08 Apr 2024', lastSync: '11 Apr 2024' },
//       { source: 'Alice Johnson', addedOn: '07 Apr 2024', lastSync: '10 Apr 2024' },
//       { source: 'Bob Brown', addedOn: '06 Apr 2024', lastSync: '09 Apr 2024' },
//       { source: 'Charlie Davis', addedOn: '05 Apr 2024', lastSync: '08 Apr 2024' },
//       { source: 'Diana Evans', addedOn: '04 Apr 2024', lastSync: '07 Apr 2024' },
//       { source: 'Edward Foster', addedOn: '03 Apr 2024', lastSync: '06 Apr 2024' },
//       { source: 'Fiona Green', addedOn: '02 Apr 2024', lastSync: '05 Apr 2024' },
//       { source: 'George Harris', addedOn: '01 Apr 2024', lastSync: '04 Apr 2024' },
//       { source: 'Helen King', addedOn: '31 Mar 2024', lastSync: '03 Apr 2024' },
//       ]);

//       const handleAddRow = (newRow: any) => {
//         setTableData(prevData => [...prevData, newRow]);
//       };


// const handleDeleteRow = (index: number) => {
//   setTableData(prevData => prevData.filter((_, i) => i !== index));
// };

//   return (
//     <>
//     <Wrapper>
//       <Left>
//         <Sidebar/>
//       </Left>
//       <RightContainer>
//           {/* <Header/> */}
//           {/* <DashboardBanner/> */}
//           <HeaderContainer>
//             <Title>Members</Title>
//           </HeaderContainer>
//           <StatSection />
//           <DataSourceTable
//             data={tableData}
//             columns={columns}
//             itemsPerPage={5}
//             tableWidth="100%"
//             headerBackground="#f3f4f6"
//             headerTextColor="#374151"
//             rowBackground="white"
//             rowTextColor="#1f2937"
//             borderColor="#e5e7eb"
//             onAddRow={handleAddRow}
//             onDeleteRow={handleDeleteRow}
//             // onEditRow={}
//           />
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

// const HeaderContainer = styled.div`
//   background-color: #ffffff;
//   border-radius: 8px;
//   padding: 16px 0;
//   font-family: Arial, sans-serif;
//   margin:2rem 0;
// `;

// const Title = styled.h2`
//   font-size: 2rem;
//   font-weight: bold;
//   color: #333333;
//   margin: 0;
// `;

// eslint-disable-next-line @typescript-eslint/no-unused-vars


const dummyStats: Stat[] = [
  {
      title: "Average Weekly Users",
      value: 90,
      icon: <Link className="text-blue-500" size={32} />
  },
  {
      title: "Total Members",
      value: 9000,
      icon: <MessageCircle className="text-blue-500" size={32} />
  },
  {
      title: "Average time spent",
      value: "15 minutes",
      icon: <Layers className="text-blue-500" size={32} />
  },
  {
      title: "Active Monthly Users",
      value: 400,
      icon: <Users className="text-blue-500" size={32} />
  },
];
// const tableData = [
//     { source: 'Slack', addedOn: '11 Apr 2024', lastSync: '13 Apr 2024' },
//     { source: 'Salesforce', addedOn: '10 Apr 2024', lastSync: '10 Apr 2024' },
//   ];
  
//   const columns = [
//     { key: 'source', label: 'Name', sortable: true },
//     { key: 'addedOn', label: 'Category', sortable: true },
//     { key: 'lastSync', label: 'Last Sync', sortable: true },
//   ];
export default function Home() {
  const mockMembers: Member[] = [
    { id: "1", name: "Troy Chen", category: "Sales", joinedOn: "20th July 2024", lastLogin: "27th Sep 2024" },
    { id: "2", name: "Emmalynn Irwin", category: "Sales", joinedOn: "20th July 2024", lastLogin: "27th Sep 2024" },
    { id: "3", name: "Emmalyn Camacho", category: "Business", joinedOn: "19th July 2024", lastLogin: "27th Sep 2024" },
    { id: "4", name: "Francisco Riggs", category: "Technology", joinedOn: "19th July 2024", lastLogin: "27th Sep 2024" },
    { id: "5", name: "Trenton Pickett", category: "Business", joinedOn: "19th July 2024", lastLogin: "27th Sep 2024" },
    { id: "6", name: "Emmalyn Pena", category: "Business", joinedOn: "19th July 2024", lastLogin: "27th Sep 2024" },
    { id: "7", name: "Beckett Cline", category: "Technology", joinedOn: "19th July 2024", lastLogin: "27th Sep 2024" },
    { id: "8", name: "Rayne Hunt", category: "Business", joinedOn: "19th July 2024", lastLogin: "27th Sep 2024" },
    { id: "9", name: "Cael Roth", category: "Sales", joinedOn: "19th July 2024", lastLogin: "27th Sep 2024" },
  ];
  
  const mockCategories: Category[] = [
    { name: "Business" },
    { name: "Sales" },
    { name: "Technology" },
  ];
  
  return (
    <>
    <div className="flex h-full w-full">
      <div className="flex flex-col p-4 gap-2 items-center w-full basis-2/3 max-w-5xl">
        <div className="relative left-10"><StatSection stats={dummyStats} statTitle="Members" /></div>
        <MemberList members={mockMembers} categories={mockCategories}/>
        {/* <UsageAnalytics queryData={mockQueryData} /> */}
        
      </div>
    </div>
    </>
  );
}