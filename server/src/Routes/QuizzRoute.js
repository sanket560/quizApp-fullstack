import express from "express";
import { createQuiz, getQuiz, getQuizById } from "../controller/Quizz.Controller.js";
import authMiddleware from "../middleware/Auth.Middleware.js";
import { submitQuizResult } from "../controller/Result.Controller.js";

const router = express.Router();
router.post("/add-quizz",authMiddleware, createQuiz);
router.get("/all-quizz", getQuiz);
router.get("/start-quizz/:quiz_id", getQuizById);
router.post("/submit-quiz",authMiddleware, submitQuizResult);

export default router;
