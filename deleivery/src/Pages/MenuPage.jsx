import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cart from "../Components/Cart";
import { addToCart } from "../redux/actions"; // Ensure addToCart is imported
import "../Styles/MenuPage.css";

const MenuPage = () => {
  const { id } = useParams(); // Get restaurant ID from URL parameters
  const dispatch = useDispatch();

  // Access the selected restaurant and customer info from Redux store
  const restaurant = useSelector(
    (state) => state.restaurant.selectedRestaurant
  );
  const customer = useSelector((state) => state.customer.info);

  // State variables for menu and loading/error states
  const [menu, setMenu] = useState([]);
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch restaurant details and menu when component mounts or ID changes
  useEffect(() => {
    if (id) {
      fetchRestaurantDetails(id);
      fetchMenu(id);
    }
  }, [id, dispatch]);

  // Fetch restaurant details
  const fetchRestaurantDetails = async (restaurantId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/restaurants/${restaurantId}`
      );
      if (!response.ok) {
        throw new Error(
          `Network response was not ok: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      setRestaurantDetails(data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Fetch menu items
  const fetchMenu = async (restaurantId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/restaurants/${restaurantId}/menu`
      );
      if (!response.ok) {
        throw new Error(
          `Network response was not ok: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      setMenu(data.menu);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Display loading or error messages
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Handle adding item to cart
  const handleAddToCart = (item) => {
    if (!customer) {
      alert("Please log in to add items to the cart.");
      return;
    }
    dispatch(
      addToCart(
        {
          ...item,
          restaurantId: restaurantDetails.id,
          restaurantName: restaurantDetails.name,
          customerName: customer.name, // Ensure customer name is included
        },
        1
      )
    );
  };

  return (
    <div className="menu-page-container">
      {restaurantDetails && (
        <div className="menu-page-restaurant-info">
          <img
            src={restaurantDetails.imageUrl || ""}
            alt={restaurantDetails.name || "Restaurant Logo"}
            className="menu-page-restaurant-logo"
          />
          <div className="menu-page-restaurant-details">
            <h1>{restaurantDetails.name || "Restaurant Name"} Menu</h1>
            <p>Rating: {restaurantDetails.rating || ""} ⭐ </p>
          </div>
        </div>
      )}
      <div className="menu-page-content">
        <div className="menu-page-categories">
          <h2>Categories</h2>
          <ul>
            {/* Replace with actual categories */}
            <li>Category 1</li>
            <li>Category 2</li>
            <li>Category 3</li>
          </ul>
        </div>
        <div className="menu-page-items">
          <h2>Menu Items</h2>
          {menu.length > 0 ? (
            <ul>
              {menu.map((item) => (
                <li key={item.id} className="menu-page-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="menu-page-item-image"
                  />
                  <div className="menu-page-item-details">
                    <h3>{item.name}</h3>
                    <p>Price: {item.price}</p>
                    <p>Rating: {item.rating}</p>
                    <button onClick={() => handleAddToCart(item)}>
                      Add to Cart
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No menu items available</p>
          )}
        </div>
        <Cart />
      </div>
    </div>
  );
};

export default MenuPage;
