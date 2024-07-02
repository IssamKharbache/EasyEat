import express from "express";

import {
  getUsers,
  loginUser,
  registerUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

//endpoints
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/users", getUsers);

export default userRouter;
