import express from "express";
import validateBody from "../helpers/validateBody.js";
import { loginSchema, registerSchema } from "../schemas/authSchemas.js";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../controllers/authControllers.js";

import { authenticate } from "../middelware/authenticate.js";


const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), registerUser);

authRouter.post("/login", validateBody(loginSchema), loginUser);

authRouter.get("/current", authenticate, getCurrentUser);

authRouter.post("/logout", authenticate, logoutUser);

authRouter.patch("/", authenticate, updateUser);

export default authRouter;
