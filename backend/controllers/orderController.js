import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import connectDB from "../config/mongodb.js";

//Placed Order
const placeOrder = async (req, res) => {
  try {
    await connectDB();
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
      status: "Order Placed",
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Placed Order Using Stripe
const placeOrderStripe = async (req, res) => {};

//Placed Order Using razorPay
const placeOrderRazorPay = async (req, res) => {};

//All Orders for admin
const allOrder = async (req, res) => {
  try {
    await connectDB();
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//User Order for Frontend
const usersOrder = async (req, res) => {
  try {
    await connectDB();
    const userId = req.user?.id || req.body.userId;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID required" });
    }

    const orders = await orderModel.find({ userId }).sort({ date: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//update Order status for admin panel
const updateStatus = async (req, res) => {
  try {
    await connectDB();
    const {orderId,status} = req.body
    await orderModel.findByIdAndUpdate(orderId,{status})
    res.json({ success: true, message:"Status Updated"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Order for Admin
const deleteOrder = async (req, res) => {
  try {
    await connectDB();
    const { orderId } = req.body;

    if (!orderId) {
      return res
        .status(400)
        .json({ success: false, message: "Order ID required" });
    }

    const deleted = await orderModel.findByIdAndDelete(orderId);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error("Delete order error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export {
  deleteOrder,
  updateStatus,
  usersOrder,
  allOrder,
  placeOrderRazorPay,
  placeOrderStripe,
  placeOrder,
};
