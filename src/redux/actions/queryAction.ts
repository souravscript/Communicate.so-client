import { Dispatch } from "@reduxjs/toolkit";
import { 
  setQueryLoading, 
  setQueryError, 
  setQueries,
  Query 
} from "../slices/querySlice";

export const fetchRecentQueries = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setQueryLoading(true));
    dispatch(setQueryError(null));

    const response = await fetch('/api/queries/recent', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      console.log('Error fetching recent queries:', error);
      throw new Error(error.message || 'Failed to fetch recent queries');
    }

    const data = await response.json();
    console.log('Fetched recent queries in query action:', data);
    const queries: Query[] = data.queries || [];
    console.log('Fetched recent queries in query action with query Interface:', queries);
    dispatch(setQueries(queries));
    return queries;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch recent queries';
    console.error('Error fetching recent queries:', errorMessage);
    dispatch(setQueryError(errorMessage));
    return [];
  } finally {
    dispatch(setQueryLoading(false));
  }
};
