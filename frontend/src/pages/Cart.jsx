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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartData.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartData.map((cartItem) => {
            const product = products.find((p) => p._id === cartItem._id);
            if (!product) return null;

            return (
              <div
                key={`${cartItem._id}-${cartItem.size}`}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.image?.[0] || "/placeholder.jpg"}
                    alt={product.name}
                    className="w-16 h-16 object-cover"
                  />
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-600">
                      Size: {cartItem.size} | Quantity: {cartItem.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-medium">
                    {currency}
                    {(product.price * cartItem.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() =>
                      updateQuantity(cartItem._id, cartItem.size, 0)
                    }
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
