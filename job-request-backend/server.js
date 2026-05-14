import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDB from './config/db.js';


const app = express();
const PORT = process.env.PORT;

await connectDB();

app.use(express.json());
app.use(cors());

app.get('/',(erq,res)=>{res.send("Backend is running on port "+PORT)});

app.listen(PORT,()=>{
    console.log("Server is running on port "+PORT);
});