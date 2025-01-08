import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IApp } from '@/types';

const initialState: IApp = {};

const AppSlice = createSlice({
  name: 'App',
  initialState,
  reducers: {
    SetNotchHeight(
      state,
      action: PayloadAction<{ top: number | null; bottom: number | null }>,
    ) {
      state.notch = action.payload;
    },
    SetActualhHeight(state, action: PayloadAction<number>) {
      state.actualHeight = action.payload;
    },
  },
});

export const { SetNotchHeight, SetActualhHeight } = AppSlice.actions;
export default AppSlice.reducer;
