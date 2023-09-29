import { IApp } from 'models'
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState: IApp = {
  lang: 'en'
}

const AppSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    SaveLang(state, action: PayloadAction<string>) {
      state.lang = action.payload
    },
    SetNotchHeight(state, action: PayloadAction<{ top: number | null, bottom: number | null }>) {
      state.notch = action.payload
    },
    SetActualhHeight(state, action: PayloadAction<number>) {
      state.actualHeight = action.payload
    }
  }
})

export const { SaveLang, SetNotchHeight, SetActualhHeight } = AppSlice.actions
export default AppSlice.reducer