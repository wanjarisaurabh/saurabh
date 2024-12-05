import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Notfound from "../components/Notfound";

const Trailer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Determine the category based on the current URL path
  const category = pathname.includes("movie") ? "movie" : "tv";

  // Safely fetch videos from Redux store
  const ytvideo = useSelector((state) => state[category]?.info?.videos);

  // Get the trailer key from videos.results array (safe access)
  const trailerKey = ytvideo?.key;

  return (
    <div className="bg-[rgba(0,0,0,.9)] absolute z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-[5%] left-[5%] text-white hover:text-[#6556cd] text-2xl"
      >
        <i className="ri-arrow-left-line"></i> Back
      </button>

      {trailerKey ? (
        <ReactPlayer
        controls
          height={800}
          width={1500}
          url={`https://www.youtube.com/watch?v=${trailerKey}`}
        />
      ) : (
        <Notfound />
      )}
    </div>
  );
};

export default Trailer;
