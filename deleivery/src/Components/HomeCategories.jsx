import React, { useState } from "react";
import "../Styles/Home.css";

const menuItems = [
  { label: "Burger", icon: "🍔" },
  { label: "Pizza", icon: "🍕" },
  { label: "Chicken", icon: "🍗" },
  { label: "Pasta", icon: "🍝" },
  { label: "Drinks", icon: "🥤" },
];

const HomeCategories = ({ setSelectedCuisine }) => {
  const initialIndex = menuItems.findIndex((item) => item.label === "Burger");
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const handleCategoryClick = (index, label) => {
    setActiveIndex(index);
    setSelectedCuisine(label);
  };

  return (
    <div className="menu-container">
      <h2 className="menu-title">Most Popular Restaurants</h2>
      <div className="menu">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`menu-item ${index === activeIndex ? "active" : ""}`}
            onClick={() => handleCategoryClick(index, item.label)}
          >
            <div className="menu-icon">{item.icon}</div>
            <div className="menu-label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
