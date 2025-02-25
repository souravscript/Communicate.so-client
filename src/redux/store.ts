import { configureStore } from '@reduxjs/toolkit';
import dataSourcesReducer from './slices/dataSourcesSlice';
import categoryReducer from './slices/categorySlice';

export const store = configureStore({
  reducer: {
    dataSources: dataSourcesReducer,
    categories: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
