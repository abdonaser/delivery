import React, { useState } from "react";
import axios from "axios";
import "../Styles/OwnerMenu.css";

const OwnerMenu = ({ restaurants }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(
    restaurants[0] || null
  );
  const [newMenuItem, setNewMenuItem] = useState({
    name: "",
    price: "",
    rating: 0,
    image: "",
  });
  const [error, setError] = useState("");
  const [editItem, setEditItem] = useState(null);

  const handleMenuChange = (e) => {
    const { name, value } = e.target;
    setNewMenuItem((prevData) => ({
      ...prevData,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const addMenuItem = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please log in.");
        return;
      }

      const response = await axios.post(
        `http://localhost:3000/restaurants/${selectedRestaurant.id}/menu`,
        newMenuItem,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedRestaurant = response.data;
      setSelectedRestaurant(updatedRestaurant);
      setNewMenuItem({
        name: "",
        price: "",
        rating: 0,
        image: "",
      });
    } catch (err) {
      setError(
        `Failed to add menu item: ${err.response?.data?.message || err.message}`
      );
    }
  };

  const deleteMenuItem = async (menuItemId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please log in.");
        return;
      }
  
      await axios.delete(
        `http://localhost:3000/restaurants/${selectedRestaurant.id}/menu/${menuItemId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const updatedRestaurant = {
        ...selectedRestaurant,
        menu: selectedRestaurant.menu.filter((item) => item.id !== menuItemId),
      };
      setSelectedRestaurant(updatedRestaurant);
    } catch (err) {
      setError(
        `Failed to delete menu item: ${err.response?.data?.message || err.message}`
      );
    }
  };
  
  const updateMenuItem = async (menuItemId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please log in.");
        return;
      }
  
      const response = await axios.put(
        `http://localhost:3000/restaurants/${selectedRestaurant.id}/menu/${menuItemId}`,
        editItem,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const updatedRestaurant = response.data;
      setSelectedRestaurant(updatedRestaurant);
      setEditItem(null);
    } catch (err) {
      setError(
        `Failed to update menu item: ${err.response?.data?.message || err.message}`
      );
    }
  };
  

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditItem((prevData) => ({
      ...prevData,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  if (!selectedRestaurant)
    return <div>Select a restaurant to manage the menu.</div>;

  return (
    <div className="owner-menu-container">
      {selectedRestaurant.menu && (
        <div>
          <h2>Manage Menu for {selectedRestaurant.name}</h2>
          <form onSubmit={addMenuItem}>
            <label>
              Dish Name: <br/>
              <input className="add-owner-menu"
                type="text"
                name="name"
                value={newMenuItem.name}
                onChange={handleMenuChange}
                required
              />
            </label>
            <label>
              Price: <br/>
              <input className="add-owner-menu"
                type="number"
                name="price"
                value={newMenuItem.price}
                onChange={handleMenuChange}
                required
              />
            </label>
            <label>
              Rating: <br/>
              <input className="add-owner-menu"
                type="number"
                name="rating"
                value={newMenuItem.rating}
                onChange={handleMenuChange}
                required
              />
            </label>
            <label>
              Image URL: <br/>
              <input className="add-owner-menu"
                type="text"
                name="image"
                value={newMenuItem.image}
                onChange={handleMenuChange}
                required
              />
            </label>
            <button type="submit">Add Menu Item</button>
          </form>

          <h3>Menu Items</h3>
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
              {selectedRestaurant.menu.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.rating}</td>
                  <td>
                    <img src={item.image} alt={item.name} width={"50px"} />
                  </td>
                  <td>
                    <button onClick={() => deleteMenuItem(item.id)} className="delete-btn-menu-item">
                      Delete
                    </button>
                    <button onClick={() => setEditItem(item)} className="edit-btn-menu-item">Edit</button>
                    {editItem && editItem.id === item.id && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          updateMenuItem(item.id);
                        }}
                      >
                        <label>
                          Dish Name:
                          <input className="add-owner-menu"
                            type="text"
                            name="name"
                            value={editItem.name}
                            onChange={handleEditChange}
                            required
                          />
                        </label>
                        <label>
                          Price: 
                          <input className="add-owner-menu"
                            type="number"
                            name="price"
                            value={editItem.price}
                            onChange={handleEditChange}
                            required
                          />
                        </label>
                        <label>
                          Rating:
                          <input className="add-owner-menu"
                            type="number"
                            name="rating"
                            value={editItem.rating}
                            onChange={handleEditChange}
                            required
                          />
                        </label>
                        <label>
                          Image URL:
                          <input className="add-owner-menu"
                            type="text"
                            name="image"
                            value={editItem.image}
                            onChange={handleEditChange}
                            required
                          />
                        </label>
                        <button type="submit">Update Menu Item</button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OwnerMenu;
