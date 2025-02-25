"use client";

//import SlackIntegration from "@/common/components/DataSourceAccordion";

import IntegrationSettings from "@/common/components/DataSourceAccordion";
//import Sidebar from "@/common/components/Sidebar";

// import DashboardBanner from "@/common/components/Banners/DashboardBanner";
// import SlackIntegration from "@/common/components/DataSourceAccordion";
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
//         <HeaderContainer>
//           <Title>Data Sources</Title>
//           <Subtitle>Connect all the data sources here</Subtitle>
//         </HeaderContainer>
//         <AccordionContainer>
//         <SlackIntegration sourceName="Google Drive" />
//         <SlackIntegration  sourceName="Slack"/>
//         <SlackIntegration  sourceName="Database"/>
//         <SlackIntegration  sourceName="Tally"/>
//         <SlackIntegration  sourceName="Notion"/>
        
//         </AccordionContainer>
       
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

// const AccordionContainer = styled.div`
//   width:100%;
//   display:flex;
//   flex-direction:column;
//   gap:16px;
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

// const Subtitle = styled.p`
//   font-size: 14px;
//   color: #666666;
//   margin: 4px 0 0 0;
// `;

export default function Home() {
  return (
    <>
      <div className="flex h-full w-full">
        {/* Parent container now takes full width */}
        <div className="flex flex-col p-4 gap-2 items-center w-full md:w-[50rem]">
          <div className="bg-white rounded-lg py-4 my-8 w-full">
            <h2 className="text-2xl font-bold text-gray-800 m-0">Data Sources</h2>
            <p className="text-sm text-gray-600 mt-1">Connect all the data sources here</p>
          </div>
          <IntegrationSettings/>
        </div>
      </div>
    </>
  );
}
