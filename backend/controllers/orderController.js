import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

import Stripe from "stripe";

//setting up stripe

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing order function

const placeOrder = async (req, res) => {
  const frontEndUrl = "https://easy-eat-theta.vercel.app/";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    //stripe items for payment
    const lineItems = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${frontEndUrl}/verify-order?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontEndUrl}/verify-order?success=false&orderId=${newOrder._id}`,
    });
    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal Server Error while creating order",
    });
  }
};
//verify if order is  payed or not
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({
        success: true,
        message: "Order paid successfully",
      });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({
        success: false,
        message: "Order not paid , we canceled your order",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "internal server error while verifying the order",
    });
  }
};

//get user orders

const getUserOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal server error while getting user orders",
    });
  }
};
//get all orders for admin dashboard

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort([["createdAt", "desc"]]);
    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal server error while getting all orders(admin)",
    });
  }
};

//update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status: status });
    res.json({
      success: true,
      message: "Order status updated",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal server error while updating status",
    });
  }
};
export {
  placeOrder,
  verifyOrder,
  getUserOrder,
  getAllOrders,
  updateOrderStatus,
};
