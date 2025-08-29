import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    getCartAmount,
    getCartCount,
    delivery_fee,
    products,
    setCartItems,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!token) {
      toast.error("Please log in to place an order.");
      return;
    }

    if (getCartCount() === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    try {
      const orderItems = [];

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            const itemInfo = structuredClone(
              products.find((p) => p._id === productId)
            );
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[productId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod": {
          const response = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            toast.success("Order placed successfully!");
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message || "Failed to place order.");
          }
          break;
        }
        case "stripe":
        case "razorpay":
          toast.info("This payment method is not implemented yet.");
          break;
        default:
          toast.error("Invalid payment method selected.");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong."
      );
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col sm:flex-row justify-between gap-8 pt-10 sm:pt-16 min-h-[80vh] border-t px-4 sm:px-8 lg:px-16"
    >
      {/* LEFT SIDE - Delivery Info */}
      <div className="flex flex-col gap-6 w-full sm:max-w-[500px] bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <div className="text-xl sm:text-2xl mb-2">
          <Title text1="Delivery" text2="Information" />
        </div>

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            required
            className="border border-gray-300 rounded-xl py-2 px-4 w-full focus:ring-1 focus:ring-black/70 outline-none"
            type="text"
            placeholder="First Name"
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            required
            className="border border-gray-300 rounded-xl py-2 px-4 w-full focus:ring-1 focus:ring-black/70 outline-none"
            type="text"
            placeholder="Last Name"
          />
        </div>

        <input
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          required
          className="border border-gray-300 rounded-xl py-2 px-4 w-full focus:ring-1 focus:ring-black/70 outline-none"
          type="email"
          placeholder="Email Address"
        />

        <input
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          required
          className="border border-gray-300 rounded-xl py-2 px-4 w-full focus:ring-1 focus:ring-black/70 outline-none"
          type="text"
          placeholder="Street"
        />

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            required
            className="border border-gray-300 rounded-xl py-2 px-4 w-full focus:ring-1 focus:ring-black/70 outline-none"
            type="text"
            placeholder="City"
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            required
            className="border border-gray-300 rounded-xl py-2 px-4 w-full focus:ring-1 focus:ring-black/70 outline-none"
            type="text"
            placeholder="State"
          />
        </div>

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            required
            className="border border-gray-300 rounded-xl py-2 px-4 w-full focus:ring-1 focus:ring-black/70 outline-none"
            type="text"
            placeholder="Zip Code"
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            required
            className="border border-gray-300 rounded-xl py-2 px-4 w-full focus:ring-1 focus:ring-black/70 outline-none"
            type="text"
            placeholder="Country"
          />
        </div>

        <input
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          required
          className="border border-gray-300 rounded-xl py-2 px-4 w-full focus:ring-1 focus:ring-black/70 outline-none"
          type="text"
          placeholder="Phone"
        />
      </div>

      {/* RIGHT SIDE - Payment + Cart Total */}
      <div className="flex-1 flex flex-col gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <CartTotal />
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <Title text1="Payment" text2="Method" />

          {/* Payment method selection */}
          <div className="flex gap-4 flex-col lg:flex-row mt-6">
            <div
              onClick={() => setMethod("stripe")}
              className={`flex items-center gap-4 border rounded-xl p-4 cursor-pointer transition-all ${
                method === "stripe"
                  ? "border-black shadow-md"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <span
                className={`min-w-4 h-4 rounded-full border flex items-center justify-center ${
                  method === "stripe" ? "bg-black" : "bg-white"
                }`}
              ></span>
              <img className="h-6" src={assets.stripe_logo} alt="Stripe" />
            </div>

            <div
              onClick={() => setMethod("razorpay")}
              className={`flex items-center gap-4 border rounded-xl p-4 cursor-pointer transition-all ${
                method === "razorpay"
                  ? "border-black shadow-md"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <span
                className={`min-w-4 h-4 rounded-full border flex items-center justify-center ${
                  method === "razorpay" ? "bg-black" : "bg-white"
                }`}
              ></span>
              <img className="h-6" src={assets.razorpay_logo} alt="Razorpay" />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-4 border rounded-xl p-4 cursor-pointer transition-all ${
                method === "cod"
                  ? "border-black shadow-md"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <span
                className={`min-w-4 h-4 rounded-full border flex items-center justify-center ${
                  method === "cod" ? "bg-black" : "bg-white"
                }`}
              ></span>
              <p className="text-sm tracking-wide text-gray-700">
                Cash on Delivery
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              disabled={getCartCount() === 0}
              className="uppercase tracking-wide bg-black text-white text-sm font-medium px-12 py-3 rounded-full hover:bg-gray-900 transition-all disabled:opacity-50"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
