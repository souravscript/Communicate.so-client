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

export const createCategory = async (dispatch: Dispatch, categoryName: string) => {
  try {
    dispatch(setCategoryLoading(true));
    dispatch(setCategoryError(null));

    // Validate input
    if (!categoryName) {
      dispatch(setCategoryError('Category name is required'));
      dispatch(setCategoryLoading(false));
      return null;
    }

    const response = await fetch('/api/category', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ categoryName }),
    });

    if (!response.ok) {
      let errorMessage = `Error: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData?.message) errorMessage = errorData.message;
      } catch {}
      
      dispatch(setCategoryError(errorMessage));
      dispatch(setCategoryLoading(false));
      return null;
    }

    const data = await response.json();
    dispatch(addCategory(data));
    dispatch(setCategoryLoading(false));
    return data;
  } catch (error) {
    console.error('Error creating category:', error);
    dispatch(setCategoryError(error instanceof Error ? error.message : 'Failed to create category'));
    dispatch(setCategoryLoading(false));
    return null;
  }
};

export const fetchCategories = async (dispatch: Dispatch) => {
  try {
    dispatch(setCategoryLoading(true));
    dispatch(setCategoryError(null));

    const response = await fetch('/api/category', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (!response.ok) {
      let errorMessage = `Error: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData?.message) errorMessage = errorData.message;
      } catch {}
      
      dispatch(setCategoryError(errorMessage));
      dispatch(setCategoryLoading(false));
      return [];
    }

    const data = await response.json();
    //console.log('Fetched categories in category action:', data);
    const categories = Array.isArray(data) ? data : data.categories || [];

    dispatch(setCategories(categories));
    dispatch(setCategoryLoading(false));
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    dispatch(setCategoryError(error instanceof Error ? error.message : 'Failed to fetch categories'));
    dispatch(setCategoryLoading(false));
    return [];
  }
};