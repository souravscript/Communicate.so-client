import { configureStore } from '@reduxjs/toolkit';
import dataSourcesReducer from './slices/dataSourcesSlice';
import categoryReducer from './slices/categorySlice';
import memberReducer from './slices/memberSlice';
import queryReducer from './slices/querySlice';

export const store = configureStore({
  reducer: {
    dataSources: dataSourcesReducer,
    categories: categoryReducer,
    members: memberReducer,
    queries: queryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
