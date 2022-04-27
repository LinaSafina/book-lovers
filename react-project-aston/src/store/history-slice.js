import { createSlice } from '@reduxjs/toolkit';

const initialHistoryState = [];

const historySlice = createSlice({
  name: 'history',
  initialState: initialHistoryState,
  reducers: {
    deleteAll(state) {
      state = [];
    },
    add(state, action) {
      console.log(state, action);
      state.unshift(action.payload);
    },
    replaceAll(state, action) {
      state = action.payload;
    },
  },
});

export const historyActions = historySlice.actions;

export default historySlice.reducer;
