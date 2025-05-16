import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData); // Update state with processed data
  }, [cartItems]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartData.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartData.map((cartItem, index) => {
            const product = products.find((p) => p._id === cartItem._id); // Match product by ID
            if (!product) return null; // Skip if product not found

            return (
              <div
                key={`${cartItem._id}-${cartItem.size}-${index}`}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.image[0]} // Assuming products have an image array
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
                    } // Fixed: cartItem instead of item
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
          <CartTotal/>
          <div className="w-full text-end">
                  <button onClick={()=>navigate("place-order")} className="bg-black text-white text-sm my-8 px-8 py-3">PROCEED TO CHECKOUT</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
