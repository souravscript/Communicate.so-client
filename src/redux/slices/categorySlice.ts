import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../actions/categoryAction';

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategoryLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCategoryError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { 
  setCategoryLoading, 
  setCategoryError, 
  addCategory,
  setCategories 
} = categorySlice.actions;

export default categorySlice.reducer;