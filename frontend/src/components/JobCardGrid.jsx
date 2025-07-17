import React, { useContext } from 'react';
import { useState } from "react";
import JobDetailsModal from './JobDetailsModal';
import { JobContext } from '../context/JobContext';

// Helper function to calculate time posted
const calculateTimePosted = (createdAt) => {
  const now = new Date();
  const postedDate = new Date(createdAt);
  const diffMs = now.getTime() - postedDate.getTime(); // Difference in milliseconds

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) {
    return "Just now";
  } else if (diffHours < 24) {
    return `${diffHours}h Ago`;
  } else {
    return `${diffDays}d Ago`;
  }
};

const formatSalaryRange = (min, max) => {

const minSalaryRaw = parseFloat(min.replace(/[^0-9.]/g, "")); 
const maxSalaryRaw = parseFloat(max.replace(/[^0-9.]/g, ""));

  const inLakhs = minSalaryRaw >= 100000 && maxSalaryRaw >= 100000;
  const inThousands = minSalaryRaw >= 1000 && maxSalaryRaw >= 1000 && min < 100000 && max < 100000;

  if (inLakhs) {
    return `${(minSalaryRaw / 100000)}-${(maxSalaryRaw / 100000)} LPA`;
  } else if (inThousands) {
    return `${Math.round(minSalaryRaw / 1000)}-${Math.round(maxSalaryRaw / 1000)}k Per Month`;
  } else {
    // Mixed or smaller numbers
    const formatSingle = (amount) =>
      amount >= 100000
        ? `${(amount / 100000).toFixed(1)} LPA`
        : amount >= 1000
        ? `${Math.round(amount / 1000)}K`
        : `₹${amount}`;
    return `${formatSingle(minSalaryRaw)} - ${formatSingle(maxSalaryRaw)}`;
  }
};

  

function JobCardGrid() {


const [selectedJob, setSelectedJob] = useState(null);
 const {jobs} = useContext(JobContext);

  const handleCardClick = (job) => {
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };


  return (
    <div className="flex justify-center p-4 sm:p-6 lg:p-8 font-inter">
      {/* Grid container */}
      <div className="w-full max-w-8xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {jobs.map((job) => {
      

        return (
          <div key={job._id} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between" onClick={() => handleCardClick(job)}>
            {/* Top section */}
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-white rounded-md shadow-md">
                <img
                  src={job.imageUrl}
                  alt={`${job.companyName} Logo`}
                  className="w-11 h-11 rounded-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/40x40/cccccc/000000?text=Logo";
                  }}
                />
              </div>
              <span className="text-black-500 text-xs font-normal bg-blue-200 rounded-md px-3 py-1.5">
                {calculateTimePosted(job.createdAt)}
              </span>
            </div>

            {/* Job Title */}
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{job.jobTitle}</h3>

            {/* Job Details */}
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
                <span>{formatSalaryRange(job.minSalary,job.maxSalary)}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-sm mb-4 line-clamp-3">
              {job.jobDescription}
              <span className="text-blue-500 cursor-pointer ml-1">more</span>
            </p>

            {/* Button */}
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200">
              Apply Now
            </button>
          </div>
        );
      })}
    </div>
    {selectedJob && <JobDetailsModal job={selectedJob} onClose={handleCloseModal} />}
    </div>
  );
}

export default JobCardGrid;
