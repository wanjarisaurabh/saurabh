import React, { useEffect } from "react";
import { asyncloadtv, removetv } from "../store/actions/tvactions";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams, Link } from "react-router-dom";
import Loding from "./Loding";
import HorizentalCards from "../partials/HorizentalCards";

const Tvdetails = () => {
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.tv);
  const { id } = useParams();

  document.title = "Main | Movie | " + info?.details?.name?.toUpperCase();

  useEffect(() => {
    if (id) {
      dispatch(asyncloadtv(id));
    }
    return () => {
      dispatch(removetv());
    };
  }, [id, dispatch]);

  return info ? (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original/${
          info.details?.backdrop_path || ""
        })`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-screen h-screen px-[10%] text-white overflow-y-auto"
    >
      {/* Header Section */}
      <header className="text-center py-6">
        <h1 className="text-5xl font-bold">{info.details?.name}</h1>
      </header>
      {/* Content Section */}
      <div className="flex items-start gap-10">
        {/* Poster Image */}
        <div className="relative max-w-[300px] sm:max-w-[400px]">
          <div
            className="absolute -inset-2 rounded-lg bg-black opacity-50 shadow-2xl"
            style={{
              filter: "blur(20px)",
            }}
          ></div>
          <img
            src={`https://image.tmdb.org/t/p/original/${
              info.details?.poster_path || info.details?.backdrop_path || ""
            }`}
            alt={`${info.details?.name || "TV Poster"}`}
            className="relative rounded-lg shadow-lg w-full h-auto"
          />
        </div>

        {/* Description Section */}
        <div className="flex-grow">
          <h2 className="text-4xl font-bold">{info.details?.name}</h2>
          <p className="mt-4 text-lg">{info.details?.overview}</p>
          <p className="mt-2 text-sm text-gray-300">
            First Air Date: {info.details?.first_air_date || "N/A"}
          </p>
          <p className="mt-2 mb-7 text-sm text-gray-300">
            Rating: {info.details?.vote_average || "N/A"} / 10
          </p>

          {/* Play Trailer Button */}
          {info.details?.id && (
            <Link
              to={`/tv/details/${info.details.id}/Trailer`}
              className="px-5 py-2 bg-[#6556cd] rounded-lg text-white hover:bg-[#5646b1] transition"
            >
              <i className="ri-play-line mr-2"></i> Play
            </Link>
          )}
        </div>
      </div>

      {/* Seasons Section */}

      {info.details?.seasons[0].poster_path != null && (
        <>
          <hr className="mt-10 border-none bg-zinc-500 h-[1px]" />
          <div className="mt-10">
            <h1 className="font-bold text-2xl">Seasons</h1>
            <HorizentalCards data={info.details.seasons} />
          </div>
        </>
      )}

      {/* Recommendations and Similarity Section */}
      <hr className="mt-10 border-none bg-zinc-500 h-[1px]" />
      <div className="mt-10">
        <h1 className="font-bold text-2xl">You May Also Like</h1>
        <HorizentalCards
          data={
            info.recommendations?.length > 0
              ? info.recommendations
              : info.similar || []
          }
        />
      </div>
      <Outlet />
    </div>
  ) : (
    <Loding />
  );
};

export default Tvdetails;
