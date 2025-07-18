import React, { useContext, useState } from 'react';
import { JobContext } from '../context/JobContext';
import { X } from 'lucide-react'; // Only X icon is needed now

const JobDetailsModal = ({ job, onClose }) => {
  if (!job) return null;
  const [isApplied, setIsApplied] = useState(false);

  const { formatSalaryRange } = useContext(JobContext);

  const formattedDeadline = new Date(job.applicationDeadline).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4 sm:p-6 font-inter">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl lg:max-w-3xl h-[90vh] scrollbar-hide overflow-y-auto p-6 sm:p-8 relative ">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Company Logo and Job Title Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 border-b pb-4">
          <div className="p-2 bg-white rounded-md shadow-md mb-4 sm:mb-0 sm:mr-4 flex-shrink-0">
            <img
              src={job.imageUrl}
              alt={`${job.companyName} Logo`}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-contain"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/80x80/cccccc/000000?text=Logo"; }}
            />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 leading-tight mb-1">
              {job.jobTitle}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              {job.companyName} - {job.jobType}
            </p>
          </div>
        </div>

        {/* Job Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-gray-700 text-sm sm:text-base mb-6">
          <div className="flex items-center">
            <img
              src="experience.png"
              alt="Experience Icon"
              className="mr-2"
              width="18" // Adjusted size for better alignment
              height="18" // Adjusted size
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/18x18/cccccc/000000?text=E";
              }}
            />
            <span>{job.jobExperience}</span>
          </div>
          <div className="flex items-center">
            <img
              src="location.png"
              alt="Location Icon"
              className="mr-2"
              width="18" // Adjusted size
              height="18" // Adjusted size
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/18x18/cccccc/000000?text=L";
              }}
            />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center">
            <img
              src="salary.png"
              alt="Salary Icon"
              className="mr-2"
              width="18" // Adjusted size
              height="18" // Adjusted size
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/18x18/cccccc/000000?text=S";
              }}
            />
            <span>{formatSalaryRange(job.minSalary, job.maxSalary)}</span>
          </div>
          <div className="flex items-center">
             {/* Re-using the calendar SVG you provided earlier, or you can use an image here too */}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-gray-500">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span className="font-medium">Deadline:</span> <span className="ml-1">{formattedDeadline}</span>
          </div>
        </div>

        {/* Job Description */}
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Job Description</h3>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">{job.jobDescription}</p>
        </div>

        {/* Requirements */}
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Requirements</h3>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">{job.requirements}</p>
        </div>

        {/* Responsibilities */}
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Responsibilities</h3>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">{job.responsibilities}</p>
        </div>

        {/* Apply Button */}
        <div className="flex justify-center mt-4 pt-4 border-t">
          <button
            onClick={() => setIsApplied(true)}
            className={`${
              isApplied ? "bg-green-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors duration-200`}
            disabled={isApplied}
          >
            {isApplied ? "Applied" : "Apply Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;