import React, { useState, useEffect } from "react";
import axios from "axios";
import useLogout from "../Hooks/useLogout";
import "../Styles/OwnerProfile.css";
import MenuComponent from "../Components/MenuComponent";

const OwnerProfile = () => {
  const [selectedItem, setSelectedItem] = useState("Profile");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const handleLogout = useLogout();

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       if (!token) {
  //         window.location.href = "/login"; // Redirect to login if no token
  //         return;
  //       }

  //       const response = await axios.get(
  //         "http://localhost:3000/owner-profile",
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );

  //       if (response.data && response.data.email) {
  //         setProfile(response.data);
  //       } else {
  //         throw new Error("Profile data is not valid");
  //       }
  //     } catch (err) {
  //       setError(
  //         "Failed to load profile: " +
  //           (err.response?.data?.message || err.message)
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfile();
  // }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div className="error-message">{error}</div>;

  const renderContent = () => {
    if (!profile) return <div>No profile data available</div>;

    if (profile.status === "pending") {
      return (
        <div>
          <h2>Waiting for Admin Approval</h2>
          <p>
            Your profile is under review. Please wait until the admin approves
            your profile.
          </p>
        </div>
      );
    }

    switch (selectedItem) {
      case "Profile":
        return (
          <div className="profile-content">
            <h2>Welcome {profile.ownerName}</h2>
            <div className="profile-item">
              <label>Name of Restaurant:</label>
              <span>{profile.restaurantName}</span>
            </div>
            <div className="profile-item">
              <label>Name of Owner:</label>
              <span>{profile.ownerName}</span>
            </div>
            <div className="profile-item">
              <label>Address:</label>
              <span>{profile.address}</span>
            </div>
            <div className="profile-item">
              <label>Category of Restaurant:</label>
              <span>{profile.category}</span>
            </div>
            <div className="profile-item">
              <label>Email:</label>
              <span>{profile.email}</span>
            </div>
            <div className="profile-item">
              <label>Phone Number:</label>
              <span>{profile.phoneNumberOwner}</span>
            </div>
          </div>
        );
      case "Menu":
        return <MenuComponent />;
      case "Orders History":
        return <div>Orders History Content</div>;
      case "Messages":
        return <div>Messages Content</div>;
      default:
        return <div>Profile Content</div>;
    }
  };

  return (
    <div className="OwnerProfileContainer">
      <div className="OwnerProfileContainer-list">
        <img src="path_to_your_image.jpg" alt="Profile" />
        <ul>
          <li onClick={() => setSelectedItem("Profile")}>Profile</li>
          <li onClick={() => setSelectedItem("Menu")}>Menu</li>
          <li onClick={() => setSelectedItem("Orders History")}>
            Orders History
          </li>
          <li onClick={() => setSelectedItem("Messages")}>Messages</li>
          <li
            onClick={handleLogout}
            style={{
              backgroundColor: "red",
              color: "white",
              marginTop: "10px",
            }}>
            Logout
          </li>
        </ul>
      </div>
      <div className="OwnerProfileContainer-display">{renderContent()}</div>
    </div>
  );
};

export default OwnerProfile;
