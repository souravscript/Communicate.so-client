import { Dispatch } from "@reduxjs/toolkit";
import { 
  setDataSourcesLoading, 
  setDataSourcesError, 
  setDataSources,
} from "../slices/dataSourcesSlice";
// import { ThunkDispatch } from "redux-thunk";
// import { RootState } from "../store";

// type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

export const fetchDataSources = async (dispatch: Dispatch) => {
  try {
    dispatch(setDataSourcesLoading(true));
    dispatch(setDataSourcesError(null));

    const response = await fetch('/api/data-sources', {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetched data sources:', data);

    // Ensure we're setting an array
    const dataSources = Array.isArray(data) ? data : data.dataSources || [];
    dispatch(setDataSources(dataSources));
    dispatch(setDataSourcesLoading(false));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch data sources';
    console.error('Error fetching data sources:', error);
    dispatch(setDataSourcesError(errorMessage));
    dispatch(setDataSourcesLoading(false));
  }
};

export const enableDataSource = async (id: string, dispatch: Dispatch) => {
  try {
    dispatch(setDataSourcesLoading(true));
    dispatch(setDataSourcesError(null));

    console.log('Enabling data source with ID:', id);

    const response = await fetch(`/api/data-sources?id=${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Error response:', error);
      throw new Error(error.message || `Failed to update data source: ${response.status}`);
    }

    const updatedDataSource = await response.json();
    console.log('Updated data source:', updatedDataSource);

    // Refresh the entire list to ensure we have the latest state
    await fetchDataSources(dispatch);
    dispatch(setDataSourcesLoading(false));
    return updatedDataSource;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update data source';
    console.error('Error updating data source:', error);
    dispatch(setDataSourcesError(errorMessage));
    dispatch(setDataSourcesLoading(false));
    throw error;
  }
};
