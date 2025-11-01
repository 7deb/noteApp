import express from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./router/userRouter";
import taskRouter from "./router/taskRouter";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true 
}));
app.use("/api/user",userRouter);
app.use("/api/task",taskRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});