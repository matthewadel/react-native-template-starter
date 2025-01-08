import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '@/types';

const initialState: IUser = {};

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    saveUser(_, action: PayloadAction<IUser>) {
      return { ...action.payload };
    },
    updateUser(state, action: PayloadAction<IUser>) {
      return { ...state, ...action.payload };
    },
    logout() {
      return {
        ...initialState,
      };
    },
  },
});

export const { saveUser, logout, updateUser } = UserSlice.actions;
export default UserSlice.reducer;
