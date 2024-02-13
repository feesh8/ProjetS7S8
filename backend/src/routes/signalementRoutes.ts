import express from "express";
import { UserController } from "../controllers/userController";

const router = express.Router();

router.get("/users", UserController.getUsers);

export default router;
