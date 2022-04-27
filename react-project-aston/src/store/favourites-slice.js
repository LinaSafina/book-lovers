import { createSlice } from '@reduxjs/toolkit';

const initialFavouritesState = {};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: initialFavouritesState,
  reducers: {
    toggleFavourites(state, action) {
      const id = action.payload;
      const isFavourite = state[id];

      if (isFavourite) {
        delete state[id];
      } else {
        state[id] = true;
      }
    },

    // addFavourite(state, action) {
    //   state[action.payload] = true;
    // },

    // removeFavourite(state, action) {
    //   delete state[action.payload];
    // },

    deleteAll(state) {
      state = {};
    },

    replaceAll(state, action) {
      state = action.payload;
    },
  },
});

export const favouritesActions = favouritesSlice.actions;

export default favouritesSlice.reducer;
