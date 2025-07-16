import express from "express"
import cors from "cors"
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config()






const app = express();
const PORT = process.env.PORT;



app.use(express.json());
app.use(cors());

// app.use(cors({
//     origin: "https://sathya-fashions.vercel.app",
//     methods: ["GET", "POST","DELETE"],
//     credentials: true, 
//   },));



app.get("/",(req,res)=>{
    res.send("API WORKING");
});


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server Started At http://localhost:${PORT}`)
    })
}).catch(e=>{
    console.log(e.message);
})