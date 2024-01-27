import express, { request } from "express";
import {PORT} from "./cofig.js";
import mongoose from "mongoose";
import bookRoute from './routes/bookRoute.js'
import cors from 'cors';
mongoose.connect('mongodb+srv://nithinappari:75nlIXu4s977F7U6@cluster0.7ljelcs.mongodb.net/?retryWrites=true&w=majority')
.then(()=>console.log("connection successfull"))
.catch((error)=>console.log(error))


const app=express()
app.use(cors())
app.use(express.json())
app.use('/books',bookRoute)

app.listen(PORT,()=>{
    console.log(`server started at port: ${PORT}`)
})
