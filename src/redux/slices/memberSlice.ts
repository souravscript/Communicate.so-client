import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Member } from '@/constants/types';

interface MemberState {
  members: Member[];
  loading: boolean;
  error: string | null;
}

const initialState: MemberState = {
  members: [],
  loading: false,
  error: null,
};

const memberSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    setMemberLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setMemberError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addMember: (state, action: PayloadAction<Member>) => {
      state.members.push(action.payload);
    },
    setMembers: (state, action: PayloadAction<Member[]>) => {
      state.members = action.payload;
    },
    deleteMembers: (state, action: PayloadAction<string[]>) => {
      state.members = state.members.filter(
        (member) => !action.payload.includes(member.id)
      );
    },
  },
});

export const {
  setMemberLoading,
  setMemberError,
  addMember,
  setMembers,
  deleteMembers,
} = memberSlice.actions;

export default memberSlice.reducer;
