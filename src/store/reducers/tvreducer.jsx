import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  info: null,
};

// Create slice for movie
export const tvreducer = createSlice({
  name: "tv",
  initialState,
  reducers: {
    // Reducer to load movie info
    loadtv: (state, action) => {
      state.info = action.payload; // Correct assignment
    },
    // Reducer to remove movie info
    removetv: (state) => {
      state.info = null; // Reset info to null
    },
  },
});

// Export actions for dispatching
export const { loadtv, removetv } = tvreducer.actions;

// Export the reducer to integrate with the store
export default tvreducer.reducer;
