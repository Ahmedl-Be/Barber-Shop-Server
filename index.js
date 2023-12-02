import express from "express"
import dotenv from "dotenv";
import mongoose from "mongoose";
import userMsgRouter from "./routes/userMsg.route.js"
import {ERROR} from './utils/httpStatusText.js'
import cors from 'cors';
import userRouter from './routes/user.route.js';
import reservationRouter from './routes/reservation.route.js';
import ownerRoute from './routes/owner.route.js';
dotenv.config();
const app = express();
app.use(cors());

app.use(express.json())

const connect = async () => {
    try {
        await mongoose.connect(process.env.URL);
        console.log("Conncted to DB")
    } catch (error) {
        throw error
    }
}

app.get('/api',(req,res,next)=>{
    res.json({msg:"Hello !!"})
})

app.use("/api/userMsg",userMsgRouter)

app.use("/api/users",userRouter)

app.use("/api/reservation",reservationRouter)

app.use("/api/owner",ownerRoute)

// Global middelware for not found routes 
app.all("*", (req, res, next) => {
    res.status(404).json({
        status: ERROR,
        message: "This resourse is not available"
    })
})

// Global error handler 
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: error.statusText || ERROR,
        message: error.message,
        code: error.statusCode || 500,
        data: null
    })
})

app.listen(8800, () => {
    connect()
    console.log("Hello Node.js")
})
