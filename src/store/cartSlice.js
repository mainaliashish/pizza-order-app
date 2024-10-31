import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: null,
  reducers: {
    addItem: (state, action) => {
      return action.payload;
    },
    removeItem: (state, action) => {
      return null;
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
