import { Navbar } from "src/components/Navbar";
import { Footer } from "src/components/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar activePage="" />
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-playfair text-black mb-4">
          404
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 mb-8 text-center">
          Oops! The page you're looking for doesn't exist.
        </p>
      </div>
      <Footer />
    </div>
  );
}
