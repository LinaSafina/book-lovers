import { configureStore } from '@reduxjs/toolkit';

import saveUserData from '../helpers/saveUserData';
import historyReducer from './history-slice';
import favouritesReducer from './favourites-slice';
import uiReducer from './ui-slice';
import userReducer from './user-slice';
import getUserData from '../helpers/getUserData';

const store = configureStore({
  reducer: {
    history: historyReducer,
    favourites: favouritesReducer,
    user: userReducer,
    ui: uiReducer,
  },
  middleware: [saveUserData],
  preloadedState: getUserData(),
});

export default store;
