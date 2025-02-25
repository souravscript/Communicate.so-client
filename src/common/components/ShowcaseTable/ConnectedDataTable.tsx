// import React from 'react';
// import styled from 'styled-components';

// interface DataSource {
//   name: string;
//   icon: string;
//   addedOn: string;
//   lastSync: string;
// }

// const dataSources: DataSource[] = [
//   { name: 'Slack', icon: '📊', addedOn: '11 Apr 2024', lastSync: '13 Apr 2024' },
//   { name: 'Salesforce', icon: '☁️', addedOn: '10 Apr 2024', lastSync: '10 Apr 2024' },
// ];

// const Container = styled.div`
//   max-width: 600px;
//   width:100%;
//   margin: 0 auto;
//   background-color: white;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   border-radius: 8px;
//   overflow: hidden;
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 16px;
//   background-color: #f9fafb;
//   border-bottom: 1px solid #e5e7eb;
// `;

// const Title = styled.h2`
//   font-size: 18px;
//   font-weight: 600;
//   margin: 0;
// `;

// const AddButton = styled.button`
//   color: #2563eb;
//   background: none;
//   border: none;
//   cursor: pointer;
//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
// `;

// const Th = styled.th`
//   text-align: left;
//   padding: 12px 16px;
//   background-color: #f3f4f6;
//   font-weight: 600;
// `;

// const Td = styled.td`
//   padding: 12px 16px;
//   border-bottom: 1px solid #e5e7eb;
// `;

// const IconWrapper = styled.span`
//   margin-right: 8px;
//   font-size: 20px;
// `;

// interface DataSourceRowProps extends DataSource {}

// const DataSourceRow: React.FC<DataSourceRowProps> = ({ name, icon, addedOn, lastSync }) => (
//   <tr>
//     <Td>
//       <IconWrapper>{icon}</IconWrapper>
//       {name}
//     </Td>
//     <Td>{addedOn}</Td>
//     <Td>{lastSync}</Td>
//   </tr>
// );

// const ConnectedDataSources: React.FC = () => {
//   return (
//     <Container>
//       <Header>
//         <Title>Recently Connected Data Sources</Title>
//         <AddButton>Add New</AddButton>
//       </Header>
//       <Table>
//         <thead>
//           <tr>
//             <Th>Source</Th>
//             <Th>Added On</Th>
//             <Th>Last Sync</Th>
//           </tr>
//         </thead>
//         <tbody>
//           {dataSources.map((source, index) => (
//             <DataSourceRow key={index} {...source} />
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default ConnectedDataSources;


'use client';
import React from 'react';

interface DataSource {
  name: string;
  icon: string;
  addedOn: string;
  lastSync: string;
}

const dataSources: DataSource[] = [
  { name: 'Slack', icon: '📊', addedOn: '11 Apr 2024', lastSync: '13 Apr 2024' },
  { name: 'Salesforce', icon: '', addedOn: '10 Apr 2024', lastSync: '10 Apr 2024' },
];

const rowCount = 5;
const emptyRows = rowCount - dataSources.length > 0 ? rowCount - dataSources.length : 0;

const ConnectedDataSources: React.FC = () => {
  return (
    <div className="max-w-[32rem] w-[30rem] relative left-[-1rem] mx-auto py-4 px-2 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Recently Connected Data Sources</h2>
        <button className="text-blue-500 hover:underline">Add New</button>
      </div>
      <table className="w-full table-fixed border border-[#E2E8F0] mb-8 shadow-md rounded-lg">
        <thead className='mb-4'>
          <tr>
            <th className="text-left px-4 py-2 border-b opacity-55 bg-white w-1/3">Source</th>
            <th className="text-left px-4 py-2 border-b opacity-55 bg-white w-1/3">Added On</th>
            <th className="text-left px-4 py-2 border-b opacity-55 bg-white w-1/3">Last Sync</th>
          </tr>
        </thead>
        <tbody>
          {dataSources.map((item, index) => (
            <tr key={index} className="h-[2rem] even:bg-gray-100">
              <td className="p-2 border-b">
                <span className="mr-2">{item.icon}</span> {item.name}
              </td>
              <td className="p-2 border-b">{item.addedOn}</td>
              <td className="p-2 border-b">{item.lastSync}</td>
            </tr>
          ))}
          {Array.from({ length: emptyRows }).map((_, index) => (
            <tr key={`empty-${index}`} className="even:bg-gray-100 h-[2.2rem]">
              <td className="p-2 border-b">&nbsp;</td>
              <td className="p-2 border-b">&nbsp;</td>
              <td className="p-2 border-b">&nbsp;</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConnectedDataSources;
