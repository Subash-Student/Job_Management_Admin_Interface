import React, { useContext } from 'react'
import Navbar from './components/Navbar'
import JobFilterComponent from './components/JobFilterComponent'
import JobCardGrid from './components/JobCardGrid'
import { JobContext } from './context/JobContext'
import CreateJobModal from './components/CreateJobModal'

const App = () => {

  const {showCreateJobModal} = useContext(JobContext)

  return (
    <div>
      <Navbar />
      <JobFilterComponent />
      <JobCardGrid />
      {showCreateJobModal && <CreateJobModal />}
    </div>
  )
}

export default App