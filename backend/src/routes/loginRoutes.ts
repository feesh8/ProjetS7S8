import express from "express";
import { UserController } from "../controllers/userController";

const router = express.Router();

router.post("/login", UserController.loginUser);

router.post("/signup", UserController.signUpUser);


export default router;
