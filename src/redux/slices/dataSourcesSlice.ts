import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DataSource {
  id: string;
  name: string;
  type: string;
  status: string;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

interface DataSourcesState {
  dataSources: DataSource[];
  loading: boolean;
  error: string | null;
}

const initialState: DataSourcesState = {
  dataSources: [],
  loading: false,
  error: null,
};

const dataSourcesSlice = createSlice({
  name: 'dataSources',
  initialState,
  reducers: {
    setDataSourcesLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setDataSourcesError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setDataSources: (state, action: PayloadAction<DataSource[]>) => {
      state.dataSources = action.payload;
    },
    updateDataSource: (state, action: PayloadAction<DataSource>) => {
      const index = state.dataSources.findIndex(ds => ds.id === action.payload.id);
      if (index !== -1) {
        state.dataSources[index] = action.payload;
      }
    },
  },
});

export const { 
  setDataSourcesLoading, 
  setDataSourcesError, 
  setDataSources,
  updateDataSource
} = dataSourcesSlice.actions;

export default dataSourcesSlice.reducer;
