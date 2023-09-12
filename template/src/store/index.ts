import AppReducer from './AppReducer'
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import UserReducer from './UserReducer';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import FilesystemStorage from 'redux-persist-filesystem-storage'

const migrations = {
  1: (state: any) => {
    return state
  },
  // 5: (state: any) => {
  //   return {
  //     ...state,
  //     NationalIDs: {
  //       national_ids: [],
  //     }
  //   }
  // }
}

const persistConfig = {
  key: 'root',
  version: 1,
  storage: FilesystemStorage,
  blacklist: [],
  timeout: 10000,
  migrate: createMigrate(migrations, { debug: false }),
};

const rootReducer = combineReducers({
  App: AppReducer,
  User: UserReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false

  }),
  devTools: true,
});

export { store }
export const persistor = persistStore(store);
export * from './AppReducer'
export * from './UserReducer'