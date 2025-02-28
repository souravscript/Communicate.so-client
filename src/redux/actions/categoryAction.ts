import { Dispatch } from "@reduxjs/toolkit";
import { 
  setCategoryLoading, 
  setCategoryError, 
  addCategory,
  setCategories
} from "../slices/categorySlice";

export interface Category {
  id?: string;
  categoryName: string;
}

export const createCategory = async (categoryName: string, dispatch: Dispatch) => {
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

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create category');
    }

    console.log('Created category:', data);
    dispatch(addCategory(data));
    dispatch(setCategoryLoading(false));
    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create category';
    console.error('Error creating category:', error);
    dispatch(setCategoryError(errorMessage));
    dispatch(setCategoryLoading(false));
    throw error;
  }
};

export const fetchCategories = async (dispatch: Dispatch) => {
  try {
    dispatch(setCategoryLoading(true));
    dispatch(setCategoryError(null));

    const response = await fetch(`/api/category`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch categories');
    }

    console.log('Fetched categories:', data);
    dispatch(setCategories(data));
    dispatch(setCategoryLoading(false));
    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch categories';
    console.error('Error fetching categories:', error);
    dispatch(setCategoryError(errorMessage));
    dispatch(setCategoryLoading(false));
    throw error;
  }
};