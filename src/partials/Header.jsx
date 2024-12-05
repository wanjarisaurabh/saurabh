import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original/${
          data.profile_path || data.backdrop_path || ""
        })`,
        backgroundPosition: "center ",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw", // Full width of the viewport
        height: "50vh", // Half the viewport height
      }}
      className="flex flex-col justify-end p-[10%]"
    >
      <div className="relative top-[35%]">
        <h1 className="text-5xl font-black text-white mb-4">
          {data.name || data.title || data.original_name || data.original_title}
        </h1>

        <p className="w-[70%] text-gray-300 mb-4">
          {data.overview.slice(0, 200)}...
          <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-200 ml-2">
            more
          </Link>
        </p>

        <p className="text-gray-400 mb-2">
          <i className="text-yellow-300 ri-megaphone-fill mr-2"></i>
          {data.release_date || data.first_air_date}
        </p>

        <p className="text-gray-400 mb-4">
          <i className="text-yellow-300 ri-album-fill mr-2"></i>
          {data.media_type && data.media_type.toUpperCase()}
        </p>

        <Link
          to={`/${data.media_type}/details/${data.id}/Trailer`}
          className="p-3 hover:p-[14px] rounded bg-[#6556CD] text-white font-semibold hover:bg-[#5345a8] duration-200"
        >
          Watch Trailer
        </Link>
      </div>
    </div>
  );
};

export default Header;
