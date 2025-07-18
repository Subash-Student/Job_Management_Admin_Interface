
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { JobProvider } from './context/JobContext.jsx';
import './index.css'; 

createRoot(document.getElementById('root')).render(
  <>
    <JobProvider>
      <App />
    </JobProvider>
  </>,
)
