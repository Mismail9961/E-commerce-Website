import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from "../components/Title";

const CartTotal = () => {
  const { currency, delivery_fee, cartItems, products } = useContext(ShopContext);

  // Calculate the subtotal based on cartItems and product prices
  const calculateSubtotal = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const product = products.find((p) => p._id === itemId);
      if (!product) return total; // Skip if product not found

      const itemSizes = cartItems[itemId];
      const itemTotal = Object.keys(itemSizes).reduce((sum, size) => {
        const quantity = itemSizes[size];
        return quantity > 0 ? sum + product.price * quantity : sum;
      }, 0);

      return total + itemTotal;
    }, 0).toFixed(2); // Return as a string with 2 decimal places
  };

  const subtotal = calculateSubtotal();
  const total = (parseFloat(subtotal) + delivery_fee).toFixed(2);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency} {subtotal}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{currency} {delivery_fee.toFixed(2)}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Total</p>
          <p>{currency} {total}</p>
        </div>
      </div>
      
    </div>
  );
};

export default CartTotal;