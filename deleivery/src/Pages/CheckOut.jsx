import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Checkout.css";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch(); 
  const [orderId, setOrderId] = React.useState(null);

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.price.replace("$", ""));
        return 5 + total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleCheckout = async () => {
    const order = {
      items: cartItems,
      total: calculateTotal(),
    };
  
    try {
      console.log("Sending order:", order);
      const response = await axios.post("http://localhost:3000/api/orders", order);
      const orderId = response.data.id; 
      window.location.href = `/order-status/${orderId}`;
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  if (orderId) {
    return <Navigate to={`/order/${orderId}`} />;
  }

  return (
    <div className="checkout-container">
      {cartItems.length > 0 ? (
        <div className="checkout-window">
          <div className="checkout-order-info">
            <div className="checkout-order-info-content">
              <h2>Order Summary</h2>
              <div className="checkout-line"></div>
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id} className="checkout-item">
                    <table className="checkout-order-table">
                      <tbody>
                        <tr>
                          <td>
                            <img
                              src={item.image}
                              className="checkout-full-width"
                              alt={item.name}
                            />
                          </td>
                          <td>
                            <br />
                            <span className="checkout-thin">{item.brand}</span>
                            <br />
                            {item.name}
                            <br />
                            <span className="checkout-thin checkout-small">
                              {item.description}
                              <br />
                              <br />
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="checkout-price">
                              ${item.price} x {item.quantity}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </li>
                ))}
              </ul>
              <h5>Delivery : $5</h5>
              <div className="checkout-line"></div>
              <div className="checkout-total">
                <h3>Total: ${calculateTotal()}</h3>
              </div>
            </div>
          </div>
          <div className="checkout-credit-info">
            <div className="checkout-credit-info-content">
              <table className="checkout-half-input-table">
                <tbody></tbody>
              </table>
              <img
                src="https://dl.dropboxusercontent.com/s/ubamyu6mzov5c80/visa_logo%20%281%29.png"
                height="120"
                className="checkout-credit-card-image"
                id="credit-card-image"
                alt="Credit Card"
              />
              Card Number
              <input className="checkout-input-field"></input>
              Card Holder
              <input className="checkout-input-field"></input>
              <table className="checkout-half-input-table">
                <tbody>
                  <tr>
                    <td>
                      Expires
                      <input className="checkout-input-field"></input>
                    </td>
                    <td>
                      CVC
                      <input className="checkout-input-field"></input>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="checkout-pay-btn" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="empty-checkout-message">Your cart is empty</p>
      )}
    </div>
  );
};

export default Checkout;
