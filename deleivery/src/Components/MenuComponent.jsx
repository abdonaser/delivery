import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/MenuComponent.css";

const MenuComponent = () => {
  const [ownerProfile, setOwnerProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    rating: "",
    category: "",
    imageUrl: "",
    menu: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    const fetchOwnerProfile = async () => {
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

        if (response.data) {
          setOwnerProfile(response.data);

          // Set default values for formData from ownerProfile
          setFormData({
            ...formData,
            name: response.data.restaurantName || "",
            category: response.data.category || "",
          });
        } else {
          throw new Error("Profile data is not valid");
        }
      } catch (err) {
        setError(
          "Failed to load profile: " +
            (err.response?.data?.message || err.message)
        );
      }
    };

    fetchOwnerProfile();
  }, []);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("http://localhost:3000/restaurants");
        setRestaurants(response.data);
      } catch (err) {
        setError(
          "Failed to load restaurants: " +
            (err.response?.data?.message || err.message)
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMenuChange = (index, field, value) => {
    const updatedMenu = [...formData.menu];
    updatedMenu[index] = { ...updatedMenu[index], [field]: value };
    setFormData({ ...formData, menu: updatedMenu });
  };

  const addMenuItem = () => {
    setFormData({
      ...formData,
      menu: [
        ...formData.menu,
        { id: Date.now(), name: "", price: "", rating: "", image: "" },
      ],
    });
  };

  const removeMenuItem = (index) => {
    const updatedMenu = formData.menu.filter((_, i) => i !== index);
    setFormData({ ...formData, menu: updatedMenu });
  };

  const updateMenuItem = async (index) => {
    const updatedMenuItem = formData.menu[index];
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/menu/${updatedMenuItem.id}`,
        updatedMenuItem,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Menu item updated successfully!");
    } catch (err) {
      setError(
        "Failed to update menu item: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      rating: parseFloat(formData.rating),
      menu: formData.menu.map((item) => ({
        ...item,
        price: item.price,
        rating: parseFloat(item.rating),
      })),
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please log in.");
        return;
      }
      console.log("Sending data:", updatedFormData);
      await axios.post("http://localhost:3000/restaurants", updatedFormData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedResponse = await axios.get(
        "http://localhost:3000/restaurants"
      );
      setRestaurants(updatedResponse.data);
      setFormData({
        name: "",
        rating: "",
        category: "",
        imageUrl: "",
        menu: [],
      });
    } catch (err) {
      setError(
        "Failed to add restaurant: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="owner-menu-container">
      {ownerProfile && (
        <div>
          <h3>Welcome, {ownerProfile.ownerName}</h3>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <h3>Add Your Restaurant</h3>
        <label>
          Restaurant Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            disabled
          />
        </label>
        <label>
          Rating:
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            step="0.1"
            min="0"
            max="5"
            required
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            disabled
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
          />
        </label>
        <h4>Menu Items</h4>
        {formData.menu.map((item, index) => (
          <div key={index}>
            <label>
              Name:
              <input
                type="text"
                value={item.name}
                onChange={(e) =>
                  handleMenuChange(index, "name", e.target.value)
                }
              />
            </label>
            <label>
              Price:
              <input
                type="text"
                value={item.price}
                onChange={(e) =>
                  handleMenuChange(index, "price", e.target.value)
                }
              />
            </label>
            <label>
              Rating:
              <input
                type="number"
                value={item.rating}
                onChange={(e) =>
                  handleMenuChange(index, "rating", e.target.value)
                }
                step="0.1"
                min="0"
                max="5"
              />
            </label>
            <label>
              Image URL:
              <input
                type="text"
                value={item.image}
                onChange={(e) =>
                  handleMenuChange(index, "image", e.target.value)
                }
              />
            </label>
            <button type="button" onClick={() => removeMenuItem(index)}>
              Remove Item
            </button>
            <button type="button" onClick={() => updateMenuItem(index)}>
              Update Item
            </button>
          </div>
        ))}
        <button type="button" onClick={addMenuItem}>
          Add Menu Item
        </button>
        <button type="submit">Submit Restaurant</button>
      </form>

      <h3>Current Menu</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {formData.menu.map((item, index) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.rating}</td>
              <td>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "50px" }}
                />
              </td>
              <td>
                <button onClick={() => removeMenuItem(index)}>Delete</button>
                <button onClick={() => updateMenuItem(index)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRestaurant && (
        <div className="restaurant-details">
          <h2>{selectedRestaurant.name}</h2>
          <img
            src={selectedRestaurant.imageUrl}
            alt={`${selectedRestaurant.name} Logo`}
            className="restaurant-logo"
          />
          <p>Rating: {selectedRestaurant.rating}</p>
          <p>Category: {selectedRestaurant.category}</p>
          <h3>Menu</h3>
          <ul>
            {selectedRestaurant.menu.map((item, index) => (
              <li key={index}>
                <p>Name: {item.name}</p>
                <p>Price: {item.price}</p>
                <p>Rating: {item.rating}</p>
                <img
                  src={item.image}
                  alt={item.name}
                  className="menu-item-image"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MenuComponent;
