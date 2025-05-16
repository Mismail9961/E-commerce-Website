// Orders.jsx (with tracking and status)
import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="border-t pt-16 px-4 sm:px-6 lg:px-8">
      <div className="text-2xl mb-8">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="space-y-4">
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-white shadow-sm rounded-lg p-4"
          >
            <div className="flex items-center gap-6">
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-16 sm:w-20 h-16 sm:h-20 object-cover rounded"
              />
              <div>
                <p className="text-sm sm:text-base font-medium text-gray-800">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500">Order #ORD{index + 100}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 text-sm sm:text-base text-gray-700">
              <p className="text-lg font-semibold">
                {currency}{item.price.toFixed(2)}
              </p>
              <p>Quantity: 1</p>
              <p>Size: M</p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm">
                Date: <span className="text-gray-400">25, Jul, 2025</span>
              </p>
              <p className="text-sm">
                Status: <span className="text-orange-600 font-medium">Processing</span>
              </p>
            </div>

            <button
              className="bg-black text-white px-4 py-2 rounded-sm text-sm hover:bg-gray-800 transition-colors md:self-end"
              onClick={() => alert(`Tracking order ORD${index + 100}`)}
            >
              Track Your Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;