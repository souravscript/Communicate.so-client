import { fetchRecentQueries } from '@/redux/actions/queryAction';
import React, { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';

const recentQueries = [
  { category: 'Sales', query: 'What is CAC of the product Platinum Debit Card?' },
  { category: 'Sales', query: 'Can you help me explain the information about this....' },
  { category: 'Technology', query: "What's the repository link for Alpha project?" },
  { category: 'Business', query: 'What was the last quarter performance in terms of...' },
  { category: 'Sales', query: 'Draft a sales pitch for the Alpha product in 300 words' },
];

const RecentQueriesTable = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchRecentQueries());
  }, [dispatch]);
  
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