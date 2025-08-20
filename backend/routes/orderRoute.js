import express from "express";
import {
  updateStatus,
  usersOrder,
  allOrder,
  placeOrderRazorPay,
  placeOrderStripe,
  placeOrder,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

/* -------------------- ADMIN ROUTES -------------------- */

// 📌 Get all orders (admin only)
orderRouter.get("/list", adminAuth, allOrder);

// 📌 Update order status (admin only)
orderRouter.post("/status", adminAuth, updateStatus);

/* -------------------- USER ROUTES -------------------- */

// 📌 Place order (COD / simple)
orderRouter.post("/place", authUser, placeOrder);

// 📌 Place order with Razorpay
orderRouter.post("/razorpay", authUser, placeOrderRazorPay);

// 📌 Place order with Stripe
orderRouter.post("/stripe", authUser, placeOrderStripe);

// 📌 Get all orders of a logged-in user
orderRouter.post("/userOrder", authUser, usersOrder);

export default orderRouter;
