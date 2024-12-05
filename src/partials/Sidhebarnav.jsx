import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from ".././utils/axios";

const Sidhebarnav = () => {

  return (
    <div className="w-[17%] border-r-2 p-3 border-zinc-400 h-full">
      <h1 className=" text-2xl text-white font-bold">
        <i className=" text-[#6556CD] mr-2 ri-tv-fill  "></i>
        <span className=""> MR</span>
      </h1>

      <nav className="flex flex-col gap-3 text-zinc-400 text-xl">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5 ">
          New Feeds :
        </h1>

        <Link to= "/Trending "className="hover:bg-[#6556CD] hover:text-white duration-300  rounded-lg p-5">
          <i className="ri-fire-fill"></i> Trending
        </Link>
        <Link to ="/popular" className="hover:bg-[#6556CD] hover:text-white duration-300  rounded-lg p-5">
          <i className="mr-2 ri-bard-fill"></i> Popular
        </Link>
        <Link to ="/Movie   "className="hover:bg-[#6556CD] hover:text-white duration-300  rounded-lg p-5">
          <i className="ri-film-fill"></i> Movies
        </Link>
        <Link to = "/tvshow  "className="hover:bg-[#6556CD] hover:text-white duration-300  rounded-lg p-5">
          <i className="ri-tv-line"></i> Showes
        </Link>
        <Link to =   "/people" className="hover:bg-[#6556CD] hover:text-white duration-300  rounded-lg p-5">
          <i className="ri-team-fill"></i> Popularshowes
        </Link>
      </nav>
      <hr className="border-none h[1px] bg-zinc-400 " />
      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5 ">
          Web INf
        </h1>

        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 gap-2 rounded-lg p-5">
          <i className="ri-folder-unknow-fill"></i>About
        </Link>
        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 gap-1 rounded-lg p-5">
          <i className="ri-customer-service-fill"></i> Contact
        </Link>
      </nav>
    </div>
  );
};

export default Sidhebarnav;
