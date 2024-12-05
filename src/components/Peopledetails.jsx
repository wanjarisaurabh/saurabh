import React, { useEffect, useState } from "react";
import { asyncloadpeople, removepeople } from "../store/actions/people";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import Loding from "./Loding";
import HorizentalCards from "../partials/HorizentalCards";
import Dropdown from "../partials/Dropdown";

const Peopledetails = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("movie");  // Default category is 'tv'
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.people);
  const { id } = useParams();

  document.title = "Main | Movie | " + info?.details?.name?.toUpperCase();


 
  useEffect(() => {
    if (id) {
      dispatch(asyncloadpeople(id)); // Fetch data on component mount
    }
    return () => {
      dispatch(removepeople()); // Clean up when the component is unmounted
    };
  }, [id, dispatch]);

  // Handle category change
  // const handleCategoryChange = (e) => {
  //   setcategory(e.target.value);
  //   console.log("Category updated:", e.target.value); // Log to ensure it's updating
  // };

  return info ? (
    <div className="relative w-full h-full flex flex-col items-center p-6 bg-gray-900 text-white overflow-y-auto">
      {/* Navigation Bar */}
      <nav className="w-full flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-zinc-100 text-2xl hover:text-[#6556cd] transition"
        >
          <i className="ri-arrow-left-line"></i> Back
        </button>
        <h1 className="text-xl font-semibold">Person Details</h1>
      </nav>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start w-full">
        {/* Profile Image Section */}
        <div className="w-full md:w-1/4 flex flex-col items-center">
          <img
            className="w-[30vh] h-[30vh] rounded-full shadow-lg object-cover"
            src={`https://image.tmdb.org/t/p/original/${info.details?.profile_path}`}
            alt={info.details?.name || "Profile"}
          />
          <div className="mt-4 flex gap-4">
            {/* Social Links */}
            {info?.externalids?.wikidata_id && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.wikidata.org/wiki/${info?.externalids.wikidata_id}`}
                className="text-2xl text-white hover:text-blue-500 transition"
              >
                <i className="ri-earth-fill"></i>
              </a>
            )}
            {info?.externalids?.facebook_id && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.facebook.com/${info?.externalids.facebook_id}`}
                className="text-2xl text-white hover:text-blue-500 transition"
              >
                <i className="ri-facebook-circle-fill"></i>
              </a>
            )}
            {info?.externalids?.instagram_id && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.instagram.com/${info?.externalids.instagram_id}`}
                className="text-2xl text-white hover:text-pink-500 transition"
              >
                <i className="ri-instagram-fill"></i>
              </a>
            )}
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="w-full md:w-3/4 flex flex-col gap-4">
          <h2 className="text-3xl font-bold">{info.details?.name || "N/A"}</h2>
          <p className="text-lg text-gray-400"><strong>Known For:</strong> {info.details?.known_for_department || "N/A"}</p>
          <p className="text-lg text-gray-400"><strong>Birthday:</strong> {info.details?.birthday || "N/A"}</p>
          <p className="text-lg text-gray-400"><strong>Place of Birth:</strong> {info.details?.place_of_birth || "N/A"}</p>
          <p className="text-lg text-gray-400"><strong>Biography:</strong> {info.details?.biography || "Biography not available."}</p>
        </div>
      </div>

      {/* Combined Credits Section */}
      <div className="w-full mt-8">
        <HorizentalCards data={info?.combinedcreaditcs} />
      </div>

      {/* Dropdown for selecting category */}
      <div className="w-full flex justify-between">
        <h1 className="mt-5 text-xl text-zinc-400 font-semibold">Acting</h1>
        <Dropdown
          title="Category"
          options={["tv", "movie"]}
          fun={(e) => setCategory(e.target.value)}  // Pass the handler to change category
        />
      </div>

      {/* Cast List */}
      <div className="list-disc text-zinc-400 w-full h-[50vh] mt-5 overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.3)] border-2 border-zinc-700 p-5">
        {info[category + "creaditcs"]?.map((c, index) => (
          <li key={index} className="hover:text-white p-5 rounded hover:bg-[#19191d] duration-300 cursor-pointer">
            <Link to={`/${category}/details/${c.id}`}>
              <span>{c.name || c.title || c.original_name || c.original_title}</span>
              <span className="block ml-5">{c.character && `Character Name: ${c.character}`}</span>
            </Link>
          </li>
        ))}
      </div>
    </div>
  ) : (
    <Loding />
  );
};

export default Peopledetails;
