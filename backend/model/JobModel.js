
import mongoose from "mongoose"


const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: [true, 'Job Title is required'], 
        trim: true 
    },
    companyName: {
        type: String,
        required: [true, 'Company Name is required'], 
        trim: true
    },
    imageUrl: {
        type: String,
    },
    location: {
        type: String,
        required: [true, 'Location is required'], 
        trim: true
    },
    jobType: {
        type: String,
        required: [true, 'Job Type is required'], 
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], 
        default: 'Full-time'
    },
    minSalary: {
        type: String, 
        required: [true, 'Minimum Salary Range is required'], 
        trim: true
    },
    maxSalary: {
        type: String, 
        required: [true, 'Maximum Salary Range is required'], 
        trim: true
    },
    jobExperience: {
        type: String,
        required: [true, 'Job Experience is required'], // Make it required
        trim: true
    },
    jobDescription: {
        type: String,
        required: [true, 'Job Description is required'] 
    },
    requirements: {
        type: String,
        required: [true, 'Requirements are required'] 
    },
    responsibilities: {
        type: String,
        required: [true, 'Responsibilities are required'] 
    },
    applicationDeadline: {
        type: Date,
        required: [true, 'Application Deadline is required'] 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const JobModel = mongoose.model("Job", jobSchema);

export default JobModel;