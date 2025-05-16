import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { AppReducer, UserReducer } from '@/store';

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
