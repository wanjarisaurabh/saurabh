import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import noimage from "../../public/noimage.png";

const Tommabarnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(false);

  const Getsearches = async () => {
    if (!query.trim()) return; // Skip if query is empty
    setLoading(true);

    try {
      // console.log("Fetching data for query:", query); // Debugging log
      const { data } = await axios.get(`/search/multi`, {
        params: { query },
      });

      // console.log("Response data:", data); // Log full response
      setSearches(data.results || []); // Update state with results
    } catch (error) {
      console.error("Error fetching search results:", error.message);
      setSearches([]); // Clear searches on error
    } finally {
      setLoading(false); // End loading state
    }
  };

  useEffect(() => {
    Getsearches();
  }, [query]);

  return (
    <div className="w-full max-h-[10vh] flex justify-center items-center relative">
      {/* Search Icon */}
      <i className="text-zinc-400 text-3xl ri-search-line absolute left-[20%]"></i>

      {/* Search Input */}
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-[50%] pl-[3rem] text-zinc-200 mx-10 p-3 text-xl outline-none border-none bg-transparent"
        type="text"
        placeholder="Search anything"
      />

      {/* Close Icon */}
      {query.length > 0 && (
        <i
          onClick={() => {
            setQuery("");
            setSearches([]);
          }}
          className="text-zinc-400 text-3xl ri-close-fill absolute right-[20%] cursor-pointer"
        ></i>
      )}

      {/* Dropdown Search Results */}
      {query.trim().length > 0 && (
        <div className="absolute w-[50%] max-h-[50vh] top-[110%] bg-gray-800 rounded-lg shadow-lg overflow-auto z-10">
          {loading ? (
            <p className="text-center text-gray-400 p-4">Loading...</p>
          ) : searches.length > 0 ? (
            searches.map((item, i) => (
              <Link
                to={`${item.media_type}/details/${item.id}`}
                key={i}
                className="flex items-center p-4 hover:bg-gray-700 transition duration-200 border-b border-gray-700"
              >
                <img
                  className="w-12 h-12 object-cover shadow-lg rounded mr-4"
                  src={
                    item.backdrop_path || item.profile_path
                      ? `https://image.tmdb.org/t/p/original/${
                          item.profile_path || item.backdrop_path
                        }`
                      : noimage
                  }
                  alt={item.title || "Search result"}
                />
                <span>
                  {item.title ||
                    item.original_title ||
                    item.original_name ||
                    "No title available"}
                </span>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-400 p-4">
              No results found for "{query}"
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Tommabarnav;
