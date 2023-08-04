import { IUser } from "models"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState: IUser = {}

const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    saveUser(_, action: PayloadAction<IUser>) {
      return { ...action.payload }
    },
    updateUser(state, action: PayloadAction<IUser>) {
      return { ...state, ...action.payload }
    },
    logout() {
      return {
        ...initialState
      }
    }
  }
})

export const { saveUser, logout, updateUser } = UserSlice.actions
export default UserSlice.reducer