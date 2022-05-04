import { configureStore } from '@reduxjs/toolkit';

import saveUserData from '../helpers/saveUserData';
import historyReducer from './history-slice';
import favouritesReducer from './favourites-slice';
import userReducer from './user-slice';
import getUserData from '../helpers/getUserData';
import { apiSlice } from './api-slice';

const preloadedState: { user: any; history: any; favourites: any } =
  getUserData();

const store = configureStore({
  reducer: {
    history: historyReducer,
    favourites: favouritesReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveUserData, apiSlice.middleware),
  preloadedState: preloadedState,
});

export default store;
