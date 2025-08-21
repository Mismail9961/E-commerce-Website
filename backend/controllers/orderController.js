import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//Placed Order
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items: items.map((p) => ({
        productId: p.productId,
        name: p.name,
        price: p.price,
        qty: p.qty,
        image: p.image,
      })),
      address,
      amount, // total order price
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
      status: "Order Placed",
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed", order: newOrder });
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
const updateStatus = async (req, res) => {};

export {
  updateStatus,
  usersOrder,
  allOrder,
  placeOrderRazorPay,
  placeOrderStripe,
  placeOrder,
};
