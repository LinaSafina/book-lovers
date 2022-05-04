import { createSlice } from '@reduxjs/toolkit';

import { HistoryType } from '../types/types';

const initialHistoryState: HistoryType | undefined = [];

const historySlice = createSlice({
  name: 'history',
  initialState: initialHistoryState,
  reducers: {
    deleteAll(state) {
      state = [];
    },
    add(state, action) {
      state.unshift(action.payload);
    },
    replaceAll(state, action) {
      state = action.payload;
    },
  },
});

export const historyActions = historySlice.actions;

export default historySlice.reducer;
