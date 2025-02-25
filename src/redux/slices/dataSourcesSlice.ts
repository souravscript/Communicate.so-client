import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataSourceState {
  enabledSources: {
    [key: string]: boolean;
  };
}

const initialState: DataSourceState = {
  enabledSources: {
    'google-drive': false,
    'slack': false,
    'tally': false,
    'salesforce': false,
    'pdf': false,
    'links': false,
    'database': false
  }
};

const dataSourcesSlice = createSlice({
  name: 'dataSources',
  initialState,
  reducers: {
    toggleDataSource: (state, action: PayloadAction<string>) => {
      const sourceId = action.payload;
      state.enabledSources[sourceId] = !state.enabledSources[sourceId];
    },
  },
});

export const { toggleDataSource } = dataSourcesSlice.actions;
export default dataSourcesSlice.reducer;
