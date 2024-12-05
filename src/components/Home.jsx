import React, { useEffect, useState } from "react";
import Sidhebarnav from "../partials/Sidhebarnav";
import Tommabarnav from "../partials/Tommabarnav";
import Header from "../partials/Header";
import axios from ".././utils/axios";
import HorizentalCards from "../partials/HorizentalCards";
import Dropdown from "../partials/Dropdown";
import Loding from "./Loding";
const Home = () => {
  document.title = "Main | App";
  const [walpaper, setWalpaper] = useState(null);
  const [trending, setrending] = useState(null);
  const [category, setcategory] = useState("all");
  const GetHeader = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      setrending(data);
      let fix = Math.floor(Math.random() * data.results.length); // Use `Math.floor` to avoid decimals
      let randomdata = data.results[fix];
      setWalpaper(randomdata);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const Gettrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setrending(data);
      
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    Gettrending();
    !walpaper && GetHeader();
  }, [category]);

  return walpaper && trending ? (
    <div className="w-screen h-screen flex bg-gray-900 text-white overflow-y-hidden overflow-x-hidden">
      {/* Sidebar Navigation */}
      <Sidhebarnav />

      {/* Main Content */}
      <main className="w-[83%] h-full flex flex-col">
        {/* Top Navigation */}
        <div className="sticky top-0 z-10 bg-gray-800">
          <Tommabarnav />
        </div>

        {/* Header Section */}
        <div className="flex overflow w-[100%]">
          <Header data={walpaper} />
        </div>

        <div className="my-5 mx-10 flex justify-between">
          <h1 className="text-3xl font-semibold text-zinc-00">Trending</h1>
          <Dropdown
            className="text-black"
            title="Filter "
            options={["tv", "movie", "all"]}
            fun={ (e) => setcategory(e.target.value)}
          />
        </div>

        {/* Horizontal Cards Section */}
        <div className="w-full px-4">
          <HorizentalCards data={trending} />
        </div>
      </main>
    </div>
  ) : (
    <Loding/>
  );
};

export default Home;
