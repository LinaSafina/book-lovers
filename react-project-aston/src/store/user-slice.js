import { createSlice } from '@reduxjs/toolkit';

const initialUserState = { email: null };

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    login(state, action) {
      console.log(action.payload);
      if (action.payload?.error) {
        console.log(state.email);
        state = initialUserState;
      } else {
        state.email = action.payload;
        console.log(state.email);
      }
    },

    signup(state, action) {
      if (action.payload?.error) {
        state = initialUserState;
      } else {
        state.email = action.payload;
      }
    },

    logout(state) {
      state = initialUserState;
    },

    getSavedUser(state, action) {
      state = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
