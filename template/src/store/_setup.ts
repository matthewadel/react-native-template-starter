import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import AppReducer from '@/store/app-reducer';
import UserReducer from '@/store/user-reducer';

const rootReducer = combineReducers({
  App: AppReducer,
  User: UserReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: true,
});

export { rootReducer, store };
