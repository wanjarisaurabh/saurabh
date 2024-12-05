import React, { useEffect, useState } from "react";
import Tommabarnav from "../partials/Tommabarnav";
import Dropdown from "../partials/Dropdown";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Cards from "../partials/Cards";
import Loding from "./Loding";
import InfiniteScroll from "react-infinite-scroll-component"; // Install this with npm or yarn

const Peoples = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("people");
  //   const [duration, ] = useState("day");
  const [Peoples, setPeoples] = useState([]);
  const [page, setPage] = useState(1); // Track the current page
  const [hasMore, setHasMore] = useState(true); // Track if more data is available
  document.title = "Main || App  || Peoples ";

  const GetPeoples = async () => {
    try {
      const { data } = await axios.get(`person/popular?page=${page}`);
      // console.log(data);
      if (data && Array.isArray(data.results)) {
        setPeoples((prev) => [...prev, ...data.results]); // Append new results to the current list
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
    // Reset Peoples data and fetch new results when category
    setPeoples([]);
    setPage(1);
    setHasMore(true);
    GetPeoples();
    // eslint-disable-next-line
  }, [category]);

  return Peoples.length ? (
    <div className="px-[3%] pt-5 h-full w-full">
      <div className="flex item-center justify-between">
        <h1 className="text-2xl font-semibold w-20 text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556cd] ri-arrow-left-line"
          ></i>
          Peoples
        </h1>
        <div className="w-[100%] flex item-center">
          <Tommabarnav className="pr-10" />
         
          {/* <div className="w-7"></div> */}
        </div>
      </div>

      <InfiniteScroll
        dataLength={Peoples.length} // Current number of items
        next={GetPeoples} // Fetch the next page of items
        hasMore={hasMore} // Stop loading when no more data is available
        loader={<h1>Loading...</h1>} // Custom loader
        scrollThreshold={0.7}

      >
        <Cards data={Peoples} title="people" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loding />
  );
};

export default Peoples;
