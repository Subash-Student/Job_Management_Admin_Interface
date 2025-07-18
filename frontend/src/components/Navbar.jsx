import React, { useContext } from 'react';
import { JobContext } from '../context/JobContext';


const logoPlaceholder = "cybermind_works_logo.jpeg"; 

function Navbar() {

  const {handleOpenCreateJobModal} = useContext(JobContext)

  return (
    
    <nav className="flex justify-center py-4 px-4 sm:px-6 lg:px-8">
      
      <div className="w-full max-w-4xl bg-white rounded-full shadow-lg p-3 flex items-center justify-between">
        
        <div className="flex items-center space-x-2">
          
          <img
            src={logoPlaceholder}
            alt="Company Logo"
            className="h-10 w-10 ml-3  rounded-full"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/40x40/cccccc/000000?text=Logo"; }} 
          />
        </div>

        
        <div className="flex-grow flex justify-center space-x-8 ">
          <a href="#" className="text-gray-900 hover:text-gray-700 font-medium text-base">Home</a>
          <a href="#" className="text-gray-900 hover:text-gray-700 font-medium text-base">Find Jobs</a>
          <a href="#" className="text-gray-900 hover:text-gray-700 font-medium text-base">Find Talents</a>
          <a href="#" className="text-gray-900 hover:text-gray-700 font-medium text-base">About us</a>
          <a href="#" className="text-gray-900 hover:text-gray-700 font-medium text-base">Testimonials</a>
        </div>

        
        <div>
          <button onClick={handleOpenCreateJobModal} className="bg-purple-700 hover:bg-purple-800 mr-3 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-colors duration-200">
            Create Jobs
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
