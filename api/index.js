import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import cors from "cors";
dotenv.config();

const app = express();

app.use(cors());


mongoose
    .connect(process.env.dbURI)
    .then(() => {
        console.log("Connected to MongoDB")
        app.listen(3000, () => {
            console.log("Sever is running on port 3000");
        });
    })
    .catch((err) => {
        console.log(err)
    })



app.use('/api/user', userRouter);