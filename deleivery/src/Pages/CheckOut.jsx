import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Checkout.css";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const userId = useSelector((state) => state.auth.userId); // Ensure correct selector for userId
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
      userId, // Include the user ID in the order
    };

    console.log("User ID before sending order:", userId); // Debug log

    try {
      console.log("Sending order:", order);
      const response = await axios.post(
        "http://localhost:3000/api/orders",
        order
      );
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
        <div className="checkContainer">
          <div className="container p-2">
            <h1>Checkout</h1>

            <div className="check">
              <div className="rightcheck">
                <h2 className="text-start">Your Orders</h2>
                <div className="cartItems">
                  {cartItems.map((item) => (
                    <div className="cartItem">
                      <div className="cartItemImage">
                        <img
                          src="../../public/Images/LogPageImage/meal-4.jpg"
                          className="w-100 h-100"
                          alt=""
                        />
                      </div>
                      <div className="cartItemDetails">
                        <h3>{item.name}</h3>
                        <p className="text-muted">Qty {item.quantity}</p>
                      </div>
                      <div className="cartItemPrice">
                        <h3>{item.price}</h3>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="finalBalance">
                  <div className="subtotal">
                    <h4 className="">Subtotal</h4>
                    <p>${calculateTotal() - 5}</p>
                  </div>
                  <div className="shpping ">
                    <h4 className="">Shipping</h4>
                    <p>$5</p>
                  </div>
                  <div className="totalDue">
                    <h4 className="">total Due</h4>
                    <p>${calculateTotal()}</p>
                  </div>
                </div>
              </div>
              <div className="leftCheck">
                <h3>Shipping Information</h3>
                <div className="emailInfo">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                  />
                </div>

                <div className="shippingAddress">
                  <h5>Shipping address</h5>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    className="form-control firstInput"
                  />
                  <select
                    class="form-select"
                    aria-label="Default select example">
                    <option selected>Elmarg</option>
                    <option value="Giza">Giza</option>
                    <option value="Sheikh zayed">Sheikh zayed</option>
                    <option value="Ain Shams">Ain Shams</option>
                  </select>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Address"
                    className="form-control lastInput"
                  />
                </div>
                <div className="paymentDetails">
                  <h5>cart Information</h5>
                  <div className="cartNumber w-100">
                    <input
                      type="number"
                      name="cartNumber"
                      id="cartNumber"
                      placeholder="1234 1234 1234 1234"
                      className="form-control "
                    />
                    <div className="d-flex">
                      <input
                        type="number"
                        name="cartNumber"
                        id="cartNumber"
                        placeholder="MM / YY"
                        className="form-control w-50 arround-0  "
                      />
                      <input
                        type="number"
                        name="cartNumber"
                        id="cartNumber"
                        placeholder="CVC"
                        className="form-control  w-50 arround-0 "
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex - justify-content-center">
                  <button
                    className="btn btn-dark w-75"
                    onClick={handleCheckout}>
                    pay${calculateTotal()}{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="emptyContainer">
          <h2>Shopping Cart</h2>
          <div className="emptyImgContainer">
            <img
              src="public/Images/Cartpage/empty-cart.png"
              alt=""
              className="w-100"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;

// <div className="checkout-window bg-danger p-2">
//   <div className="checkout-order-info">
//     <div className="checkout-order-info-content">
//       <h2>Order Summary</h2>
//       <div className="checkout-line"></div>
//       <ul>
//         {cartItems.map((item) => (
//           <li key={item.id} className="checkout-item">
//             <table className="checkout-order-table">
//               <tbody>
//                 <tr>
//                   <td>
//                     <img
//                       src={item.image}
//                       className="checkout-full-width"
//                       alt={item.name}
//                     />
//                   </td>
//                   <td>
//                     <br />
//                     <span className="checkout-thin">{item.brand}</span>
//                     <br />
//                     {item.name}
//                     <br />
//                     <span className="checkout-thin checkout-small">
//                       {item.description}
//                       <br />
//                       <br />
//                     </span>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <div className="checkout-price">
//                       ${item.price} x {item.quantity}
//                     </div>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </li>
//         ))}
//       </ul>
//       <h5>Delivery : $5</h5>
//       <div className="checkout-line"></div>
//       <div className="checkout-total">
//         <h3>Total: ${calculateTotal()}</h3>
//       </div>
//     </div>
//   </div>
//   <div className="checkout-credit-info">
//     <div className="checkout-credit-info-content">
//       <table className="checkout-half-input-table">
//         <tbody></tbody>
//       </table>
//       <img
//         src="https://dl.dropboxusercontent.com/s/ubamyu6mzov5c80/visa_logo%20%281%29.png"
//         height="120"
//         className="checkout-credit-card-image"
//         id="credit-card-image"
//         alt="Credit Card"
//       />
//       Card Number
//       <input className="checkout-input-field"></input>
//       Card Holder
//       <input className="checkout-input-field"></input>
//       <table className="checkout-half-input-table">
//         <tbody>
//           <tr>
//             <td>
//               Expires
//               <input className="checkout-input-field"></input>
//             </td>
//             <td>
//               CVC
//               <input className="checkout-input-field"></input>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//       <button className="checkout-pay-btn" onClick={handleCheckout}>
//         Checkout
//       </button>
//     </div>
//   </div>
// </div>
