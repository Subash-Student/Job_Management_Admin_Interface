import JobModel from "../model/JobModel.js";
import streamifier from "streamifier"
import cloudinary from "../config/cloudinary.js";

export const createJob = async (req, res) => {
    try {
        
        const imageFile = req.file  || null;

        let imageUrl;
        if (imageFile){
             imageUrl = await uploadImageToCloudinary(imageFile);
        }

        const jobData = {
            ...req.body, 
            imageUrl: imageUrl 
        };

        const job = await JobModel.create(jobData);
       
        res.status(201).json({
            success: true,
            data: job,
            message:"Job Created Successfully!"
        });
    } catch (error) {
        
        console.error(error);
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to create job posting'
        });
    }
};




export const getJobs = async (req, res) => {
  try {
    const {
      jobTitle = '',
      location = '',
      jobType = '',
      minSalary = '',
      maxSalary = ''
    } = req.query;

    console.log(req.query)
    // Fetch all jobs first
    let jobs = await JobModel.find().sort({ createdAt: -1 });

    // Normalize input
    const normalize = (str) =>
      str.toString().trim().toLowerCase().replace(/\s+/g, '');

    const normalizedJobTitle = normalize(jobTitle);
    const normalizedLocation = normalize(location);
    const normalizedJobType = normalize(jobType);

    const minS = parseInt(minSalary);
    const maxS = parseInt(maxSalary);

    // Apply filter manually
    const filteredJobs = jobs.filter((job) => {
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

      if (normalizedJobType && jobTypeNorm !== normalizedJobType) {
        match = false;
      }

      if ((minSalary || maxSalary) && job.minSalary && job.maxSalary) {
        const min = job.minSalary;
        const max = job.maxSalary;
        if (minSalary && max < minS) match = false;
        if (maxSalary && min > maxS) match = false;
      }

      return match;
    });

    res.status(200).json({
      success: true,
      count: filteredJobs.length,
      data: filteredJobs,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve job postings',
    });
  }
};




export const getJobById = async (req, res) => {
    try {
      
        const job = await JobModel.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job posting not found'
            });
        }

        res.status(200).json({
            success: true,
            data: job
        });
    } catch (error) {
        console.error(error);
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





const uploadImageToCloudinary = async (file) => {
    if (!file || !file.buffer) {
        throw new Error("Invalid image file");
    }

    const safeFilename = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "image-files",
                resource_type: "image",
                public_id: safeFilename,
            },
            (error, result) => {
                if (error || !result?.secure_url) {
                    console.error("Image upload error:", error);
                    return reject(new Error("Image upload failed"));
                }
                resolve(result.secure_url);
            }
        );

        streamifier.createReadStream(file.buffer).pipe(stream);
    });
};






