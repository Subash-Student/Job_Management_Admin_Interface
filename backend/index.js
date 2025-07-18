import express from "express"
import cors from "cors"
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import jobRouter from "./routes/jobRoutes.js";
dotenv.config()






const app = express();
const PORT = process.env.PORT;



app.use(express.json());

const allowedOrigins = [
    'http://localhost:5173',
    `${process.env.FRONEND_URL}`
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,POST',
    allowedHeaders: '*',
    credentials: true,
  }));



app.get("/",(req,res)=>{
    res.send("API WORKING");
});

app.use("/api/jobs",jobRouter);

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server Started At http://localhost:${PORT}`)
    })
}).catch(e=>{
    console.log(e.message);
})