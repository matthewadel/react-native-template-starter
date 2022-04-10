import { SET_USER, LOGOUT, UPDATE_USER_DATA } from 'store/Actions'

export const saveUser = (userData: any) => {
  return {
    type: SET_USER,
    User: {
      ...userData
    }
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  }
}

export const updateUser = (changedData: any) => {

  let data = {}
  changedData.map((item: any) => {
    data[item.field] = item.value
  })
  console.log(data)

  return {
    type: UPDATE_USER_DATA,
    data
  }
}