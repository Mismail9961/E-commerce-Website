import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/userOrder",
        {},
        { headers: { token } }
      );

      if (response.data.orders) {
        setOrderData(response.data.orders);
      }
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, [token]);

  return (
    <div className="border-t pt-16 px-4 sm:px-6 lg:px-8">
      <div className="text-2xl mb-8">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="space-y-4">
        {orderData.length > 0 ? (
          orderData.map((order, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-white shadow-sm rounded-lg p-4"
            >
              {/* Show first product image */}
              <div className="flex items-center gap-6">
                <img
                  src={order.items?.[0]?.image || "/placeholder.png"}
                  alt={order.items?.[0]?.name || "Product"}
                  className="w-16 sm:w-20 h-16 sm:h-20 object-cover rounded"
                />
                <div>
                  <p className="text-sm sm:text-base font-medium text-gray-800">
                    {order.items?.[0]?.name || "Unknown Product"}
                  </p>
                  <p className="text-sm text-gray-500">Order #ORD{index + 100}</p>
                </div>
              </div>

              {/* Price & Details */}
              <div className="flex items-center gap-4 sm:gap-6 text-sm sm:text-base text-gray-700">
                <p className="text-lg font-semibold">
                  {currency}
                  {order.amount ? order.amount.toFixed(2) : "0.00"}
                </p>
                <p>Items: {order.items?.length || 0}</p>
              </div>

              {/* Date & Status */}
              <div className="flex flex-col gap-2">
                <p className="text-sm">
                  Date:{" "}
                  <span className="text-gray-400">
                    {order.date
                      ? new Date(order.date).toLocaleDateString()
                      : "N/A"}
                  </span>
                </p>
                <p className="text-sm">
                  Status:{" "}
                  <span className="text-orange-600 font-medium">
                    {order.status || "Order Placed"}
                  </span>
                </p>
              </div>

              {/* Tracking Button */}
              <button
                className="bg-black text-white px-4 py-2 rounded-sm text-sm hover:bg-gray-800 transition-colors md:self-end"
                onClick={loadData}
              >
                Track Your Order
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
