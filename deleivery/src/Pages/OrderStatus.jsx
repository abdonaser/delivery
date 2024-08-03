import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../Styles/OrderStatus.css";

const OrderStatus = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  // Function to fetch the order
  const fetchOrder = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/orders/${orderId}`
      );
      setOrder(response.data);
      console.log(response.data); 
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  // Use useEffect to fetch order initially and set up polling
  useEffect(() => {
    // Fetch the order when component mounts
    fetchOrder();

    // Set up polling to fetch order every 5 seconds
    const intervalId = setInterval(fetchOrder, 5000); 

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [orderId]);

  const formattedTotal =
    order && !isNaN(Number(order.total))
      ? Number(order.total).toFixed(2)
      : "Not available";

  const restaurantName =
    order?.items?.length > 0 ? order.items[0].restaurantName : "Not available";
  const customerName = order?.customerName || "Not available";

  const statusImages = {
    "preparing order": "/Images/preparing.gif",
    "ready for pickup": "/Images/ready.png",
    "out for delivery": "/Images/delivery.gif",
    "delivered": "/Images/delivered.gif",
  };

  return (
    <div className="order-status-container">
      {order ? (
        <div>
          {/* Display the image based on the current status */}
          {order.status && (
            <img
              src={statusImages[order.status] || "/Images/default.png"}
              alt={order.status}
              className="status-image"
            />
          )}

          {/* Status steps */}
          <div className="status-steps">
            {Object.keys(statusImages).map((status) => (
              <div
                key={status}
                className={`step ${order.status === status ? "active" : ""}`}
              >
                <p>{status} </p>
              </div>
            ))}
          </div>

          {/* <h3>Customer Name: {customerName}</h3>
          <h3>Restaurant Name: {restaurantName}</h3>
          <h3>
            Order Time:{" "}
            {order.orderTime
              ? new Date(order.orderTime).toLocaleString()
              : "Not available"}
          </h3>
          <p>Total: ${formattedTotal}</p> */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default OrderStatus;
