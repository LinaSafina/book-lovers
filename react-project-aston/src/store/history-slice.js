import { createSlice } from '@reduxjs/toolkit';

const initialHistoryState = { history: [] };

const historySlice = createSlice({
  name: 'history',
  initialState: initialHistoryState,
  reducers: {
    deleteAll(state) {
      state.history = [];
    },
    add(state, action) {
      console.log(action.payload);
      state.history.unshift(action.payload);
    },
  },
});

export const historyActions = historySlice.actions;

export default historySlice.reducer;
