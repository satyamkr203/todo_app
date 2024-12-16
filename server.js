import dotenv from 'dotenv';
dotenv.config();
import todoRoutes from './routes/todoRoutes.js';
import express from 'express';
import morgan from 'morgan';


const port = process.env.PORT;
const app = express();
// using middlewares
app.use(express.json());
app.use(morgan('dev'));


app.get("/api", (req, res) =>{
    res.status(200).json({
        msg:"server is fine!"
    })
})

app.use("/api", todoRoutes);

app.listen(port, () =>{
    console.log(`server is running on the port ${port}`)
})

