import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const AdminOrders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (res.data.orders) setOrders(res.data.orders.reverse());
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchOrders();
        toast.success("Order status updated");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/delete`,
        { orderId },
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders((prev) => prev.filter((o) => o._id !== orderId));
        toast.success("Order deleted successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to delete order");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-600 text-lg font-medium">
        Loading orders...
      </p>
    );

  return (
    <div className="border-t pt-10 px-3 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-gray-800 text-center">
          ALL ORDERS
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-center">No orders found.</p>
        ) : (
          <div className="space-y-5 sm:space-y-8">
            {orders.map((order, index) => (
              <div
                key={order._id || index}
                className="bg-white shadow-md rounded-xl p-4 sm:p-6 flex flex-col gap-6 hover:shadow-lg transition"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <p className="text-base sm:text-lg font-semibold text-gray-900 break-all">
                    Order #{order._id?.slice(-6).toUpperCase()}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {order.date
                      ? new Date(order.date).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <div className="flex gap-2">
                    <select
                      onChange={(event) => statusHandler(event, order._id)}
                      value={order.status}
                      className="p-2 text-xs sm:text-sm md:text-base font-semibold border rounded w-full sm:w-auto"
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="px-3 py-2 bg-red-600 text-white text-xs sm:text-sm rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* User & Address */}
                <div className="text-xs sm:text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 sm:p-4 rounded-lg border break-words">
                  <p className="font-medium">
                    {order.address?.firstName} {order.address?.lastName}
                  </p>
                  <p>{order.address?.street}</p>
                  <p>
                    {order.address?.city}, {order.address?.state}{" "}
                    {order.address?.zipcode}
                  </p>
                  <p>{order.address?.country}</p>
                  <p>Email: {order.address?.email}</p>
                  <p>Phone: {order.address?.phone}</p>
                </div>

                {/* Payment Info */}
                <div className="text-xs sm:text-sm text-gray-700 space-y-1 break-words">
                  <p>
                    Payment Method: {order.paymentMethod} |{" "}
                    {order.payment ? (
                      <span className="text-green-600 font-medium">Paid</span>
                    ) : (
                      <span className="text-red-600 font-medium">Pending</span>
                    )}
                  </p>
                  <p>User ID: {order.userId}</p>
                </div>

                {/* Items */}
                <div className="flex flex-col gap-3">
                  {order.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center gap-3 border rounded-lg p-3"
                    >
                      <img
                        src={item.image?.[0] || "/placeholder.png"}
                        alt={item.name || "Product"}
                        className="w-20 h-20 sm:w-16 sm:h-16 object-cover rounded border mx-auto sm:mx-0"
                      />
                      <div className="flex-1 text-center sm:text-left">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Size: {item.size || "-"} | Qty:{" "}
                          {item.quantity || 1}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gray-800 text-center sm:text-right">
                        {currency}
                        {item.price ? item.price.toFixed(2) : "0.00"}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="flex justify-center sm:justify-end text-base sm:text-lg font-semibold text-gray-900">
                  Total: {currency}
                  {order.amount ? order.amount.toFixed(2) : "0.00"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
