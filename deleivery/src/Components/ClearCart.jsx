import React from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/actions";

const ClearCartButton = () => {
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <button onClick={handleClearCart} className="clear-cart-button">
      Clear Cart
    </button>
  );
};

export default ClearCartButton;
