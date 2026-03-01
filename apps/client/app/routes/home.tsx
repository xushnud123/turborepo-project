import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="shrink-0 flex items-center">
              <span className="text-2xl font-bold text-indigo-600">Brand.</span>
            </div>

            {/* Desktop Links (Hidden on mobile) */}
            <div className="hidden md:flex space-x-8 items-center">
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600 font-medium"
              >
                Features
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600 font-medium"
              >
                Pricing
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600 font-medium"
              >
                Company
              </a>

              {/* Desktop Auth Buttons */}
              <div className="flex items-center space-x-4 pl-4 border-l border-gray-200">
                <NavLink
                  to={"/login"}
                  className="text-gray-600 hover:text-indigo-600 font-semibold px-3 py-2"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/register"
                  className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-sm"
                >
                  Sign Up
                </NavLink>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-indigo-600 focus:outline-none"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu (Transitioning) */}
        {isOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top duration-300">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#"
                className="block px-3 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-md"
              >
                Features
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-md"
              >
                Pricing
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-md"
              >
                Company
              </a>
              <hr className="my-2 border-gray-100" />
              <button className="w-full text-left px-3 py-2 text-gray-600 font-semibold hover:bg-gray-50 rounded-md">
                Sign In
              </button>
              <button className="w-full mt-2 bg-indigo-600 text-white px-3 py-2 rounded-md font-semibold hover:bg-indigo-700">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </nav>
      <main className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight">
            Build something <span className="text-indigo-600">amazing</span>{" "}
            today.
          </h1>
          <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
            The most flexible and intuitive platform to manage your workflow.
            Join 10,000+ teams who are scaling faster than ever.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95">
              Start Free Trial
            </button>
            <button className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all">
              Watch Demo
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
