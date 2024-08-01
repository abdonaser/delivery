import React, { useState } from "react";
import "../Styles/Home.css";
import Slider from "../Components/Slider";
import HomeCategories from "../Components/HomeCategories";
import TrustedBrandsAndWhy from "../Components/TrustedBrandsAndWhy";
import CustomerReview from "../Components/CustomerReviews";
import RestaurantList from "../Components/resList";

const Home = () => {
  const [selectedCuisine, setSelectedCuisine] = useState("Burger");

  return (
    <>
      <Slider />
      <HomeCategories setSelectedCuisine={setSelectedCuisine} />
      <RestaurantList selectedCuisine={selectedCuisine} />
      <TrustedBrandsAndWhy />
      <CustomerReview />
    </>
  );
};

export default Home;
