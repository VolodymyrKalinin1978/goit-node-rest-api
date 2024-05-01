import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  emailSchema,
  loginSchema,
  registerSchema,
} from "../schemas/authSchemas.js";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  resendVerifyEmail,
  updateUser,
  updateUserAvatar,
  verifyEmail,
} from "../controllers/authControllers.js";

import { authenticate } from "../middelware/authenticate.js";
import { upload } from "../middelware/uploadAvatar.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), registerUser);

authRouter.get("/verify/:verificationToken", verifyEmail);

authRouter.post("/verify", validateBody(emailSchema), resendVerifyEmail);

authRouter.post("/login", validateBody(loginSchema), loginUser);

authRouter.get("/current", authenticate, getCurrentUser);

authRouter.post("/logout", authenticate, logoutUser);

authRouter.patch("/", authenticate, updateUser);
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatarURL"),
  updateUserAvatar
);

export default authRouter;
