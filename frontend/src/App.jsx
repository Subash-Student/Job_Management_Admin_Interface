import React from 'react'
import Navbar from './components/Navbar'
import JobFilterComponent from './components/JobFilterComponent'
import JobCardGrid from './components/JobCardGrid'

const App = () => {
  return (
    <div>
      <Navbar />
      <JobFilterComponent />
      <JobCardGrid />
    </div>
  )
}

export default App