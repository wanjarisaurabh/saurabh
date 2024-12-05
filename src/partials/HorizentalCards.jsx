import React from "react";
import { Link } from "react-router-dom";
import noimage from "../../public/noimage.png";
import Dropdown from "./Dropdown";
import Loding from "../components/Loding";

const HorizentalCards = ({ data }) => {
  const values = data.results || data; // Ensure `values` is an array to prevent crashes
  console.log(values);
  return values ? (
    <div className="w-full h-full p-5">
      <div className="flex overflow-x-auto space-x-5 py-3 scrollbar-hide">
        {values.map((item, i) => (
          <Link
            to={`/${item.media_type}/details/${item.id}`}
            key={i}
            className="overflow-hidden rounded-lg bg-zinc-800 flex-shrink-0 w-[250px] min-w-[250px] max-w-[250px] hover:scale-105 transition-transform duration-300"
          >
            <img
              className="w-full rounded-t-lg h-60 object-cover"
              src={
                item.backdrop_path
                  ? `https://image.tmdb.org/t/p/original/${item.backdrop_path}`
                  : item.poster_path
                  ? `https://image.tmdb.org/t/p/original/${item.poster_path}`
                  : noimage // Default fallback
              }
              alt={item.title || "No Image Available"}
            />

            <div className="p-3">
              <h1 className="text-lg font-semibold text-white truncate">
                {item.name ||
                  item.title ||
                  item.original_name ||
                  item.original_title}
              </h1>
              <p className="mt-3 mb-3 text-sm text-gray-400">
                {item.overview
                  ? `${item.overview.slice(0, 50)}...`
                  : "No description available"}
                <Link
                  to={`/${item.media_type}/details/${item.id}`}
                  className="text-blue-200 ml-1"
                >
                  more
                </Link>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <div className="w-full h-full ">
      <h1 className="text-2xl font-bold">No Recommendations</h1>
    </div>
  );
};

export default HorizentalCards;
