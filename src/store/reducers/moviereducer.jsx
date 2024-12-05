import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  info: null,
};

// Create slice for movie
export const moviereducer = createSlice({
  name: "movie",
  initialState,
  reducers: {
    // Action to load movie info
    loadmovie: (state, action) => {
      state.info = action.payload;
    },
    // Action to remove movie info
    removemovie: (state) => {
      state.info = null;
    },
  },
});

// Export actions for dispatch
export const { loadmovie, removemovie } = moviereducer.actions;

// Export the reducer to integrate into the store
export default moviereducer.reducer;
