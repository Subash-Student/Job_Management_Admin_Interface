import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as Select from '@radix-ui/react-select'; // For custom dropdowns
import { Calendar } from 'lucide-react'; // For the calendar icon in date picker
import { JobContext } from '../context/JobContext';

const CreateJobModal = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();

  const {handleCloseCreateJobModal} = useContext(JobContext);

  // Watch for changes in jobType and location for Radix Select
  const jobType = watch('jobType', 'placeholder-job-type');
  const location = watch('location', 'placeholder-location');

  // Function to handle form submission
  const handleFormSubmit = (data) => {
    // Convert salary range strings to numbers if needed for backend
    const formattedData = {
      ...data,
      minSalary: parseFloat(data.minSalary.replace(/[^0-9.-]+/g,"")), // Remove non-numeric chars
      maxSalary: parseFloat(data.maxSalary.replace(/[^0-9.-]+/g,"")),
      minExperience: parseFloat(data.minExperience), // Convert to number
      maxExperience: parseFloat(data.maxExperience), // Convert to number
      // Note: For file upload, data.companyLogo will be a FileList object.
      // You'll typically send this via FormData in a real API call.
    };
    console.log("Form Data:", formattedData);
    // Pass data to parent component (e.g., Navbar or App)
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4 font-inter">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-8 relative overflow-y-auto max-h-[90vh] scrollbar-hide">

        {/* Close Button */}
        <button
          onClick={handleCloseCreateJobModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Job Opening</h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          {/* Job Title */}
          <div>
            <label htmlFor="jobTitle" className="block text-gray-700 text-sm font-medium mb-1">Job Title</label>
            <input
              type="text"
              id="jobTitle"
              {...register("jobTitle", { required: "Job Title is required" })}
              placeholder="Full Stack Developer"
              className="w-full border border-gray-300 rounded-md p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.jobTitle && <p className="text-red-500 text-xs mt-1">{errors.jobTitle.message}</p>}
          </div>

          {/* Company Name */}
          <div>
            <label htmlFor="companyName" className="block text-gray-700 text-sm font-medium mb-1">Company Name</label>
            <input
              type="text"
              id="companyName"
              {...register("companyName", { required: "Company Name is required" })}
              placeholder="Amazon, Microsoft, Swiggy"
              className="w-full border border-gray-300 rounded-md p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}
          </div>

          {/* Location Dropdown */}
          <div>
            <label htmlFor="location" className="block text-gray-700 text-sm font-medium mb-1">Location</label>
            <Select.Root value={location} onValueChange={(value) => setValue('location', value)}>
              <Select.Trigger className="flex w-full items-center justify-between text-sm text-gray-700 border border-gray-300 rounded-md p-3 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <Select.Value placeholder="Choose Preferred Location">
                  {/* Display placeholder text if the value is the placeholder value */}
                  {location === 'placeholder-location' ? 'Choose Preferred Location' : location}
                </Select.Value>
                <Select.Icon className="ml-2">
                  <svg className="fill-current h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
                  </svg>
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="bg-white rounded-md shadow-lg py-1 z-50 min-w-[var(--radix-select-trigger-width)]">
                  <Select.Viewport className="p-1">
                    <Select.Item value="placeholder-location" className="text-sm text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer outline-none data-[highlighted]:bg-gray-100">
                      <Select.ItemText>Choose Preferred Location</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="Onsite" className="text-sm text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer outline-none data-[highlighted]:bg-gray-100">
                      <Select.ItemText>Onsite</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="Remote" className="text-sm text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer outline-none data-[highlighted]:bg-gray-100">
                      <Select.ItemText>Remote</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="Hybrid" className="text-sm text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer outline-none data-[highlighted]:bg-gray-100">
                      <Select.ItemText>Hybrid</Select.ItemText>
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
            <input type="hidden" {...register("location", { required: "Location is required" })} /> {/* Hidden input for react-hook-form validation */}
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
          </div>

          {/* Job Type Dropdown */}
          <div>
            <label htmlFor="jobType" className="block text-gray-700 text-sm font-medium mb-1">Job Type</label>
            <Select.Root value={jobType} onValueChange={(value) => setValue('jobType', value)}>
              <Select.Trigger className="flex w-full items-center justify-between text-sm text-gray-700 border border-gray-300 rounded-md p-3 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <Select.Value placeholder="Full-time">
                  {/* Display placeholder text if the value is the placeholder value */}
                  {jobType === 'placeholder-job-type' ? 'Full-time' : jobType}
                </Select.Value>
                <Select.Icon className="ml-2">
                  <svg className="fill-current h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
                  </svg>
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="bg-white rounded-md shadow-lg py-1 z-50 min-w-[var(--radix-select-trigger-width)]">
                  <Select.Viewport className="p-1">
                    <Select.Item value="placeholder-job-type" className="text-sm text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer outline-none data-[highlighted]:bg-gray-100">
                      <Select.ItemText>Full-time</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="Part-time" className="text-sm text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer outline-none data-[highlighted]:bg-gray-100">
                      <Select.ItemText>Part-time</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="Contract" className="text-sm text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer outline-none data-[highlighted]:bg-gray-100">
                      <Select.ItemText>Contract</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="Internship" className="text-sm text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer outline-none data-[highlighted]:bg-gray-100">
                      <Select.ItemText>Internship</Select.ItemText>
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
            <input type="hidden" {...register("jobType", { required: "Job Type is required" })} /> {/* Hidden input for react-hook-form validation */}
            {errors.jobType && <p className="text-red-500 text-xs mt-1">{errors.jobType.message}</p>}
          </div>

          {/* Salary Range (Min & Max) */}
          <div className="flex gap-4"> {/* Use flex and gap for half-half sizing */}
            <div className="flex-1"> {/* flex-1 makes it take half available space */}
              <label htmlFor="minSalary" className="block text-gray-700 text-sm font-medium mb-1">Min Salary</label>
              <div className="flex items-center border border-gray-300 rounded-md p-3 text-gray-800 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                <span className="text-gray-500 mr-2">₹</span>
                <input
                  type="text"
                  id="minSalary"
                  {...register("minSalary", { required: "Min Salary is required" })}
                  placeholder="₹0"
                  className="w-full border-none outline-none bg-transparent"
                />
              </div>
              {errors.minSalary && <p className="text-red-500 text-xs mt-1">{errors.minSalary.message}</p>}
            </div>
            <div className="flex-1"> {/* flex-1 makes it take half available space */}
              <label htmlFor="maxSalary" className="block text-gray-700 text-sm font-medium mb-1">Max Salary</label>
              <div className="flex items-center border border-gray-300 rounded-md p-3 text-gray-800 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                <span className="text-gray-500 mr-2">₹</span>
                <input
                  type="text"
                  id="maxSalary"
                  {...register("maxSalary", { required: "Max Salary is required" })}
                  placeholder="₹12,00,000"
                  className="w-full border-none outline-none bg-transparent"
                />
              </div>
              {errors.maxSalary && <p className="text-red-500 text-xs mt-1">{errors.maxSalary.message}</p>}
            </div>
          </div>
<div className="flex gap-4"> {/* Use flex and gap for half-half sizing */}
            <div className="flex-1"> {/* flex-1 makes it take half available space */}
              <label htmlFor="minExperience" className="block text-gray-700 text-sm font-medium mb-1">Min Experience (Years)</label>
              <input
                type="number"
                id="minExperience"
                {...register("minExperience", { required: "Min Experience is required", min: 0 })}
                placeholder="0"
                className="w-full border border-gray-300 rounded-md p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.minExperience && <p className="text-red-500 text-xs mt-1">{errors.minExperience.message}</p>}
            </div>
            <div className="flex-1"> {/* flex-1 makes it take half available space */}
              <label htmlFor="maxExperience" className="block text-gray-700 text-sm font-medium mb-1">Max Experience (Years)</label>
              <input
                type="number"
                id="maxExperience"
                {...register("maxExperience", { required: "Max Experience is required", min: 0 })}
                placeholder="5"
                className="w-full border border-gray-300 rounded-md p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.maxExperience && <p className="text-red-500 text-xs mt-1">{errors.maxExperience.message}</p>}
            </div>
          </div>
          {/* Application Deadline */}
          <div>
            <label htmlFor="applicationDeadline" className="block text-gray-700 text-sm font-medium mb-1">Application Deadline</label>
            <div className="relative flex items-center">
              <input
                type="date"
                id="applicationDeadline"
                {...register("applicationDeadline", { required: "Application Deadline is required" })}
                className="w-full border border-gray-300 rounded-md p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              />
              <Calendar className="absolute right-3 text-gray-500 pointer-events-none" size={20} />
            </div>
            {errors.applicationDeadline && <p className="text-red-500 text-xs mt-1">{errors.applicationDeadline.message}</p>}
          </div>

          {/* Company Logo Input (File Upload) - Placed next to Application Deadline */}
          <div>
            <label htmlFor="companyLogo" className="block text-gray-700 text-sm font-medium mb-1">Company Logo</label>
            <input
              type="file"
              id="companyLogo"
              {...register("companyLogo", { required: "Company Logo is required" })}
              accept="image/*" // Only accept image files
              className="w-full border border-gray-300 rounded-md p-2 text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {errors.companyLogo && <p className="text-red-500 text-xs mt-1">{errors.companyLogo.message}</p>}
          </div>

          {/* Job Experience (Min & Max) */}
          

          {/* Job Description */}
          <div className="sm:col-span-2"> {/* Span full width on small screens and up */}
            <label htmlFor="jobDescription" className="block text-gray-700 text-sm font-medium mb-1">Job Description</label>
            <textarea
              id="jobDescription"
              {...register("jobDescription", { required: "Job Description is required" })}
              placeholder="Please share a description to let the candidate know more about the job role"
              rows="4"
              className="w-full border border-gray-300 rounded-md p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
            ></textarea>
            {errors.jobDescription && <p className="text-red-500 text-xs mt-1">{errors.jobDescription.message}</p>}
          </div>

          {/* Requirements */}
          <div className="sm:col-span-2"> {/* Span full width */}
            <label htmlFor="requirements" className="block text-gray-700 text-sm font-medium mb-1">Requirements</label>
            <textarea
              id="requirements"
              {...register("requirements", { required: "Requirements are required" })}
              rows="4"
              className="w-full border border-gray-300 rounded-md p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
            ></textarea>
            {errors.requirements && <p className="text-red-500 text-xs mt-1">{errors.requirements.message}</p>}
          </div>

          {/* Responsibilities */}
          <div className="sm:col-span-2"> {/* Span full width */}
            <label htmlFor="responsibilities" className="block text-gray-700 text-sm font-medium mb-1">Responsibilities</label>
            <textarea
              id="responsibilities"
              {...register("responsibilities", { required: "Responsibilities are required" })}
              rows="4"
              className="w-full border border-gray-300 rounded-md p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
            ></textarea>
            {errors.responsibilities && <p className="text-red-500 text-xs mt-1">{errors.responsibilities.message}</p>}
          </div>

          {/* Action Buttons */}
          <div className="sm:col-span-2 flex justify-between items-center mt-6">
            <button
              type="button" // Use type="button" to prevent form submission
              onClick={handleCloseCreateJobModal}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-200 flex items-center"
            >
              Save Draft
              <img
                src="downward.png" // Placeholder for arrow icon
                alt="Arrow Icon"
                className="ml-2"
                width="16"
                height="16"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/16x16/cccccc/000000?text=->"; }}
              />
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-200 flex items-center"
            >
              Publish
              <img
                src="forward.png" // Placeholder for arrow icon
                alt="Arrow Icon"
                className="ml-2"
                width="16"
                height="16"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/16x16/ffffff/000000?text=->"; }}
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobModal;
