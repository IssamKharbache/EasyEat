import express from "express";
import {
  getCartItems,
  addToCart,
  removeFromCart,
} from "../controllers/cartController.js";

import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.post("/get", authMiddleware, getCartItems);

export default cartRouter;
