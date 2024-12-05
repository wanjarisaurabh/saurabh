import { configureStore } from "@reduxjs/toolkit";

import moviereducer from "./reducers/moviereducer";

import tvreducer from "./reducers/tvreducer";

import peoplereducer from "./reducers/peoplereducer";

export const store = configureStore({
  reducer: {
    movie: moviereducer,
    tv: tvreducer,
    people : peoplereducer,
  },
});
