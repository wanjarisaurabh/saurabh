import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  info: null,
};

// Create slice for people
export const peoplereducer = createSlice({
  name: "people",
  initialState,
  reducers: {
    // Reducer to load people info
    loadpeople: (state, action) => {
      state.info = action.payload; // Correct assignment
    },
    // Reducer to remove people info
    removepeople: (state) => {
      state.info = null; // Reset info to null
    },
  },
});

// Export actions for dispatching
export const { loadpeople, removepeople } = peoplereducer.actions;

// Export the reducer to integrate with the store
export default peoplereducer.reducer;
