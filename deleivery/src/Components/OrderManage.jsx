import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/OrderManagement.css";

const OrderManagement = ({ restaurantId }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/order");
        console.log("API Response:", response.data);

        const filteredOrders = response.data.filter((order) =>
          order.items.some((item) => item.restaurantId === restaurantId)
        );

        console.log("Filtered Orders:", filteredOrders);
        setOrders(filteredOrders);
      } catch (error) {
        setError("Error fetching orders: " + error.message);
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
    const intervalId = setInterval(fetchOrders, 30000);
    return () => clearInterval(intervalId);
  }, [restaurantId]);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
  };

  const updateStatus = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/orders/${selectedOrder.id}/status`,
        { status: newStatus }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === selectedOrder.id
            ? { ...order, status: response.data.status }
            : order
        )
      );
      setSelectedOrder(null);
      setNewStatus("");
    } catch (error) {
      setError("Error updating order status: " + error.message);
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="order-management-container">
      <h1>Order Management</h1>
      {error && <p className="error-message">{error}</p>}

      <div className="order-list">
        <h2>Orders</h2>
        {orders.length === 0 ? (
          <p>No orders for this restaurant yet</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order.id} onClick={() => handleOrderClick(order)}>
                Order ID: {order.id} - Status: {order.status}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedOrder && (
        <div className="order-details">
          <h4>Order ID: {selectedOrder.id}</h4>
          <h6>Current Status: {selectedOrder.status}</h6>
          <h6>Order Items:</h6>
          <ul>
            {selectedOrder.items.map((item, index) => {
              const price = parseFloat(item.price);
              return (
                <li key={index}>
                  {item.name} - {item.quantity} x ${price.toFixed(2)}
                </li>
              );
            })}
          </ul>
          <div className="d-flex justify-content-center align-items-center">
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              class="form-select form-select-lg rounded-2 rounded  w-50"
              aria-label="Default select example">
              <option className="p-2 m-2" value="" selected>
                Select new status
              </option>
              <option className="p-2 m-2" value="preparing order">
                Preparing Order
              </option>
              <option className="p-2 m-2" value="ready for pickup">
                Ready for Pickup
              </option>
              <option className="p-2 m-2" value="out for delivery">
                Out for Delivery
              </option>
              <option className="p-2 m-2" value="delivered">
                Delivered
              </option>
            </select>
            <button onClick={updateStatus}>Update Status</button>
          </div>

          {/* <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="">Select new status</option>
            <option value="preparing order">Preparing Order</option>
            <option value="ready for pickup">Ready for Pickup</option>
            <option value="out for delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
          </select>
          <button onClick={updateStatus}>Update Status</button> */}
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
