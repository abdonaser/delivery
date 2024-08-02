import React, { useState, useEffect } from "react";
import axios from "axios";
import OwnerMenu from "../Components/OwnerMenu";
import "../Styles/OwnerProfile.css";
import { FaEdit } from "react-icons/fa";

const OwnerProfile = () => {
  const [activeView, setActiveView] = useState("profile");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!profile) return <div>No profile found</div>;

  return (
    <>
      <div className="owner-profile-container">
        <div className="sidebar">
          <button
            className={`sidebar-button ${
              activeView === "profile" ? "active" : ""
            }`}
            onClick={() => setActiveView("profile")}
          >
            Profile
          </button>
          <button
            className={`sidebar-button ${
              activeView === "menu" ? "active" : ""
            }`}
            onClick={() => setActiveView("menu")}
          >
            Owner Menu
          </button>
        </div>
        <div className="profile-content">
          {activeView === "profile" && (
            <div className="profile-info-container">
              <img src={profile.restaurantName} alt="" />
              <h1>Your Profile Details</h1>
              <div className="profile-info">
                <div className="ownerResDetails">
                  <p>
                    <b>Your Restaurant Name:</b> {profile.restaurantName}
                  </p>
                  <p>
                    <b>Your Restaurant Cuisine:</b> {profile.serverCuisine}
                  </p>
                  <p>
                    <b>Your Restaurant Email:</b> {profile.email}
                  </p>
                  <p>
                    <b>Your Restaurant Address:</b> {profile.address}
                  </p>
                  <p>
                    <b>Your Restaurant Number:</b>{" "}
                    {profile.phoneNumberRestaurant}
                  </p>
                </div>
                <div className="ownerDetails">
                  <p>
                    <b>Your Name:</b> {profile.ownerName}
                  </p>
                  <p>
                    <b>Your Phone Number:</b> {profile.phoneNumberOwner}
                  </p>
                </div>
              </div>
            </div>
          )}
          {activeView === "menu" && (
            <div className="owner-menu">
              <OwnerMenu restaurants={profile.restaurants} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OwnerProfile;
