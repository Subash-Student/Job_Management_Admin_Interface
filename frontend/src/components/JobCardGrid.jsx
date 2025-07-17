import React from 'react';
import { useState } from "react";
import JobDetailsModal from './JobDetailsModal';

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

// Mock data for job listings, updated with new structure and createdAt
const mockJobs = [
  {
    id: 1,
    jobTitle: "Full Stack Developer",
    companyName: "Amazon",
    location: "Onsite",
    jobType: "Full-time",
    salaryRange: "12LPA",
    jobDescription: "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized.",
    requirements: "Strong React, Node.js, MongoDB skills.",
    responsibilities: "Develop and maintain full-stack applications.",
    applicationDeadline: "2025-08-30T23:59:59Z",
    jobExperience: "1-3 yr Exp",
    imageUrl: "https://placehold.co/40x40/FF9900/FFFFFF?text=A", // Amazon-like logo
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 24 hours ago
  },
  {
    id: 2,
    jobTitle: "Node Js Developer",
    companyName: "Tesla",
    location: "Onsite",
    jobType: "Full-time",
    salaryRange: "12LPA",
    jobDescription: "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized.",
    requirements: "Expertise in Node.js and Express.js.",
    responsibilities: "Build scalable backend APIs.",
    applicationDeadline: "2025-09-01T23:59:59Z",
    jobExperience: "1-3 yr Exp",
    imageUrl: "https://placehold.co/40x40/000000/FFFFFF?text=T", // Tesla-like logo
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: 3,
    jobTitle: "UX/UI Designer",
    companyName: "Swiggy",
    location: "Onsite",
    jobType: "Full-time",
    salaryRange: "12LPA",
    jobDescription: "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized.",
    requirements: "Proficiency in Figma and user research.",
    responsibilities: "Create intuitive user interfaces.",
    applicationDeadline: "2025-08-25T23:59:59Z",
    jobExperience: "1-3 yr Exp",
    imageUrl: "https://placehold.co/40x40/FF6600/FFFFFF?text=S", // Swiggy-like logo
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
  },
  {
    id: 4,
    jobTitle: "Full Stack Developer",
    companyName: "Amazon",
    location: "Onsite",
    jobType: "Full-time",
    salaryRange: "12LPA",
    jobDescription: "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized.",
    requirements: "Strong React, Node.js, MongoDB skills.",
    responsibilities: "Develop and maintain full-stack applications.",
    applicationDeadline: "2025-08-30T23:59:59Z",
    jobExperience: "1-3 yr Exp",
    imageUrl: "https://placehold.co/40x40/FF9900/FFFFFF?text=A", // Amazon-like logo
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(), // 36 hours ago
  },
  {
    id: 5,
    jobTitle: "Node Js Developer",
    companyName: "Tesla",
    location: "Onsite",
    jobType: "Full-time",
    salaryRange: "12LPA",
    jobDescription: "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized.",
    requirements: "Expertise in Node.js and Express.js.",
    responsibilities: "Build scalable backend APIs.",
    applicationDeadline: "2025-09-01T23:59:59Z",
    jobExperience: "1-3 yr Exp",
    imageUrl: "https://placehold.co/40x40/000000/FFFFFF?text=T", // Tesla-like logo
    createdAt: new Date(Date.now() - 60 * 60 * 60 * 1000).toISOString(), // 2.5 days ago
  },
  {
    id: 6,
    jobTitle: "UX/UI Designer",
    companyName: "Swiggy",
    location: "Onsite",
    jobType: "Full-time",
    salaryRange: "12LPA",
    jobDescription: "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized.",
    requirements: "Proficiency in Figma and user research.",
    responsibilities: "Create intuitive user interfaces.",
    applicationDeadline: "2025-08-25T23:59:59Z",
    jobExperience: "1-3 yr Exp",
    imageUrl: "https://placehold.co/40x40/FF6600/FFFFFF?text=S", // Swiggy-like logo
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },
  {
    id: 7,
    jobTitle: "Full Stack Developer",
    companyName: "Amazon",
    location: "Onsite",
    jobType: "Full-time",
    salaryRange: "12LPA",
    jobDescription: "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized.",
    requirements: "Strong React, Node.js, MongoDB skills.",
    responsibilities: "Develop and maintain full-stack applications.",
    applicationDeadline: "2025-08-30T23:59:59Z",
    jobExperience: "1-3 yr Exp",
    imageUrl: "https://placehold.co/40x40/FF9900/FFFFFF?text=A", // Amazon-like logo
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
  },
  {
    id: 8,
    jobTitle: "Node Js Developer",
    companyName: "Tesla",
    location: "Onsite",
    jobType: "Full-time",
    salaryRange: "12LPA",
    jobDescription: "A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized.",
    requirements: "Expertise in Node.js and Express.js.",
    responsibilities: "Build scalable backend APIs.",
    applicationDeadline: "2025-09-01T23:59:59Z",
    jobExperience: "1-3 yr Exp",
    imageUrl: "https://placehold.co/40x40/000000/FFFFFF?text=T", // Tesla-like logo
    createdAt: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(), // 15 hours ago
  },
];


  

function JobCardGrid() {

  const [appliedJobs, setAppliedJobs] = useState([]);

  const handleApply = (jobId) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs((prev) => [...prev, jobId]);
    }
  }

  const [selectedJob, setSelectedJob] = useState(null);

  const handleCardClick = (job) => {
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };


  return (
    <div className="flex justify-center p-4 sm:p-6 lg:p-8 font-inter">
      {/* Grid container */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {mockJobs.map((job) => {
        const isApplied = appliedJobs.includes(job.id);

        return (
          <div key={job.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between" onClick={() => handleCardClick(job)}>
            {/* Top section */}
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-white rounded-md shadow-md">
                <img
                  src={job.imageUrl}
                  alt={`${job.companyName} Logo`}
                  className="w-10 h-10 rounded-full"
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
                <span>{job.salaryRange}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-sm mb-4 line-clamp-3">
              {job.jobDescription}
              <span className="text-blue-500 cursor-pointer ml-1">more</span>
            </p>

            {/* Button */}
            <button
              onClick={() => handleApply(job.id)}
              disabled={isApplied}
              className={`${
                isApplied
                  ? "bg-green-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200`}
            >
              {isApplied ? "Applied" : "Apply Now"}
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
