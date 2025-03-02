import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Category {
  id: string;
  categoryName: string;
}

export interface Query {
  id: string;
  content: string;
  response: string;
  platform: string | null;
  metadata: string;
  createdBy: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

interface QueryState {
  queries: Query[];
  loading: boolean;
  error: string | null;
}

const initialState: QueryState = {
  queries: [],
  loading: false,
  error: null,
};

const querySlice = createSlice({
  name: 'queries',
  initialState,
  reducers: {
    setQueryLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setQueryError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setQueries: (state, action: PayloadAction<Query[]>) => {
      state.queries = action.payload;
    },
  },
});

export const {
  setQueryLoading,
  setQueryError,
  setQueries,
} = querySlice.actions;

export default querySlice.reducer;
