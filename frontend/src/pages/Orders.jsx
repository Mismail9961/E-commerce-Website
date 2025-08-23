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
      console.log(response.data);
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
    <div className="border-t pt-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-3xl font-bold mb-10 text-gray-800 text-center">
          <Title text1="MY" text2="ORDERS" />
        </div>

        {orderData.length > 0 ? (
          <div className="space-y-6">
            {orderData.map((order, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 transition hover:shadow-lg"
              >
                {/* Order Info */}
                <div className="flex items-center gap-4 sm:gap-6 flex-1">
                  <img
                    src={order.items?.[0]?.image || "/placeholder.png"}
                    alt={order.items?.[0]?.name || "Product"}
                    className="w-20 h-20 object-cover rounded-md border border-gray-200"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {order.items?.[0]?.name || "Unknown Product"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Order #ORD{index + 100}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.items?.length || 0} items
                    </p>
                  </div>
                </div>

                {/* Amount and Status */}
                <div className="flex flex-col sm:items-end gap-2">
                  <p className="text-lg font-semibold text-gray-900">
                    {currency}
                    {order.amount ? order.amount.toFixed(2) : "0.00"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date:{" "}
                    <span className="text-gray-700">
                      {order.date
                        ? new Date(order.date).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
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

                {/* Actions */}
                <div className="sm:self-center">
                  <button
                    onClick={loadData}
                    className="mt-2 sm:mt-0 bg-black text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition"
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
