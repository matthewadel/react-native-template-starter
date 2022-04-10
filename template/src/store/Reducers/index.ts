import { combineReducers } from 'redux';
import AppReducer from './AppReducer'
import UserReducer from './UserReducer';

export default combineReducers({
  App: AppReducer,
  User: UserReducer,
})