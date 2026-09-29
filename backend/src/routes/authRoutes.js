import express from "express";
import { register, login, getMe, refreshToken,  logout} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { registerValidation, loginValidation } from "../middleware/authValidation.js";
import validationMiddleware from "../middleware/validationMiddleware.js";


const router = express.Router();

router.post("/register", registerValidation, validationMiddleware, register);

router.post("/login", loginValidation, validationMiddleware, login)

router.get("/me", authMiddleware, getMe);

router.post("/refresh-token", refreshToken);

router.post("/logout", authMiddleware, logout);

export default router;