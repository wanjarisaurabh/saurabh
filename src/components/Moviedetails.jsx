import React, { useEffect } from "react";
import { asyncloadmovie, removemovie } from "../store/actions/movie";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams, Link, useNavigate } from "react-router-dom";
import Loding from "./Loding";
import HorizentalCards from "../partials/HorizentalCards";

const Moviedetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For navigating back
  const { info } = useSelector((state) => state.movie);
  const { id } = useParams();
  
  document.title = "Main | Movie | " + info?.details?.title.toUpperCase();


  useEffect(() => {
    if (id) {
      dispatch(asyncloadmovie(id));
    }
    return () => {
      dispatch(removemovie());
    };
  }, [id, dispatch]);
  console.log("hello");
  console.log(info?.externalids?.wikidata_id);

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
      {/* Navigation */}
      <nav className="w-[30%] flex justify-between items-center py-4">
        <button
          onClick={() => navigate(-1)} // Navigate to the previous page
          className=" px-3 py-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600"
        >
          <i className="ri-arrow-left-line mr-2"></i> Back
        </button>

        {info?.externalids?.imdb_id != null && (
          <Link
            to={`https://www.imdb.com/title/${info?.externalids?.imdb_id}`} // Fetch Wikipedia and IMDb ratings
            className="px-3 py-2 bg-yellow-400 rounded-lg text-black font-bold hover:bg-green-500"
          >
            IMDb
          </Link>
        )}
        {info?.externalids?.wikidata_id != null && (
          <Link
            to={`https://www.wikidata.org/wiki/${info?.externalids?.wikidata_id}`} // Fetch Wikipedia and IMDb ratings
            className="px-3 py-2 bg-green-600 rounded-lg text-white hover:bg-green-500"
          >
            <i className="ri-global-line mr-2"></i> Global Info
          </Link>
        )}
      </nav>
      {/* Header Section */}
      <header className="text-center py-6">
        <h1 className="text-5xl font-bold">{info.details?.title}</h1>
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
            alt={`${info.details?.title || "Movie Poster"}`}
            className="relative rounded-lg shadow-lg w-full h-auto"
          />
        </div>

        {/* Description Section */}
        <div className="flex-grow">
          <h2 className="text-4xl font-bold">{info.details?.title}</h2>
          <p className="mt-4 text-lg">{info.details?.overview}</p>
          <p className="mt-2 text-sm text-gray-300">
            Release Date: {info.details?.release_date || "N/A"}
          </p>
          <p className="mt-2 mb-7 text-sm text-gray-300">
            Rating: {info.details?.vote_average || "N/A"} / 10
          </p>

          {/* Watch Providers - Flatrate */}
          {info.watchproviders?.flatrate && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Available on:</h3>
              <div className="flex gap-4 mt-2">
                {info.watchproviders.flatrate.map((provider) => (
                  <img
                    key={provider.provider_id}
                    className="w-10 h-10 object-cover rounded-md shadow-md"
                    src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                    alt={provider.provider_name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Watch Providers - Rent */}
          {info.watchproviders?.rent && (
            <div className="mt-6 mb-10">
              <h3 className="text-lg font-semibold">Available for Rent:</h3>
              <div className="flex gap-4 mt-2">
                {info.watchproviders.rent.map((provider) => (
                  <img
                    key={provider.provider_id}
                    className="w-10 h-10 object-cover rounded-md shadow-md"
                    src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                    alt={provider.provider_name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Play Trailer Button */}
          {info.details?.id && (
            <Link
              to={`/movie/details/${info.details.id}/Trailer`}
              className="px-5 py-2 bg-[#6556cd] rounded-lg text-white hover:bg-[#5646b1] transition"
            >
              <i className="ri-play-line mr-2"></i> Play
            </Link>
          )}
        </div>
      </div>

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

export default Moviedetails;
