import { configureStore } from '@reduxjs/toolkit';

import saveUserData from '../helpers/saveUserData';
import historyReducer from './history-slice';
import favouritesReducer from './favourites-slice';
import userReducer from './user-slice';
import getUserData from '../helpers/getUserData';

const store = configureStore({
  reducer: {
    history: historyReducer,
    favourites: favouritesReducer,
    user: userReducer,
  },
  middleware: [saveUserData],
  preloadedState: getUserData(),
});

export default store;
