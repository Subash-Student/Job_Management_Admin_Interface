import React, { useContext } from 'react'
import Navbar from './components/Navbar'
import JobFilterComponent from './components/JobFilterComponent'
import JobCardGrid from './components/JobCardGrid'
import { JobContext } from './context/JobContext'
import CreateJobModal from './components/CreateJobModal'
import Loader from './components/Loader'
import { ToastContainer, toast } from 'react-toastify'
const App = () => {

  const {showCreateJobModal,isLoading} = useContext(JobContext)
  
  return (
    
    <div className="h-screen bg-white dark:bg-blue-50">
      <ToastContainer />
    {isLoading && <Loader />}
    <div >
      <Navbar />
      <JobFilterComponent />
      <JobCardGrid />
      {showCreateJobModal && <CreateJobModal />}
    </div>
  </div>
      
    
  )
}

export default App