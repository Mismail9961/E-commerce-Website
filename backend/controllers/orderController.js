import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//Placed Order
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: true, message:error.message });
  }
};

//Placed Order Using Stripe
const placeOrderStripe = async (req, res) => {};

//Placed Order Using razorPay
const placeOrderRazorPay = async (req, res) => {};

//All Orders for admin
const allOrder = async (req, res) => {};

//User Order for Frontend
const usersOrder = async (req, res) => {};

//update Order status for admin panel
const updateStatus = async (req, res) => {};

export {
  updateStatus,
  usersOrder,
  allOrder,
  placeOrderRazorPay,
  placeOrderStripe,
  placeOrder,
};
