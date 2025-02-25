import React from 'react';

// const Container = styled.div`
//   font-family: Arial, sans-serif;
//   max-width: 600px;
//   margin: 0 auto;
//    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   border-radius: 8px;
//   padding:16px;
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 10px;
// `;

// const Title = styled.h2`
//   margin: 0;
// `;

// const SeeMore = styled.a`
//   color: #0000FF;
//   text-decoration: none;
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
//   padding: 10px;
//   border-bottom: 1px solid #ddd;
//   background-color: #f8f9fa;
// `;

// const Td = styled.td`
//   padding: 10px;
//   border-bottom: 1px solid #ddd;
// `;

// const Tr = styled.tr`
//   &:nth-child(even) {
//     background-color: #f8f9fa;
//   }
// `;

// const recentQueries = [
//   { category: 'Sales', query: 'What is CAC of the product Platinum Debit Card?' },
//   { category: 'Sales', query: 'Can you help me explain the information about this....' },
//   { category: 'Technology', query: "What's the repository link for Alpha project?" },
//   { category: 'Business', query: 'What was the last quarter performance in terms of...' },
//   { category: 'Sales', query: 'Draft a sales pitch for the Alpha product in 300 words' },
// ];

// const RecentQueriesTable = () => {
//   return (
//     <Container>
//       <Header>
//         <Title>Recent Queries</Title>
//         <SeeMore href="#">See More</SeeMore>
//       </Header>
//       <Table>
//         <thead>
//           <tr>
//             <Th>Category</Th>
//             <Th>Query</Th>
//           </tr>
//         </thead>
//         <tbody>
//           {recentQueries.map((item, index) => (
//             <Tr key={index}>
//               <Td>{item.category}</Td>
//               <Td>{item.query}</Td>
//             </Tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default RecentQueriesTable;

const recentQueries = [
  { category: 'Sales', query: 'What is CAC of the product Platinum Debit Card?' },
  { category: 'Sales', query: 'Can you help me explain the information about this....' },
  { category: 'Technology', query: "What's the repository link for Alpha project?" },
  { category: 'Business', query: 'What was the last quarter performance in terms of...' },
  { category: 'Sales', query: 'Draft a sales pitch for the Alpha product in 300 words' },
];

const RecentQueriesTable = () => {
  return (
    <div className="max-w-[40rem] w-[36rem] mx-auto py-4 px-2 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Recent Queries</h2>
        <a href="#" className="text-blue-500 hover:underline">See More</a>
      </div>
      <table className="w-full border border-[#E2E8F0] rounded-2xl">
        <thead>
          <tr>
            <th className="text-left py-2 px-6 border-b bg-white opacity-55 font-sans">Category</th>
            <th className="text-left py-2 px-6 border-b bg-white opacity-55 font-sans">Query</th>
          </tr>
        </thead>
        <tbody>
          {recentQueries.map((item, index) => (
            <tr key={index} className="even:bg-gray-100">
              <td className="py-2 px-6 border-b ">{item.category}</td>
              <td className="py-2 px-6 border-b overflow-hidden whitespace-nowrap text-ellipsis max-w-[720px]">{item.query}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentQueriesTable;