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
        setOrderData(response.data.orders.reverse());
      }
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, [token]);

  return (
    <div className="border-t px-4 pt-14 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-3xl font-bold mb-10 text-gray-800 text-center">
          <Title text1="MY" text2="ORDERS" />
        </div>

        {orderData.length > 0 ? (
          <div className="space-y-6">
            {orderData.map((order, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-xl p-6 transition hover:shadow-lg"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      Order #ORD{index + 100}
                    </p>
                    <p className="text-sm text-gray-500">
                      Date:{" "}
                      <span className="text-gray-700">
                        {order.date
                          ? new Date(order.date).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col items-start sm:items-end">
                    <p className="text-lg font-semibold text-gray-900">
                      {currency}
                      {order.amount ? order.amount.toFixed(2) : "0.00"}
                    </p>
                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {order.status || "Order Placed"}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="divide-y">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 py-4"
                    >
                      <img
                        src={item.image || "/placeholder.png"}
                        alt={item.name || "Product"}
                        className="w-20 h-20 object-cover rounded-md border border-gray-200"
                      />
                      <div className="flex-1">
                        <h3 className="text-md font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Size: {item.size || "N/A"}
                        </p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity || 1}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {currency}
                        {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={loadData}
                    className="bg-black text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-10">
            No orders found. Start shopping to see your orders here.
          </p>
        )}
      </div>
    </div>
  );
};

export default Orders;
