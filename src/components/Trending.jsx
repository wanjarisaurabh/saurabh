import React, { useEffect, useState } from "react";
import Tommabarnav from "../partials/Tommabarnav";
import Dropdown from "../partials/Dropdown";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Cards from "../partials/Cards";
import Loding from "./Loding";
import InfiniteScroll from "react-infinite-scroll-component"; // Install this with npm or yarn

const Trending = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1); // Track the current page
  const [hasMore, setHasMore] = useState(true); // Track if more data is available

  document.title = "Main | Trending | " + category.toUpperCase();

  const GetTrending = async (currentPage) => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${currentPage}`
      );

      if (data && Array.isArray(data.results)) {
        setTrending((prev) => [...prev, ...data.results]); // Append new results to the current list
        if (data.results.length === 0) {
          setHasMore(false); // Stop loading if no more results are available
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
    // Reset trending data and fetch new results when category or duration changes
    setTrending([]);
    setPage(1);
    setHasMore(true);

    GetTrending(1); // Fetch the first page
    // eslint-disable-next-line
  }, [category, duration]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    GetTrending(nextPage);
  };

  return trending.length ? (
    <div className="px-[3%] pt-5 h-full w-full">
      <div className="flex item-center justify-between">
        <h1 className="text-2xl font-semibold w-20 text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556cd] ri-arrow-left-line"
          ></i>
          Trending
        </h1>
        <div className="w-[100%] flex item-center">
          <Tommabarnav className="pr-10" />
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            fun={(e) => setCategory(e.target.value)}
          />
          <div className="w-7"></div>
          <Dropdown
            title="Duration"
            options={["day", "week"]}
            fun={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={trending.length} // Current number of items
        next={loadMore} // Fetch the next page of items
        hasMore={hasMore} // Stop loading when no more data is available
        loader={<h1>Loading...</h1>} // Custom loader
        scrollThreshold={0.7}

      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loding />
  );
};

export default Trending;


