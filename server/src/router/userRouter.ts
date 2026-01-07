import express from "express";
import { getCurrentUser, login, logout, signup } from "../controller/authController";
import { verifyToken } from "../middleware/middleware";

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/logoout',logout);


router.get("/",verifyToken,getCurrentUser);

export default router;