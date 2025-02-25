import { Dispatch } from "@reduxjs/toolkit";
import { setCategoryLoading, setCategoryError, addCategory } from "../slices/categorySlice";

export interface Category {
  id?: string;
  categoryName: string;
}

export const createCategory = (categoryName: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(setCategoryLoading(true));
    dispatch(setCategoryError(null));

    const response = await fetch(`/api/category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ categoryName }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create category');
    }

    const newCategory = await response.json();
    dispatch(addCategory(newCategory));
    dispatch(setCategoryLoading(false));
    return newCategory;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create category';
    dispatch(setCategoryError(errorMessage));
    dispatch(setCategoryLoading(false));
    throw error;
  }
};