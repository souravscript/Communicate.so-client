// import { Bell } from "lucide-react"
// import Image from "next/image"
// import styled from "styled-components"

// const Header = () => {
//     return(
//         <HeaderWrapper>
            
//             <CompanyNameContainer>
//             <Image src={"/communicateLogo.svg"} width = {24} height={24} alt="communicate" />
//             <CompanyName>Communicate.so</CompanyName>
//             </CompanyNameContainer>
           

//             <div>
//                 <Bell className="text-blue-500" size={32} />
//             </div>
            
//         </HeaderWrapper>
//     )
// }

// export default Header

// const HeaderWrapper = styled.div`
//     display:flex
//     flex-direction:row;
//     width:100%;
//     padding:16px 0;
//     background:#fff;
//     justify-content:space-between;
//     align-items:center;
// `

// const CompanyNameContainer = styled.div`
//     display:flex;
//     gap:4px;
//     align-items:center;
// `

// const CompanyName = styled.p`
//     color:#22272F;
//     font-size:1rem;
//     font-weight:600
// `

import React from 'react';
//import { Calendar } from 'lucide-react';

type StatCardProps = {
    title: string;
    value: number | string;
    icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-lg p-5 flex flex-col items-center border border-gray-300 min-w-[259px]">
        {icon}
        <p className="text-2xl font-semibold mt-6">{value}</p>
        <p className="text-base font-normal mt-1">{title}</p>
    </div>
  );
};

export default StatCard;