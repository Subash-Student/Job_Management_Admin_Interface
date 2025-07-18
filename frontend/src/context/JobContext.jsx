import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {toast} from "react-toastify"

const JobContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_URL;
const GET_JOBS_ENDPOINT = `${API_BASE_URL}/api/jobs`;
const CREATE_JOB_ENDPOINT = `${API_BASE_URL}/api/jobs/create`;

const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const [isLoading, setIsloading] = useState(true);
 

  const handleOpenCreateJobModal = () => {
    setShowCreateJobModal(true);
  };

  const handleCloseCreateJobModal = () => {
    setShowCreateJobModal(false);
  };

  const fetchJobs = useCallback(async () => {
    setIsloading(true);
    
    try {
      const response = await axios.get(GET_JOBS_ENDPOINT);
      if(response.data.success){
        setJobs(response.data.data);
      }else{
        toast.error(response.message)
      }
    } catch (error) {
      toast.error("Error fetching jobs")
      console.error("Error fetching jobs:", error);
      if (error.response) {
        toast.error(error.response.data.message || `HTTP error! status: ${error.response.status}`);
      } else {
        toast.error(error.message || "Failed to load job listings.");
      }
    } finally {
      setIsloading(false);
    }
  }, [GET_JOBS_ENDPOINT]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs,]);




  const handleCreateJobSubmit = async (formData) => {
    try {
      setIsloading(true);
      
      const dataToSend = new FormData();

      for (const key in formData) {
        if (key == 'companyLogo' && formData[key] ) {
          dataToSend.append('image', formData[key]);
        } else if (key !== 'companyLogo') {
          dataToSend.append(key, formData[key]);
        }
      }

      const response = await axios.post(CREATE_JOB_ENDPOINT, dataToSend);
     
      if(response.success){
        await fetchJobs();
        setShowCreateJobModal(false);
        toast.success(response.data.message)
      }else{
        toast.error(response.data.message)
      }
      
    } catch (e) {
      console.error("Error creating job: ", e);
      if (e.response) {
        toast.error(e.response.data.message || `HTTP error! status: ${e.response.status}`);
      } else {
        toast.error(e.message || "Failed to create job. Please try again.");
      }
    } finally {
      setIsloading(false);
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
        const formatSingle = (amount) =>
          amount >= 100000
            ? `${(amount / 100000).toFixed(1)} LPA`
            : amount >= 1000
            ? `${Math.round(amount / 1000)}K`
            : `₹${amount}`;
        return `${formatSingle(minSalaryRaw)} - ${formatSingle(maxSalaryRaw)}`;
      }
    };


  const values = {
    jobs,
    setJobs,
    showCreateJobModal,
    handleOpenCreateJobModal,
    handleCloseCreateJobModal,
    isLoading,
    handleCreateJobSubmit, 
    formatSalaryRange
  };

  return (
    <JobContext.Provider value={values}>
      {children}
    </JobContext.Provider>
  );
};

export { JobContext, JobProvider };