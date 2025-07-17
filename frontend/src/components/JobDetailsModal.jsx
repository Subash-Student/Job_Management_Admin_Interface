// components/JobDetailsModal.js (or a suitable path like modals/JobDetailsModal.js)

import React, { useState } from 'react';


const JobDetailsModal = ({ job, onClose }) => {
  if (!job) return null; // Don't render if no job is provided
  const [isApplied, setIsApplied] = useState(false);

  // Format application deadline
  const formattedDeadline = new Date(job.applicationDeadline).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4 font-inter">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>

        {/* Company Logo and Title */}
        <div className="flex items-center mb-6">
          <div className="p-2 bg-white rounded-md shadow-md mr-4">
            <img
              src={job.imageUrl}
              alt={`${job.companyName} Logo`}
              className="w-16 h-16 rounded-full"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/64x64/cccccc/000000?text=Logo"; }}
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{job.jobTitle}</h2>
            <p className="text-gray-600 text-lg">{job.companyName} - {job.jobType}</p>
          </div>
        </div>

        {/* Key Details */}
        <div className="flex items-center text-gray-600 text-sm mb-4 space-x-3">
              <div className="flex items-center">
                <img
                  src="experience.png"
                  alt="Experience Icon"
                  className="mr-1"
                  width="16"
                  height="16"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/16x16/cccccc/000000?text=E";
                  }}
                />
                <span>{job.jobExperience}</span>
              </div>
              <div className="flex items-center">
                <img
                  src="location.png"
                  alt="Location Icon"
                  className="mr-1"
                  width="16"
                  height="16"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/16x16/cccccc/000000?text=L";
                  }}
                />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center">
                <img
                  src="salary.png"
                  alt="Salary Icon"
                  className="mr-1"
                  width="16"
                  height="16"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/16x16/cccccc/000000?text=S";
                  }}
                />
                <span>{job.salaryRange}</span>
              </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-gray-500">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span className="font-medium">Deadline:</span> <span className="ml-1">{formattedDeadline}</span>
          </div>
            </div>

        {/* Sections: Description, Requirements, Responsibilities */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Job Description</h3>
          <p className="text-gray-700 text-base leading-relaxed">{job.jobDescription}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Requirements</h3>
          <p className="text-gray-700 text-base leading-relaxed">{job.requirements}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Responsibilities</h3>
          <p className="text-gray-700 text-base leading-relaxed">{job.responsibilities}</p>
        </div>

        {/* Apply Button at the bottom */}
        <div className="flex justify-center mt-4">
        <button
      onClick={() => setIsApplied(true)}
      className={`${
        isApplied ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
      } text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors duration-200`}
    >
      {isApplied ? "Applied" : "Apply Now"}
    </button>

        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;
