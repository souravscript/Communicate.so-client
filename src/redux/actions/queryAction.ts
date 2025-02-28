import { Dispatch } from "@reduxjs/toolkit";
import { 
  setQueryLoading, 
  setQueryError, 
  setQueries 
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
      throw new Error(error.message || 'Failed to fetch recent queries');
    }

    const queries = await response.json();
    dispatch(setQueries(queries));
    dispatch(setQueryLoading(false));
    return queries;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch recent queries';
    dispatch(setQueryError(errorMessage));
    dispatch(setQueryLoading(false));
    throw error;
  }
};
