import loader from "../../public/loder.gif"; // Correct path to your loader image


const Notfound = () => {
    return (
      <div className="w-screen h-screen flex flex-col bg-black text-white justify-center items-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-6">The page you are looking for does not exist.</p>
        <img
          className="h-1/2 object-cover"
          src={loader } // Ensure a fallback
          alt="Not Found"
        />
      </div>
    );
  };
  
  export default Notfound;
