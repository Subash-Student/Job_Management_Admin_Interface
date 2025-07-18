import { useContext, useEffect, useState } from "react";
import { MapPin, Briefcase, Search, RotateCcw, SlidersHorizontal, X } from "lucide-react";
import * as Slider from "@radix-ui/react-slider";
import * as Select from "@radix-ui/react-select";
import * as Dialog from "@radix-ui/react-dialog";
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
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const { jobs, setJobs } = useContext(JobContext);

  const [localAllJobs, setLocalAllJobs] = useState([]);

  useEffect(() => {
    if (jobs.length && localAllJobs.length === 0) {
      setLocalAllJobs(jobs);
    }
  }, [jobs, localAllJobs]);

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
  }, [jobTitle, selectedLocation, selectedJobType, minSalary, maxSalary, localAllJobs, setJobs]);

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
    // Modal will close if opened, but reset can happen independently
  };

  return (
    <div className="flex w-full max-w-7xl mx-auto bg-white shadow-md rounded-md px-6 py-4 items-center justify-between flex-wrap gap-4">
      {/* Desktop View: Show all filters */}
      <div className="hidden md:flex flex-1 items-center pr-4 border-r border-gray-300 h-[48px]">
        <Search className="text-gray-500 mr-2 flex-shrink-0" size={20} />
        <input
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          type="text"
          placeholder="Search By Job Title, Role"
          className="w-full border-none outline-none placeholder-gray-500 text-sm bg-transparent"
        />
      </div>

      <div className="hidden md:flex flex-1 items-center pr-4 border-r border-gray-300 h-[48px]">
        <MapPin className="text-gray-500 flex-shrink-0 mr-3 ml-3" size={20} />
        <input
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          type="text"
          placeholder="Preferred Location"
          className="w-full border-none outline-none placeholder-gray-500 text-sm bg-transparent"
        />
      </div>

      <div className="hidden md:flex relative flex-1 pr-4 border-r border-gray-300 h-[48px]">
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
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" />
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

      <div className="hidden md:flex flex-col min-w-[220px] h-[48px] justify-center ml-4">
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

      {/* Reset button for desktop and always visible beside the filter button on mobile */}
      <div className="flex gap-3 ml-4">
        <button
          onClick={handleResetFilters}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold p-2 rounded-md shadow-sm transition-colors duration-200 flex items-center justify-center"
          aria-label="Reset Filters"
        >
          <RotateCcw size={18} />
         
        </button>
      </div>

      {/* Mobile View: Filter button - Centered and takes full width on small screens */}
      <div className="flex flex-1 md:hidden justify-center w-full"> {/* Added flex-1 and justify-center */}
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm flex items-center gap-2 w-full max-w-xs justify-center" // Added w-full max-w-xs justify-center
        >
          <SlidersHorizontal size={20} />
          Filter Jobs
        </button>
      </div>

      {/* Filter Modal for Mobile */}
      <Dialog.Root open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-40" />
          <Dialog.Content className="fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50 w-full max-w-md h-fit md:max-h-[90vh] overflow-y-auto"> {/* Changed h-fit */}
            <Dialog.Title className="text-xl font-bold mb-4 flex justify-between items-center">
              Filter Options
              <Dialog.Close asChild>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close"
                >
                  <X size={24} />
                </button>
              </Dialog.Close>
            </Dialog.Title>
            <div className="flex flex-col gap-4">
              {/* Job Title Input */}
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <Search className="text-gray-500 mr-2" size={20} />
                <input
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  type="text"
                  placeholder="Search By Job Title, Role"
                  className="w-full border-none outline-none placeholder-gray-500 text-sm bg-transparent"
                />
              </div>

              {/* Location Input */}
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <MapPin className="text-gray-500 mr-2" size={20} />
                <input
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  type="text"
                  placeholder="Preferred Location"
                  className="w-full border-none outline-none placeholder-gray-500 text-sm bg-transparent"
                />
              </div>

              {/* Job Type Select */}
              <div className="border border-gray-300 rounded-md p-2">
                <Select.Root value={selectedJobType} onValueChange={setSelectedJobType}>
                  <Select.Trigger className="flex w-full items-center justify-between text-sm text-gray-700 bg-transparent outline-none">
                    <div className="flex items-center">
                      <Briefcase className="text-gray-500 mr-2" size={20} />
                      <Select.Value placeholder="Job type">
                        {selectedJobType === 'default-job-type' ? 'Job type' : selectedJobType}
                      </Select.Value>
                    </div>
                    <Select.Icon className="ml-2">
                      <svg className="fill-current h-4 w-4 text-gray-400" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" />
                      </svg>
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="bg-white rounded-md shadow-lg py-1 z-50 w-[var(--radix-select-trigger-width)]">
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

              {/* Salary Slider */}
              <div className="flex flex-col mt-2">
                <span className="text-sm text-gray-700 mb-2">Salary Per Month</span>
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
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}