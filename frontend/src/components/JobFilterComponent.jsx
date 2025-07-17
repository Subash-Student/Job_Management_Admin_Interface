import { useContext, useState } from "react";
import { MapPin, Briefcase, Search, Filter } from "lucide-react"; // Import Filter icon, changed Speech to Briefcase
import * as Slider from "@radix-ui/react-slider";
import * as Select from '@radix-ui/react-select';
import { JobContext } from "../context/JobContext";


export default function JobFilterBar() {
  const [minSalary, setMinSalary] = useState(10);
  const [maxSalary, setMaxSalary] = useState(200);
  const [selectedLocation, setSelectedLocation] = useState('default-location');
  const [selectedJobType, setSelectedJobType] = useState('default-job-type');
  const [jobTitle, setJobTitle] = useState("");

  const { triggerJobFetch } = useContext(JobContext);

  const handleSalaryChange = ([min, max]) => {
    setMinSalary(min);
    setMaxSalary(max);
  };

  // Function to apply filters when the button is clicked
  const applyFilters = () => {
    const filters = {
      jobTitle: jobTitle,
      location: selectedLocation,
      jobType: selectedJobType,
      minSalary: minSalary, // Pass min salary from state
      maxSalary: maxSalary, // Pass max salary from state
    };
    triggerJobFetch(filters); // Call the context function to fetch jobs with filters
  };

  return (
    <div className="flex w-full max-w-7xl mx-auto bg-white shadow-md rounded-md px-6 py-4 items-center justify-between flex-wrap gap-4"> {/* Added flex-wrap and gap */}
      {/* Search Input */}
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

      {/* Location Dropdown - Using Radix UI Select */}
      <div className="relative flex-1 min-w-[180px] pr-4 border-r border-gray-300 h-[48px]">
        <Select.Root value={selectedLocation} onValueChange={setSelectedLocation}>
          <Select.Trigger className="flex w-full items-center justify-between text-sm text-gray-700 bg-transparent outline-none appearance-none h-full">
            <div className="flex items-center">
              <MapPin className="text-gray-500 flex-shrink-0 mr-3 ml-3" size={20} />
              <Select.Value placeholder="Preferred Location">
                {selectedLocation === 'default-location' ? 'Preferred Location' : selectedLocation}
              </Select.Value>
            </div>
            <Select.Icon className="ml-2 flex-shrink-0">
              <svg className="fill-current h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
              </svg>
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="bg-white rounded-md shadow-lg py-1 z-50 min-w-[var(--radix-select-trigger-width)]">
              <Select.Viewport className="p-1">
                <Select.Item value="default-location" className="text-sm text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer outline-none data-[highlighted]:bg-gray-100">
                  <Select.ItemText>Preferred Location</Select.ItemText>
                </Select.Item>
                <Select.Item value="Bangalore" className="text-sm text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer outline-none data-[highlighted]:bg-gray-100">
                  <Select.ItemText>Bangalore</Select.ItemText>
                </Select.Item>
                <Select.Item value="Chennai" className="text-sm text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer outline-none data-[highlighted]:bg-gray-100">
                  <Select.ItemText>Chennai</Select.ItemText>
                </Select.Item>
                <Select.Item value="Remote" className="text-sm text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer outline-none data-[highlighted]:bg-gray-100">
                  <Select.ItemText>Remote</Select.ItemText>
                </Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      {/* Job Type Dropdown - Using Radix UI Select */}
      <div className="relative flex-1 min-w-[150px] pr-4 border-r border-gray-300 h-[48px]">
        <Select.Root value={selectedJobType} onValueChange={setSelectedJobType}>
          <Select.Trigger className="flex w-full items-center justify-between text-sm text-gray-700 bg-transparent outline-none appearance-none h-full">
            <div className="flex items-center">
              <Briefcase className="text-gray-500 flex-shrink-0 mr-3 ml-3" size={20} />
              <Select.Value placeholder="Job type">
                {selectedJobType === 'default-job-type' ? 'Job type' : selectedJobType}
              </Select.Value>
            </div>
            <Select.Icon className="ml-2 flex-shrink-0">
              <svg className="fill-current h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
              </svg>
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="bg-white rounded-md shadow-lg py-1 z-50 min-w-[var(--radix-select-trigger-width)]">
              <Select.Viewport className="p-1">
                <Select.Item value="default-job-type" className="text-sm text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer outline-none data-[highlighted]:bg-gray-100">
                  <Select.ItemText>Job type</Select.ItemText>
                </Select.Item>
                <Select.Item value="Full-time" className="text-sm text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer outline-none data-[highlighted]:bg-gray-100">
                  <Select.ItemText>Full-time</Select.ItemText>
                </Select.Item>
                <Select.Item value="Internship" className="text-sm text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer outline-none data-[highlighted]:bg-gray-100">
                  <Select.ItemText>Internship</Select.ItemText>
                </Select.Item>
                <Select.Item value="Freelance" className="text-sm text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer outline-none data-[highlighted]:bg-gray-100">
                  <Select.ItemText>Freelance</Select.ItemText>
                </Select.Item>
                <Select.Item value="Contract" className="text-sm text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer outline-none data-[highlighted]:bg-gray-100">
                  <Select.ItemText>Contract</Select.ItemText>
                </Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      {/* Salary Range Slider */}
      <div className="flex flex-col min-w-[220px] h-[48px] justify-center ml-4">
        <span className="text-sm text-gray-700 mb-1">Salary Per Month</span>
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          min={0}
          max={200}
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

      {/* Filter Button */}
      <button
        onClick={applyFilters}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md shadow-md transition-colors duration-200 flex items-center justify-center ml-4"
      >
        <Filter size={18} className="mr-2" /> {/* Filter icon */}
        Filter
      </button>
    </div>
  );
}
