import dotenv from 'dotenv';
dotenv.config({
  path : './env'
})
import cors from 'cors';
import express from "express";
import connectDB from './database/ConnectDB.js';
import authRoute from './Routes/AuthRouter.js';
import quizzRoute from './Routes/QuizzRoute.js'
import errorMiddleware from './middleware/error.middleware.js';

const app = express();

const crosOptions = {
  origin : "*",
  methods : "GET , POST , PUT , DELETE , PATCH , HEAD",
  credentials : true
}
app.use(cors(crosOptions))

app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/",quizzRoute)
app.use(errorMiddleware)

const PORT = 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
  });
});

