import { Dispatch } from "@reduxjs/toolkit";
import { 
  setMemberLoading, 
  setMemberError, 
  addMember,
  setMembers,
  deleteMembers as deleteMultipleMembers 
} from "../slices/memberSlice";

export const fetchMembers = async (dispatch: Dispatch) => {
  try {
    dispatch(setMemberLoading(true));
    dispatch(setMemberError(null));

    const response = await fetch('/api/member', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch members');
    }

    console.log('Successfully fetched members:', data);
    dispatch(setMembers(data));
    dispatch(setMemberLoading(false));
    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch members';
    console.error('Error fetching members:', error);
    dispatch(setMemberError(errorMessage));
    dispatch(setMemberLoading(false));
    throw error;
  }
};

export const createMember = async (name: string, category: string, dispatch: Dispatch) => {
  try {
    dispatch(setMemberLoading(true));
    dispatch(setMemberError(null));

    const response = await fetch(`/api/member`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ name, category }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create member');
    }

    console.log('Successfully created member:', data);
    dispatch(addMember(data));
    dispatch(setMemberLoading(false));
    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create member';
    console.error('Error creating member:', error);
    dispatch(setMemberError(errorMessage));
    dispatch(setMemberLoading(false));
    throw error;
  }
};

export const deleteMembers = async (memberIds: string[], dispatch: Dispatch) => {
  try {
    dispatch(setMemberLoading(true));
    dispatch(setMemberError(null));

    const response = await fetch(`/api/member`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ memberIds }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete members');
    }

    console.log('Successfully deleted members:', memberIds);
    dispatch(deleteMultipleMembers(memberIds));
    dispatch(setMemberLoading(false));
    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete members';
    console.error('Error deleting members:', error);
    dispatch(setMemberError(errorMessage));
    dispatch(setMemberLoading(false));
    throw error;
  }
};