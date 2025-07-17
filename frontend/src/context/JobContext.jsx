import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios'; // Import axios

const JobContext = createContext();

const API_BASE_URL = 'http://localhost:5000'; // IMPORTANT: Change this to your backend URL
const GET_JOBS_ENDPOINT = `${API_BASE_URL}/api/jobs`;
const CREATE_JOB_ENDPOINT = `${API_BASE_URL}/api/jobs/create`;

const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [jobsError, setJobsError] = useState(null);
  const [currentFilters, setCurrentFilters] = useState({}); // State to hold current filters

  const handleOpenCreateJobModal = () => {
    setShowCreateJobModal(true);
  };

  const handleCloseCreateJobModal = () => {
    setShowCreateJobModal(false);
  };

  // Function to fetch jobs from the backend API, now accepting filters
  const fetchJobs = useCallback(async (filters = {}) => {
    setIsLoadingJobs(true);
    setJobsError(null);
    try {
      // Construct query parameters from filters
      const queryParams = {};
      for (const key in filters) {
        // Only add if the filter has a value and is not a placeholder
        if (filters[key] && filters[key] !== 'default-location' && filters[key] !== 'default-job-type') {
          queryParams[key] = filters[key];
        }
      }

      // Use axios.get with params option for query parameters
      const response = await axios.get(GET_JOBS_ENDPOINT, {
        params: queryParams
      });

      setJobs(response.data.data); // Axios puts response data in .data property
    } catch (error) {
      console.error("Error fetching jobs:", error);
      // Axios errors have a response object with data and status
      if (error.response) {
        setJobsError(error.response.data.message || `HTTP error! status: ${error.response.status}`);
      } else {
        setJobsError(error.message || "Failed to load job listings.");
      }
    } finally {
      setIsLoadingJobs(false);
    }
  }, [GET_JOBS_ENDPOINT]); // Depend on GET_JOBS_ENDPOINT to be stable

  // Initial fetch when the component mounts or filters change
  useEffect(() => {
    fetchJobs(currentFilters); // Pass currentFilters to fetchJobs
  }, [fetchJobs, currentFilters]); // Re-run when fetchJobs or currentFilters change

  // Function to handle creating a new job posting
  const handleCreateJobSubmit = async (formData) => {
    try {
      setIsLoadingJobs(true); // Indicate loading for job creation
      setJobsError(null);

      const dataToSend = new FormData();

      // Append all form fields to FormData
      for (const key in formData) {
        if (key == 'companyLogo' && formData[key] ) {
          dataToSend.append('image', formData[key]); // Backend expects 'image' field for file
        } else if (key !== 'companyLogo') {
          dataToSend.append(key, formData[key]);
        }
      }

      // Use axios.post for creating job, FormData handles content-type automatically
      const response = await axios.post(CREATE_JOB_ENDPOINT, dataToSend);

      console.log("New Job Created:", response.data); // Axios response data is in .data

      // Re-fetch all jobs to update the list, ensuring consistency
      await fetchJobs(currentFilters); // Re-fetch with current filters

      setShowCreateJobModal(false); // Close modal on success
    } catch (e) {
      console.error("Error creating job: ", e);
      // Axios errors have a response object with data and status
      if (e.response) {
        setJobsError(e.response.data.message || `HTTP error! status: ${e.response.status}`);
      } else {
        setJobsError(e.message || "Failed to create job. Please try again.");
      }
    } finally {
      setIsLoadingJobs(false); // Hide loading
    }
  };

  // Function to apply filters from JobFilterBar
  const triggerJobFetch = (filters) => {
    setCurrentFilters(filters);
  };

  const values = {
    jobs,
    showCreateJobModal,
    handleOpenCreateJobModal,
    handleCloseCreateJobModal,
    isLoadingJobs,
    jobsError,
    handleCreateJobSubmit,
    triggerJobFetch, 
  };

  return (
    <JobContext.Provider value={values}>
      {children}
    </JobContext.Provider>
  );
};

export { JobContext, JobProvider };
