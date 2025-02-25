// import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8082/api';

export interface Category {
  id?: string;
  categoryName: string;
}

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
};

export const createCategory = async (categoryName: string): Promise<Category> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'include', // This will include httpOnly cookies
      body: JSON.stringify({ categoryName }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create category');
    }

    return response.json();
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to create category');
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'GET',
      headers: getHeaders(),
      credentials: 'include', // This will include httpOnly cookies
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch categories');
    }

    return response.json();
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to fetch categories');
  }
};
