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
        
        const query = {};

        const { jobTitle, location, jobType, minSalary, maxSalary } = req.query;
       
        if (jobTitle) {            
            query.jobTitle = { $regex: jobTitle, $options: 'i' };
        }
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }
        if (jobType) {
            query.jobType = jobType;
        }

        if (minSalary || maxSalary) {
            query.salaryRange = { $exists: true }; 
            if (minSalary) {
                query.salaryRange.$regex = `^${minSalary}|${minSalary}\\s*-`; 
                query.salaryRange.$options = 'i';
            }
            if (maxSalary) { 
                if (query.salaryRange.$regex) {
                    query.salaryRange.$regex += `|-${maxSalary}$`; 
                } else {
                    query.salaryRange.$regex = `-${maxSalary}$`;
                }
                query.salaryRange.$options = 'i';
            }
        }


        
        const jobs = await JobModel.find(query).sort({ createdAt: -1 });

        
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