import React from "react";
import Loder from "../../public/loder.gif";
const Loding = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-black">
      <img  className = " h-[40%] onject-cover   "   src={Loder} alt="Loading..." />/
      {/* <h1 className="text-white text-5xl font-bold">Loading...</h1> */}
    </div>
  );
};

export default Loding;
