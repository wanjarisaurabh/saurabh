import React, { useEffect, useState } from "react";
import Tommabarnav from "../partials/Tommabarnav";
import Dropdown from "../partials/Dropdown";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Cards from "../partials/Cards";
import Loding from "./Loding";
import InfiniteScroll from "react-infinite-scroll-component"; // Install this with npm or yarn

const Movie = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("now_playing");
  //   const [duration, ] = useState("day");
  const [Movie, setMovie] = useState([]);
  const [page, setPage] = useState(1); // Track the current page
  const [hasMore, setHasMore] = useState(true); // Track if more data is available
  document.title = "Main || App  || Movie ";

  const GetMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      // console.log(data);
      if (data && Array.isArray(data.results)) {
        setMovie((prev) => [...prev, ...data.results]); // Append new results to the current list
        if (data.results.length === 0) {
          setHasMore(false); // Stop loading if no more results are available
        } else {
          setPage((prevPage) => prevPage + 1); // Increment the page for the next call
        }
      } else {
        console.error("Unexpected API response:", data);
        setHasMore(false); // Stop loading if the response is invalid
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setHasMore(false); // Stop loading on error
    }
  };

  useEffect(() => {
    // Reset Movie data and fetch new results when category
    setMovie([]);
    setPage(1);
    setHasMore(true);
    GetMovie();
    // eslint-disable-next-line
  }, [category]);

  return Movie.length ? (
    <div className="px-[3%] pt-5 h-full w-full">
      <div className="flex item-center justify-between">
        <h1 className="text-2xl font-semibold w-20 text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556cd] ri-arrow-left-line"
          ></i>
          Movie
        </h1>
        <div className="w-[100%] flex item-center">
          <Tommabarnav className="pr-10" />
          <Dropdown
            title="Filter"
            options={["popular", "top_rated", "upcoming", "now_playing"]}
            fun={(e) => setCategory(e.target.value)}
          />
          {/* <div className="w-7"></div> */}
        </div>
      </div>

      <InfiniteScroll
        dataLength={Movie.length} // Current number of items
        next={GetMovie} // Fetch the next page of items
        hasMore={hasMore} // Stop loading when no more data is available
        loader={<h1>Loading...</h1>} // Custom loader
        scrollThreshold={0.7}

      >
        <Cards data={Movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loding />
  );
};

export default Movie;
