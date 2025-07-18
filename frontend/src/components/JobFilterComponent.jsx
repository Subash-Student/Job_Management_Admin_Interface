import { useContext, useEffect, useState } from "react";
import { MapPin, Briefcase, Search, RotateCcw } from "lucide-react";
import * as Slider from "@radix-ui/react-slider";
import * as Select from "@radix-ui/react-select";
import { JobContext } from "../context/JobContext";

/**
 * Filter logic
 */
function applyFilter(jobs, filters) {
  const {
    jobTitle = '',
    location = '',
    jobType = '',
    minSalary = '',
    maxSalary = ''
  } = filters;

  const normalize = (str) => str?.toString().trim().toLowerCase();
  const normalizedJobTitle = normalize(jobTitle);
  const normalizedLocation = normalize(location);
  const normalizedJobType = normalize(jobType);

  const minS = parseInt(minSalary);
  const maxS = parseInt(maxSalary);

  return jobs.filter((job) => {
    const jobTitleNorm = normalize(job.jobTitle);
    const locationNorm = normalize(job.location);
    const jobTypeNorm = normalize(job.jobType);

    let match = true;

    if (normalizedJobTitle && !jobTitleNorm.includes(normalizedJobTitle)) {
      match = false;
    }

    if (normalizedLocation && !locationNorm.includes(normalizedLocation)) {
      match = false;
    }

    if (normalizedJobType && normalizedJobType !== 'default-job-type' && jobTypeNorm !== normalizedJobType) {
      match = false;
    }

    if ((minSalary || maxSalary) && job.minSalary && job.maxSalary) {
      if (minSalary && job.maxSalary < minS) match = false;
      if (maxSalary && job.minSalary > maxS) match = false;
    }

    return match;
  });
}

export default function JobFilterBar() {
  const initialMinSalary = 150;
  const initialMaxSalary = 2000;
  const initialSelectedLocation = '';
  const initialSelectedJobType = 'default-job-type';
  const initialJobTitle = "";

  const [jobTitle, setJobTitle] = useState(initialJobTitle);
  const [selectedLocation, setSelectedLocation] = useState(initialSelectedLocation);
  const [selectedJobType, setSelectedJobType] = useState(initialSelectedJobType);
  const [minSalary, setMinSalary] = useState(initialMinSalary);
  const [maxSalary, setMaxSalary] = useState(initialMaxSalary);

  const { jobs, setJobs } = useContext(JobContext);

  
  const [localAllJobs, setLocalAllJobs] = useState([]);

  useEffect(() => {
    if (jobs.length && localAllJobs.length === 0) {
      setLocalAllJobs(jobs);
    }
  }, [jobs]);

 
  useEffect(() => {
    if (!localAllJobs.length) return;

    const filters = {
      jobTitle,
      location: selectedLocation,
      jobType: selectedJobType,
      minSalary: minSalary * 1000,
      maxSalary: maxSalary * 1000,
    };

    const filtered = applyFilter(localAllJobs, filters);
    setJobs(filtered);
  }, [jobTitle, selectedLocation, selectedJobType, minSalary, maxSalary, localAllJobs]);

  const handleSalaryChange = ([min, max]) => {
    setMinSalary(min);
    setMaxSalary(max);
  };

 
  const handleResetFilters = () => {
    setJobTitle(initialJobTitle);
    setSelectedLocation(initialSelectedLocation);
    setSelectedJobType(initialSelectedJobType);
    setMinSalary(initialMinSalary);
    setMaxSalary(initialMaxSalary);
    setJobs(localAllJobs); 
  };

  return (
    <div className="flex w-full max-w-7xl mx-auto bg-white shadow-md rounded-md px-6 py-4 items-center justify-between flex-wrap gap-4">
      
   
      <div className="flex items-center flex-1 min-w-[200px] pr-4 border-r border-gray-300 h-[48px]">
        <Search className="text-gray-500 mr-2 flex-shrink-0" size={20} />
        <input
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          type="text"
          placeholder="Search By Job Title, Role"
          className="w-full border-none outline-none placeholder-gray-500 text-sm bg-transparent"
        />
      </div>

     
      <div className="flex items-center flex-1 min-w-[180px] pr-4 border-r border-gray-300 h-[48px]">
        <MapPin className="text-gray-500 flex-shrink-0 mr-3 ml-3" size={20} />
        <input
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          type="text"
          placeholder="Preferred Location"
          className="w-full border-none outline-none placeholder-gray-500 text-sm bg-transparent"
        />
      </div>

      
      <div className="relative flex-1 min-w-[150px] pr-4 border-r border-gray-300 h-[48px]">
        <Select.Root value={selectedJobType} onValueChange={setSelectedJobType}>
          <Select.Trigger className="flex w-full items-center justify-between text-sm text-gray-700 bg-transparent outline-none h-full">
            <div className="flex items-center">
              <Briefcase className="text-gray-500 flex-shrink-0 mr-3 ml-3" size={20} />
              <Select.Value placeholder="Job type">
                {selectedJobType === 'default-job-type' ? 'Job type' : selectedJobType}
              </Select.Value>
            </div>
            <Select.Icon className="ml-2 flex-shrink-0">
              <svg className="fill-current h-4 w-4 text-gray-400" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
              </svg>
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="bg-white rounded-md shadow-lg py-1 z-50 min-w-[var(--radix-select-trigger-width)]">
              <Select.Viewport className="p-1">
                {["default-job-type", "Full-time", "Internship", "Freelance", "Contract"].map((type) => (
                  <Select.Item
                    key={type}
                    value={type}
                    className="text-sm text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
                  >
                    <Select.ItemText>{type === "default-job-type" ? "Job type" : type}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

   
      <div className="flex flex-col min-w-[220px] h-[48px] justify-center ml-4">
        <span className="text-sm text-gray-700 mb-1">Salary Per Month</span>
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          min={100}
          max={2000}
          step={10}
          value={[minSalary, maxSalary]}
          onValueChange={handleSalaryChange}
        >
          <Slider.Track className="bg-gray-300 relative grow rounded-full h-[2px]">
            <Slider.Range className="absolute bg-black rounded-full h-full" />
          </Slider.Track>
          {[minSalary, maxSalary].map((_, i) => (
            <Slider.Thumb
              key={i}
              className="block w-4 h-4 bg-black rounded-full shadow-sm focus:outline-none"
            />
          ))}
        </Slider.Root>
        <div className="text-xs text-gray-500 mt-1">
          ₹{minSalary}k - ₹{maxSalary}k
        </div>
      </div>

      
      <div className="flex gap-3 ml-4">
        <button
          onClick={handleResetFilters}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold p-2 rounded-md shadow-sm transition-colors duration-200 flex items-center justify-center"
          aria-label="Reset Filters"
        >
          <RotateCcw size={18} />
        </button>
      </div>
    </div>
  );
}
