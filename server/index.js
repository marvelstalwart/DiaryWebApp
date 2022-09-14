import express from 'express';
import bodyParser from 'body-parser';
import mongoose from  'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import entryRoutes from "./routes/entry.js"
import userRoutes from './routes/userRoute.js'
const app = express();
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors());
dotenv.config()   

app.use('/entries', entryRoutes);
app.use('/users', userRoutes)
app.all('*', (req, res)=> {
    res.status(404).send('404! Page not found')
})
//mongo Db cloud atlas
const conn = process.env.CONNECTION_STRING;
const PORT = process.env.PORT ||  5000;

mongoose.connect(conn, {useNewUrlParser:true, useUnifiedTopology: true} )
.then (()=> app.listen(PORT, ()=> console.log(`server running on port ${PORT}`)))
.catch((err)=> console.log(err.message))

// mongoose.set('useFindAndModify', false);