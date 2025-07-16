import JobModel from "../model/JobModel";


export const createJob = async (req, res) => {
    try {
        // Create a new job instance with data from the request body
        const job = await JobModel.create(req.body);
        // Respond with the created job and a 201 (Created) status
        res.status(201).json({
            success: true,
            data: job
        });
    } catch (error) {
        // Handle validation errors or other server errors
        console.error(error);
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to create job posting'
        });
    }
};


export const getJobs = async (req, res) => {
    try {
        // Initialize an empty query object
        const query = {};

        // Destructure query parameters for filtering
        const { jobTitle, location, jobType, minSalary, maxSalary } = req.query;

        // Apply filters if they exist
        if (jobTitle) {
            // Case-insensitive search for job title
            query.jobTitle = { $regex: jobTitle, $options: 'i' };
        }
        if (location) {
            // Case-insensitive search for location
            query.location = { $regex: location, $options: 'i' };
        }
        if (jobType) {
            // Exact match for job type
            query.jobType = jobType;
        }

        // Handle salary range filtering
        // This assumes salaryRange in the DB is a string like "50000 - 70000"
        // For more robust filtering, consider storing salary as min/max numbers
        if (minSalary || maxSalary) {
            // This is a simplified approach. A more robust solution would parse
            // the salaryRange string in the database into numeric values for comparison.
            // For now, we'll do a basic regex search if min/max are provided,
            // which might not be perfectly accurate for numerical range queries.
            // A better approach would be to store minSalary and maxSalary as separate
            // Number fields in the Job model.
            query.salaryRange = { $exists: true }; // Ensure salaryRange field exists
            if (minSalary) {
                // This regex attempts to find salary ranges that start with at least minSalary
                // This is a very basic example and might need refinement based on your exact salary string format.
                // For example, if salaryRange is "50,000 - 70,000", this regex might not work as expected.
                // It's highly recommended to store salary as two separate number fields: minSalary and maxSalary.
                query.salaryRange.$regex = `^${minSalary}|${minSalary}\\s*-`; // Matches start or after a hyphen
                query.salaryRange.$options = 'i';
            }
            if (maxSalary) {
                // Similar basic regex for maxSalary
                if (query.salaryRange.$regex) {
                    query.salaryRange.$regex += `|-${maxSalary}$`; // Matches end or before a hyphen
                } else {
                    query.salaryRange.$regex = `-${maxSalary}$`;
                }
                query.salaryRange.$options = 'i';
            }
        }


        // Find jobs based on the constructed query
        // Sort by creation date, newest first
        const jobs = await Job.find(query).sort({ createdAt: -1 });

        // Respond with the filtered jobs
        res.status(200).json({
            success: true,
            count: jobs.length,
            data: jobs
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve job postings'
        });
    }
};


export const getJobById = async (req, res) => {
    try {
        // Find a job by its ID from the request parameters
        const job = await Job.findById(req.params.id);

        // If no job is found, return a 404 error
        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job posting not found'
            });
        }

        // Respond with the found job
        res.status(200).json({
            success: true,
            data: job
        });
    } catch (error) {
        // Handle invalid ID format or other server errors
        console.error(error);
        // Check if the error is a CastError (invalid MongoDB ID)
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid job ID format'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve job posting'
        });
    }
};
