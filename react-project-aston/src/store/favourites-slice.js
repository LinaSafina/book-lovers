import { createSlice } from '@reduxjs/toolkit';

const initialFavouritesState = {
  amountOfFavourites: 0,
  favourites: {},
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: initialFavouritesState,
  reducers: {
    toggleFavourites(state, action) {
      const id = action.payload;
      console.log(action.payload)
      const isFavourite = state.favourites[id];
      if (isFavourite) {
        delete state.favourites[id];
        state.amountOfFavourites--;
      } else {
        state.favourites[id] = true;
        state.amountOfFavourites++;
      }
    },
    // addFavourite(state, action) {
    //   const newItem = action.payload;
    //   state.favourites.push(newItem);
    //   state.amountOfFavourites++;
    // },
    // removeFavourite(state, action) {
    //   const id = action.payload;
    //   state.favourites = state.favourites.filter((item) => {
    //     return item.id !== id;
    //   });
    //   state.amountOfFavourites--;
    // },
    deleteAll(state) {
      state.favourites = {};
      state.amountOfFavourites = 0;
    },
  },
});

export const favouritesActions = favouritesSlice.actions;

export default favouritesSlice.reducer;
