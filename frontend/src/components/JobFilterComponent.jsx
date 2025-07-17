import { useState } from "react";
import { MapPin, Speech, Search } from "lucide-react";
import * as Slider from "@radix-ui/react-slider";
// Import Radix UI Select components
import * as Select from '@radix-ui/react-select';

export default function JobFilterBar() {
  const [salaryRange, setSalaryRange] = useState([50, 80]);
  const [selectedLocation, setSelectedLocation] = useState('default-location');
  const [selectedJobType, setSelectedJobType] = useState('default-job-type');

  return (
    <div className="flex w-full max-w-7xl mx-auto bg-white shadow-md rounded-md px-6 py-4 items-center justify-between"> {/* Adjusted px and py for overall padding */}
      {/* Search Input */}
      {/* Adjusted padding and flex-shrink to control spacing */}
      <div className="flex items-center flex-1 pr-6 border-r border-gray-300 h-[48px]">
        <Search className="text-gray-500 mr-2 flex-shrink-0" size={20} /> {/* Added mr-2 */}
        <input
          type="text"
          placeholder="Search By Job Title, Role"
          className="w-full border-none outline-none placeholder-gray-500 text-sm bg-transparent"
        />
      </div>

      {/* Location Dropdown - Using Radix UI Select */}
      {/* Adjusted padding and flex-shrink */}
      <div className="relative flex-1 pr-6 border-r border-gray-300 h-[48px]">
        <Select.Root value={selectedLocation} onValueChange={setSelectedLocation}>
          <Select.Trigger className="flex w-full items-center justify-between text-sm text-gray-700 bg-transparent outline-none appearance-none h-full"> {/* Removed pl-2, pr-2 from here */}
            <div className="flex items-center"> {/* This div now controls the spacing between icon and text */}
              <MapPin className="text-gray-500 flex-shrink-0 mr-3 ml-3" size={20} /> {/* Added mr-2 */}
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
                <Select.Item value="bangalore" className="text-sm text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer outline-none data-[highlighted]:bg-gray-100">
                  <Select.ItemText>Bangalore</Select.ItemText>
                </Select.Item>
                <Select.Item value="chennai" className="text-sm text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer outline-none data-[highlighted]:bg-gray-100">
                  <Select.ItemText>Chennai</Select.ItemText>
                </Select.Item>
                <Select.Item value="remote" className="text-sm text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer outline-none data-[highlighted]:bg-gray-100">
                  <Select.ItemText>Remote</Select.ItemText>
                </Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      {/* Job Type Dropdown - Using Radix UI Select */}
      {/* Adjusted padding and flex-shrink */}
      <div className="relative flex-1 pr-6 border-r border-gray-300 h-[48px]">
        <Select.Root value={selectedJobType} onValueChange={setSelectedJobType}>
          <Select.Trigger className="flex w-full items-center justify-between text-sm text-gray-700 bg-transparent outline-none appearance-none h-full"> {/* Removed pl-2, pr-2 from here */}
            <div className="flex items-center"> {/* This div now controls the spacing between icon and text */}
            <img
                  src="speech.png" // Placeholder for salary.png
                  alt="Salary Icon"
                  className="mr-3 ml-3 text-gray-500"
                  width="36"
                  height="16"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/16x16/cccccc/000000?text=S"; }}
                />
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
                <Select.Item value="fulltime" className="text-sm text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer outline-none data-[highlighted]:bg-gray-100">
                  <Select.ItemText>Full-time</Select.ItemText>
                </Select.Item>
                <Select.Item value="intern" className="text-sm text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer outline-none data-[highlighted]:bg-gray-100">
                  <Select.ItemText>Internship</Select.ItemText>
                </Select.Item>
                <Select.Item value="freelance" className="text-sm text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer outline-none data-[highlighted]:bg-gray-100">
                  <Select.ItemText>Freelance</Select.ItemText>
                </Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      {/* Salary Range Slider */}
      {/* Adjusted ml-10 to ml-4 for closer proximity to the previous field */}
      <div className="flex flex-col min-w-[220px] h-[48px] justify-center ml-4">
        <span className="text-sm text-gray-700 mb-1">Salary Per Month</span>
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          min={0}
          max={200}
          step={10}
          value={salaryRange}
          onValueChange={setSalaryRange}
        >
          <Slider.Track className="bg-gray-300 relative grow rounded-full h-[2px]">
            <Slider.Range className="absolute bg-black rounded-full h-full" />
          </Slider.Track>
          {salaryRange.map((_, i) => (
            <Slider.Thumb
              key={i}
              className="block w-4 h-4 bg-black rounded-full shadow-sm focus:outline-none"
            />
          ))}
        </Slider.Root>
        <div className="text-xs text-gray-500 mt-1">
          ₹{salaryRange[0]}k - ₹{salaryRange[1]}k
        </div>
      </div>
    </div>
  );
}
