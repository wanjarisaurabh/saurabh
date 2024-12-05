import React from "react";
import { Link } from "react-router-dom";
import noimage from "../../public/noimage.png";
const Cards = ({ data = [], title }) => {
  if (!Array.isArray(data)) {
    console.error("Cards component received invalid data:", data);
    return <p>No data available</p>; // Fallback UI
  }

  // console.log(data);

  return (
    <div className="flex flex-wrap justify-center">
      {data.map((c, i) => (
        <Link
          key={i}
          to={`/${c.media_type || title}/details/${c.id}`} // Assuming `c.id` exists for navigation
          className="m-4 relative rounded-lg w-[12%] h-[35vh] p-4 border border-transparent hover:border-white rounded hover:shadow-lg"
        >
          <img
            src={`https://image.tmdb.org/t/p/original/${
              c.backdrop_path ||
              c.poster_path ||
              c.profile_path ||
              c.backdrop_path ||
              noimage
            } `}
            alt={c.name || c.title || "Card Image"}
            className="w-full shadow-md h-72 rounded-md object-cover"
          />
          <h3 className="  text-center text-white font-semibold mt-2">
            {(c.name && c.name.slice(0, 10)) ||
              (c.title && c.title.slice(0, 10)) ||
              (c.original_name && c.original_name.slice(0, 20)) ||
              (c.original_title && c.original_title.slice(0, 10)) ||
              "Untitled"}
          </h3>

          {Number.isFinite(c.vote_average) && (
            <div
              className="absolute bottom-[15%] left-[1%] rounded-full text-xl font-semibold bg-yellow-600 
  text-white w-[5vh] h-[5vh] flex justify-center items-center"
            >
              {(c.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
