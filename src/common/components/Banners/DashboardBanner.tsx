// import React from 'react';
// import styled from 'styled-components';

// const BannerContainer = styled.div`
//   background-color: #f0f4ff;
//   border-radius: 12px;
//   padding: 40px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   position: relative;
//   overflow: hidden;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     padding: 30px;
//   }
// `;

// const ContentWrapper = styled.div`
//   max-width: 50%;

//   @media (max-width: 768px) {
//     max-width: 100%;
//     text-align: center;
//     margin-bottom: 30px;
//   }
// `;

// const Title = styled.h2`
//   font-size: 32px;
//   font-weight: 700;
//   color: #4a5568;
//   margin-bottom: 16px;

//   @media (max-width: 768px) {
//     font-size: 24px;
//   }
// `;

// const AddButton = styled.button`
//   background-color: #3b82f6;
//   color: white;
//   font-weight: 600;
//   padding: 12px 24px;
//   border: none;
//   border-radius: 6px;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #2563eb;
//   }
// `;

// const IllustrationWrapper = styled.div`
//   position: absolute;
//   right: 40px;
//   top: 50%;
//   transform: translateY(-50%);
//   display: flex;
//   align-items: center;

//   @media (max-width: 768px) {
//     position: static;
//     transform: none;
//     margin-top: 20px;
//   }
// `;

// const Card = styled.div<{ $color: string; $rotate: number }>`
//   width: 120px;
//   height: 80px;
//   background-color: ${props => props.$color};
//   border-radius: 8px;
//   margin-right: -60px;
//   transform: rotate(${props => props.$rotate}deg);
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

//   @media (max-width: 768px) {
//     width: 80px;
//     height: 60px;
//     margin-right: -40px;
//   }
// `;

// const Decoration = styled.div<{ $top: string; $left: string; $color: string; $size: string }>`
//   position: absolute;
//   top: ${props => props.$top};
//   left: ${props => props.$left};
//   width: ${props => props.$size};
//   height: ${props => props.$size};
//   background-color: ${props => props.$color};
//   border-radius: 50%;

//   @media (max-width: 768px) {
//     display: none;
//   }
// `;

// const DashboardBanner: React.FC = () => {
//   return (
//     <BannerContainer>
//       <ContentWrapper>
//         <Title>Unlock insights from your company's data sources</Title>
//         <AddButton>+ Add New Data Source</AddButton>
//       </ContentWrapper>
//       <IllustrationWrapper>
//         <Card $color="#e2e8f0" $rotate={-15} />
//         <Card $color="#cbd5e0" $rotate={-5} />
//         <Card $color="#a0aec0" $rotate={5} />
//       </IllustrationWrapper>
//       <Decoration $top="10%" $left="30%" $color="#fde68a" $size="12px" />
//       <Decoration $top="80%" $left="20%" $color="#93c5fd" $size="16px" />
//       <Decoration $top="20%" $left="80%" $color="#c7d2fe" $size="20px" />
//       <Decoration $top="70%" $left="85%" $color="#6ee7b7" $size="14px" />
//     </BannerContainer>
//   );
// };

// export default DashboardBanner;


import React from 'react';
//import { ChevronDown, ChevronUp } from 'lucide-react';

const DashboardBanner: React.FC = () => {
  return (
    <div className="bg-blue-50 rounded-lg p-10 flex justify-between items-center relative left-[4rem] overflow-hidden max-w-3xl mx-auto">
      <div className="max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to the Dashboard</h2>
        <p className="text-gray-600 mb-6">Here you can manage your data sources efficiently.</p>
        <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">Add Data Source</button>
      </div>
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2 flex items-center">
        <div className="w-30 h-20 bg-blue-300 rounded-lg shadow-lg mr-[-30px] transform rotate-3"></div>
        <div className="w-30 h-20 bg-green-300 rounded-lg shadow-lg mr-[-30px] transform rotate-12"></div>
        <div className="w-30 h-20 bg-red-300 rounded-lg shadow-lg"></div>
      </div>
      <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-300 rounded-full"></div>
    </div>
  );
};

export default DashboardBanner;