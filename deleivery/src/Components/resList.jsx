import React, { useState, useEffect } from "react";
import axios from "axios";
import RestaurantCard from "./HomeCard";
import Loader from "./Loader";
import "../Styles/Home.css";

const RestaurantList = ({ selectedCuisine }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/restaurants");
        setRestaurants(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredRestaurants = selectedCuisine
    ? restaurants.filter(
        (restaurant) => restaurant.serverCuisine === selectedCuisine
      )
    : restaurants;

  if (loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="resListSection">
      <div className="mainSection-bg  restaurant-list listUpdateReduis">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
