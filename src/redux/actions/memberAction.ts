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

    if (!response.ok) {
      let errorMessage = `Error: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData?.message) errorMessage = errorData.message;
      } catch {}
      
      dispatch(setMemberError(errorMessage));
      dispatch(setMemberLoading(false));
      return [];
    }

    const members = await response.json();
    //console.log('Fetched members in member action:', members?.data);
    dispatch(setMembers(members?.data));
    dispatch(setMemberLoading(false));
    return members;
  } catch (error) {
    //console.error('Error fetching members:', error);
    dispatch(setMemberError(error instanceof Error ? error.message : 'Failed to fetch members'));
    dispatch(setMemberLoading(false));
    return [];
  }
};

export const createMember = async (name: string, category: string, dispatch: Dispatch) => {
  try {
    dispatch(setMemberLoading(true));
    dispatch(setMemberError(null));


    const response = await fetch('/api/member', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ name, category }),
    });

    if (!response.ok) {
      // For error statuses, try to get error message
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // Ignore JSON parsing errors
      }
      
      dispatch(setMemberError(errorMessage));
      dispatch(setMemberLoading(false));
      return null;
    }

    const data = await response.json();
    //console.log('Created member:', data);
    dispatch(addMember(data));
    dispatch(setMemberLoading(false));
    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create member';
    //console.error('Error creating member:', error);
    dispatch(setMemberError(errorMessage));
    dispatch(setMemberLoading(false));
    return null;
  }
};

export const deleteMembers = async (memberIds: string[], dispatch: Dispatch) => {
  try {
    dispatch(setMemberLoading(true));
    dispatch(setMemberError(null));

    // Validate input
    if (!memberIds.length) {
      const errorMessage = 'No members selected for deletion';
      dispatch(setMemberError(errorMessage));
      dispatch(setMemberLoading(false));
      return false;
    }

    const response = await fetch(`/api/member?ids=${memberIds.join(',')}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      // For error statuses, try to get error message
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // Ignore JSON parsing errors
      }
      
      dispatch(setMemberError(errorMessage));
      dispatch(setMemberLoading(false));
      return false;
    }

    //console.log('Deleted members:', memberIds);
    dispatch(deleteMultipleMembers(memberIds));
    dispatch(setMemberLoading(false));
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete members';
    //console.error('Error deleting members:', error);
    dispatch(setMemberError(errorMessage));
    dispatch(setMemberLoading(false));
    return false;
  }
};