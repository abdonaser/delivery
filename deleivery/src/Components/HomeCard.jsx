import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../Styles/HomeCard.css";
import { setSelectedRestaurant } from "../redux/actions";

function RestaurantCard({ restaurant }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowMenu = () => {
    dispatch(setSelectedRestaurant(restaurant));
    navigate(`/restaurant/${restaurant.id}`); // Navigate using ID
  };
  return (
    <div className="restaurant-card pb-4">
      <img
        src={restaurant.imageUrl}
        alt={restaurant.name}
        className="restaurant-image"
      />
      <h3 className="restaurant-name">{restaurant.name}</h3>
      <p className="restaurant-rating">⭐ {restaurant.rating}</p>
      <p className="restaurant-cuisine">{restaurant.serverCuisine}</p>
      <button className="show-menu-button mb-3" onClick={handleShowMenu}>
        Show Menu
      </button>
    </div>
  );
}

export default RestaurantCard;
