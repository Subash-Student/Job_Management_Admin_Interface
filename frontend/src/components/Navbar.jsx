import React, { useContext, useState } from 'react';
import { JobContext } from '../context/JobContext';

const logoPlaceholder = "cybermind_works_logo.jpeg";

function Navbar() {
  const { handleOpenCreateJobModal } = useContext(JobContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-transparent py-4 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-full shadow-lg px-3 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src={logoPlaceholder}
            alt="Company Logo"
            className="h-10 w-10 ml-3 rounded-full"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/40x40/cccccc/000000?text=Logo"; }}
          />
        </div>

        {/* Hamburger for mobile */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex flex-grow justify-center space-x-8">
          <a href="#" className="text-gray-900 hover:text-gray-700 font-medium text-base">Home</a>
          <a href="#" className="text-gray-900 hover:text-gray-700 font-medium text-base">Find Jobs</a>
          <a href="#" className="text-gray-900 hover:text-gray-700 font-medium text-base">Find Talents</a>
          <a href="#" className="text-gray-900 hover:text-gray-700 font-medium text-base">About us</a>
          <a href="#" className="text-gray-900 hover:text-gray-700 font-medium text-base">Testimonials</a>
        </div>

        {/* Create Jobs Button */}
        <div className="hidden lg:block">
          <button
            onClick={handleOpenCreateJobModal}
            className="bg-purple-700 hover:bg-purple-800 mr-3 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-colors duration-200"
          >
            Create Jobs
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-30 transition-opacity duration-200 ${menuOpen ? '' : 'pointer-events-none opacity-0'}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-transform duration-200 rounded-b-3xl px-6 pt-5 pb-6 lg:hidden ${
          menuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-col items-center space-y-5">
          <a href="#" onClick={() => setMenuOpen(false)} className="text-gray-900 hover:text-gray-700 font-medium text-lg">Home</a>
          <a href="#" onClick={() => setMenuOpen(false)} className="text-gray-900 hover:text-gray-700 font-medium text-lg">Find Jobs</a>
          <a href="#" onClick={() => setMenuOpen(false)} className="text-gray-900 hover:text-gray-700 font-medium text-lg">Find Talents</a>
          <a href="#" onClick={() => setMenuOpen(false)} className="text-gray-900 hover:text-gray-700 font-medium text-lg">About us</a>
          <a href="#" onClick={() => setMenuOpen(false)} className="text-gray-900 hover:text-gray-700 font-medium text-lg">Testimonials</a>
          <button
            onClick={() => {
              setMenuOpen(false);
              handleOpenCreateJobModal();
            }}
            className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-colors duration-200 w-full mt-3"
          >
            Create Jobs
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
