import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderStatus = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/orders/${orderId}`
        );
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [orderId]);

  const updateStatus = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/orders/${orderId}/status`,
        { status: newStatus }
      );
      setOrder(response.data);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Convert total to a number and format it
  const formattedTotal =
    order && !isNaN(Number(order.total))
      ? Number(order.total).toFixed(2)
      : "Not available";

  // Extract restaurant name from items
  const restaurantName =
    order?.items?.length > 0 ? order.items[0].restaurantName : "Not available";
  // Placeholder for customer name if not available
  const customerName = "Not available";

  return (
    <div className="order-status-container">
      {order ? (
        <div>
          <h2>Order ID: {orderId}</h2>
          <h3>Customer Name: {customerName}</h3>
          <h3>Restaurant Name: {restaurantName}</h3>
          <h3>
            Order Time:{" "}
            {order.orderTime
              ? new Date(order.orderTime).toLocaleString()
              : "Not available"}
          </h3>
          <h3>Status: {order.status || "Not available"}</h3>
          <p>Total: ${formattedTotal}</p>
          <div>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="">Select new status</option>
              <option value="preparing order">Preparing Order</option>
              <option value="ready for pickup">Ready for Pickup</option>
              <option value="out for delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
            </select>
            <button onClick={updateStatus}>Update Status</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default OrderStatus;
