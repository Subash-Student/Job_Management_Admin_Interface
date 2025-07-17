import React, { createContext, useState } from 'react';


const JobContext = createContext();


const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]); 
    const [showCreateJobModal, setShowCreateJobModal] = useState(false);

    const handleOpenCreateJobModal = () => {
        setShowCreateJobModal(true);
      };
      
      const handleCloseCreateJobModal = () => {
        setShowCreateJobModal(false);
      };




    const values = {
        jobs, 
        setJobs,
        showCreateJobModal, 
        setShowCreateJobModal,
        handleOpenCreateJobModal,
        handleCloseCreateJobModal
    }

    return (
        <JobContext.Provider value={values}>
            {children}
        </JobContext.Provider>
    );
};

export { JobContext, JobProvider };