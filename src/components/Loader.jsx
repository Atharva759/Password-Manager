import Navbar from "./Navbar";
import Footer from "./Footer";

const Loader = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-white">
      <Navbar />
      <div className="flex-grow flex items-center justify-center mt-16 mb-16">
        <div className="flex flex-col items-center space-y-4">
          <div className="loader border-4 border-t-transparent border-green-400 rounded-full w-16 h-16 animate-spin" />
          <p className="text-gray-300 text-lg">Please wait...</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Loader;
