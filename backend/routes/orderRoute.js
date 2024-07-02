import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  getAllOrders,
  getUserOrder,
  placeOrder,
  updateOrderStatus,
  verifyOrder,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place-order", authMiddleware, placeOrder);
orderRouter.post("/verify-order", verifyOrder);
orderRouter.post("/orders-list", authMiddleware, getUserOrder);
orderRouter.get("/list", getAllOrders);
orderRouter.post("/update-status", updateOrderStatus);

export default orderRouter;
