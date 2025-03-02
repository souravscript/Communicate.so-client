import { fetchRecentQueries } from '@/redux/actions/queryAction';
import React, { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const RecentQueriesTable = () => {
  const dispatch = useAppDispatch();
  const { queries, loading } = useSelector((state: RootState) => state.queries);
  
  useEffect(() => {
    dispatch(fetchRecentQueries());
  }, [dispatch]);

  const minRows = 5;
  const emptyRows = Math.max(0, minRows - (queries?.length || 0));
  
  if (loading) {
    return (
      <div className="max-w-[38rem] w-[36.2rem] relative mx-auto py-4 px-2 text-center">
        Loading recent queries...
      </div>
    );
  }

  return (
    <div className="max-w-[38rem] w-[36.2rem] relative mx-auto py-4 px-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Recent Queries</h2>
        <button className="text-blue-500 hover:underline">See More</button>
      </div>
      <table className="w-full border border-[#E2E8F0] mb-8 shadow-md rounded-lg">
        <thead className="mb-4">
          <tr>
            <th className="text-left px-2 py-2 border-b opacity-55 bg-white" style={{ width: '100px' }}>Category</th>
            <th className="text-left px-2 py-2 border-b opacity-55 bg-white">Query</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((query) => (
            <tr key={query.id} className="h-[2rem] even:bg-gray-100">
              <td className="px-2 py-1 border-b whitespace-nowrap">
                {query.category?.categoryName}
              </td>
              <td className="px-2 py-1 border-b overflow-hidden whitespace-nowrap text-ellipsis">
                {query.content}
              </td>
            </tr>
          ))}
          {Array.from({ length: emptyRows }).map((_, index) => (
            <tr key={`empty-${index}`} className="even:bg-gray-100 h-[2.2rem]">
              <td className="px-2 py-1 border-b">&nbsp;</td>
              <td className="px-2 py-1 border-b">&nbsp;</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentQueriesTable;