import React, { useState, useEffect } from "react";
import axios from "axios";
import OwnerMenu from "../Components/OwnerMenu";
import "../Styles/OwnerProfile.css";
import { FaEdit } from "react-icons/fa";
import OrderManagement from "../Components/OrderManage";

const OwnerProfile = () => {
  const [activeView, setActiveView] = useState("profile");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoUrl, setLogoUrl] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          window.location.href = "/login"; // Redirect to login if no token
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/owner-profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Profile data:", response.data); // Log the response data
        setProfile(response.data);
      } catch (err) {
        console.error("Error fetching profile", err);
        setError(
          `Failed to load profile: ${
            err.response?.data?.message || err.message
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogoUpdate = async (restaurantId, logoUrl) => {
    // console.log("Updating logo for restaurant ID:", restaurantId);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }

      const response = await axios.put(
        `http://localhost:3000/restaurants/${restaurantId}/logo`,
        { logoUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Logo updated successfully:", response.data);
      setProfile((prevProfile) => ({
        ...prevProfile,
        restaurants: prevProfile.restaurants.map((restaurant) =>
          restaurant.id === restaurantId
            ? { ...restaurant, imageUrl: logoUrl }
            : restaurant
        ),
      }));
      setEditMode(false);
    } catch (err) {
      console.error(
        "Failed to upload logo:",
        err.response?.data?.message || err.message
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (profile.restaurants && profile.restaurants.length > 0) {
      handleLogoUpdate(profile.restaurants[0].id, logoUrl);
    } else {
      console.error("No restaurants found for this owner");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!profile) return <div>No profile found</div>;
  console.log(profile.restaurants[0].id);
  return (
    <div className="owner-profile-container">
      <div className="sidebar">
        <button
          className={`sidebar-button ${
            activeView === "profile" ? "active" : ""
          }`}
          onClick={() => setActiveView("profile")}>
          Profile
        </button>
        <button
          className={`sidebar-button ${activeView === "menu" ? "active" : ""}`}
          onClick={() => setActiveView("menu")}>
          Owner Menu
        </button>
        <button
          className={`sidebar-button ${activeView === "order" ? "active" : ""}`}
          onClick={() => setActiveView("order")}>
          Orders
        </button>
      </div>
      <div className="profile-content">
        {activeView === "profile" && (
          <div className="profile-info-container">
            <div className="logo-container">
              <img
                src={
                  profile.restaurants[0]?.imageUrl ||
                  "data:image/png;base64,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"
                }
                alt="Restaurant Logo"
                className="restaurant-logo"
              />
              <button
                className="edit-logo-button"
                onClick={() => setEditMode(!editMode)}>
                <FaEdit />
              </button>
            </div>
            {editMode && (
              <form onSubmit={handleSubmit} className="edit-form  ">
                <label>
                  Update Logo URL:
                  <br />
                  <input
                    type="text"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                  />
                </label>
                <button type="submit">Update Logo</button>
              </form>
            )}
            <h1>Your Profile Details</h1>
            <div className="profile-info ">
              <div className="ownerResDetails">
                <div className="detailsContainer">
                  <p className="headerDetails"> Your Restaurant Name : </p>
                  <p className="detailsDetails">{profile.restaurantName}</p>
                </div>
                <div className="detailsContainer">
                  <p className="headerDetails"> Your Restaurant Cuisine : </p>
                  <p className="detailsDetails">{profile.serverCuisine}</p>
                </div>

                <div className="detailsContainer">
                  <p className="headerDetails"> Your Restaurant Email : </p>
                  <p className="detailsDetails">{profile.email}</p>
                </div>

                <div className="detailsContainer">
                  <p className="headerDetails"> Your Restaurant Address : </p>
                  <p className="detailsDetails">{profile.address}</p>
                </div>
                <div className="detailsContainer">
                  <p className="headerDetails"> Your Restaurant Number : </p>
                  <p className="detailsDetails">
                    {profile.phoneNumberRestaurant}
                  </p>
                </div>
              </div>
              <div className="ownerDetails">
                <div className="detailsContainer">
                  <p className="headerDetails"> Your Name : </p>
                  <p className="detailsDetails">{profile.ownerName}</p>
                </div>
                <div className="detailsContainer">
                  <p className="headerDetails"> Your Phone Number : </p>
                  <p className="detailsDetails">{profile.phoneNumberOwner}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeView === "menu" && (
          <div className="owner-menu">
            <OwnerMenu restaurants={profile.restaurants} />
          </div>
        )}

        {activeView === "order" && (
          <div className="owner-menu ">
            <OrderManagement restaurantId={profile.restaurants[0].id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerProfile;
