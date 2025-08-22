import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App"; // adjust path if needed

const AdminOrders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    if (!token){
      return nulll
    }

    try {
      const res = await axios.post(`${backendUrl}/api/order/list`,{},{
        headers: { token },
      });
      console.log(res)
      console.log(res.data)
      if (res.data.orders) setOrders(res.data.orders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  if (loading) return <p className="text-center mt-8">Loading orders...</p>;

  return (
    <div className="border-t pt-16 px-4 sm:px-6 lg:px-8">
      <div className="text-2xl mb-8 font-bold text-gray-800">
        ALL ORDERS
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div
              key={order._id || index}
              className="py-4 border-t border-b text-gray-700 flex flex-col gap-4 bg-white shadow-sm rounded-lg p-4"
            >
              {/* Header */}
              <div className="flex justify-between items-center flex-wrap gap-2">
                <p className="font-medium">
                  Order #{order._id.slice(-6).toUpperCase()}
                </p>
                <p className="text-gray-500">
                  Date: {order.date ? new Date(order.date).toLocaleDateString() : "N/A"}
                </p>
                <p
                  className={
                    order.status === "Delivered"
                      ? "text-green-600 font-medium"
                      : order.status === "Shipped"
                      ? "text-blue-600 font-medium"
                      : "text-orange-600 font-medium"
                  }
                >
                  {order.status || "Order Placed"}
                </p>
              </div>

              {/* User Info */}
              <div>
                <p className="text-sm text-gray-700">
                  User: {order.userId || "Unknown"}
                </p>
                <p className="text-sm text-gray-700">
                  Payment: {order.paymentMethod} | {order.payment ? "Paid" : "Pending"}
                </p>
              </div>

              {/* Items */}
              <div className="flex flex-col gap-2">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 border p-2 rounded">
                    <img
                      src={item.image?.[0] || "/placeholder.png"}
                      alt={item.name || "Product"}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.qty || 1} | Size: {item.size || "M"}
                      </p>
                    </div>
                    <p className="text-sm font-semibold">
                      {currency}
                      {item.price ? item.price.toFixed(2) : "0.00"}
                    </p>
                  </div>
                ))}
              </div>

              {/* Total Amount */}
              <div className="text-right font-semibold">
                Total: {currency}
                {order.amount ? order.amount.toFixed(2) : "0.00"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
