import express from "express"
import rateLimit from 'express-rate-limit';
import { createJob, getJobById, getJobs } from "../controller/jobController";



const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});

const jobRouter = express.Router(); 

jobRouter.use(limiter);

router.post("/create",createJob)
     
router.get("/",getJobs);

router.get("/:id",getJobById);


export default jobRouter;
