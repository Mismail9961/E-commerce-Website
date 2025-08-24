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
    <div className="border-t pt-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center">
          ALL ORDERS
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-center">No orders found.</p>
        ) : (
          <div className="space-y-8">
            {orders.map((order, index) => (
              <div
                key={order._id || index}
                className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-6 hover:shadow-lg transition"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <p className="text-lg font-semibold text-gray-900">
                    Order #{order._id?.slice(-6).toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.date
                      ? new Date(order.date).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <select
                    onChange={(event) => statusHandler(event, order._id)}
                    value={order.status}
                    className="p-2 font-semibold border rounded"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

                {/* User & Address */}
                <div className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border">
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
                <div className="text-sm text-gray-700">
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
                      className="flex items-center gap-4 border rounded-lg p-3"
                    >
                      <img
                        src={item.image?.[0] || "/placeholder.png"}
                        alt={item.name || "Product"}
                        className="w-14 h-14 object-cover rounded border"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Size: {item.size || "-"} | Qty: {item.quantity || 1}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gray-800">
                        {currency}
                        {item.price ? item.price.toFixed(2) : "0.00"}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="flex justify-end text-lg font-semibold text-gray-900">
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
