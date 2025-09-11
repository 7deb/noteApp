import express from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./router/userRouter"
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use("/api/user",userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});