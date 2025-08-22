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

orderRouter.post("/list", adminAuth, allOrder);
orderRouter.post("/status", adminAuth, updateStatus);
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/razorpay", authUser, placeOrderRazorPay);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/userOrder", authUser, usersOrder);

export default orderRouter;
