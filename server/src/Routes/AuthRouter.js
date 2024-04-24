import express from "express";
import { signupSchema, loginSchema } from "../validators/auth.validator.js";
import authMiddleware from './../middleware/Auth.Middleware.js';
import validate from './../middleware/Auth.Validate.js';
import { login, register, user } from "../controller/Auth.Controller.js";

const router = express.Router();

router.route("/register").post(validate(signupSchema), register);
router.route("/login").post(validate(loginSchema), login);
router.route("/user").get(authMiddleware , user);

export default router;
