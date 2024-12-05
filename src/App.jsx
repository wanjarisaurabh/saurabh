import React from "react";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Loding from "./components/Loding";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movie from "./components/Movie";
import Tvshoes from "./components/Tvshoes";
import Peoples from "./components/Peoples";
import Moviedetails from "./components/Moviedetails";
import Tvdetails from "./components/Tvdetails";
import Trailer from "./partials/Trailer";
import Notfound from "./components/Notfound";
import Peopledetails from "./components/peopledetails";

const App = () => {
  return (
    <div className="bg-[#1F1E24] w-full h-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Trending" element={<Trending />} />

        <Route path="/popular" element={<Popular />} />

        <Route path="/Movie" element={<Movie />} />

        <Route path="/movie/details/:id" element={<Moviedetails />}>
          <Route path="Trailer" element={<Trailer />} />
        </Route>

        <Route path="/tvshow" element={<Tvshoes />} />
        <Route path="/tv/details/:id" element={<Tvdetails />}>
          <Route path="Trailer" element={<Trailer />} />
        </Route>

        <Route path="/people" element={<Peoples />} />
        <Route path="/people/details/:id" element={<Peopledetails />} />
        <Route path="/person/details/:id" element={<Peopledetails />} />

        <Route path="/:semi/tv/details/:id" element={<Tvdetails />} />

        <Route path="/:semi/movie/details/:id" element={<Moviedetails />} />

        <Route path="/:semi/people/details/:id" element={<Peopledetails />} />
        <Route path="/:semi/person/details/:id" element={<Peopledetails />} />


        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
};

export default App;
