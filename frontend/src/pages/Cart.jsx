import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, token, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  // 🔒 Protect route
  useEffect(() => {
    if (!token) {
      navigate("/login"); // redirect if not logged in
    }
  }, [token, navigate]);

  useEffect(() => {
    if (products.length > 0 && cartItems && Object.keys(cartItems).length > 0) {
      const tempData = [];
      for (const productId of Object.keys(cartItems)) {
        for (const size of Object.keys(cartItems[productId])) {
          if (cartItems[productId][size] > 0) {
            tempData.push({
              _id: productId,
              size,
              quantity: cartItems[productId][size],
            });
          }
        }
      }
      setCartData(tempData);
    } else {
      setCartData([]);
    }
  }, [cartItems, products]);

  if (!token) return null; // prevent flash before redirect

  return (
    <div className="p-4 sm:p-6 mt-20">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">
        Your Cart
      </h1>

      {cartData.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartData.map((cartItem) => {
            const product = products.find((p) => p._id === cartItem._id);
            if (!product) return null;

            return (
              <div
                key={`${cartItem._id}-${cartItem.size}`}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={product.image?.[0] || "/placeholder.jpg"}
                    alt={product.name}
                    className="w-20 h-20 sm:w-16 sm:h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-semibold text-sm sm:text-base">
                      {product.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Size: {cartItem.size} | Qty: {cartItem.quantity}
                    </p>
                  </div>
                </div>

                {/* Price + Remove */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  <p className="font-medium text-sm sm:text-base">
                    {currency}
                    {(product.price * cartItem.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() =>
                      updateQuantity(cartItem._id, cartItem.size, 0)
                    }
                    className="text-red-500 hover:text-red-700 text-sm sm:text-base font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cart Total + Checkout */}
      {cartData.length > 0 && (
        <div className="flex justify-center sm:justify-end my-10">
          <div className="w-full sm:w-[450px] bg-gray-50 p-4 rounded-lg shadow-sm">
            <CartTotal />
            <div className="w-full text-center sm:text-right">
              <button
                onClick={() => navigate("/place-order")}
                className="bg-black text-white text-sm sm:text-base font-semibold my-6 px-6 sm:px-8 py-3 w-full sm:w-auto rounded-md hover:bg-gray-900 transition"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
