import { configureStore } from '@reduxjs/toolkit';

import historyReducer from './history-slice';
import favouritesReducer from './favourites-slice';

const store = configureStore({
  reducer: { history: historyReducer, favourites: favouritesReducer },
});

export default store;
