import { IUser } from "models"
import { LOGOUT, SET_USER, UPDATE_USER_DATA } from "store/Actions"

const initialState: IUser = {
  User: null,
}

const UserReducer = (state = initialState, action: any) => {
  switch (action.type) {

    case SET_USER: {
      return {
        ...state,
        User: action.User,
      }
    }

    case UPDATE_USER_DATA: {
      return {
        ...state,
        User: { ...state.User, ...action.data }
      }
    }

    case LOGOUT: {
      return initialState
    }

    default:
      return state
  }
}

export default UserReducer