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

      // Directly update the menu without a full re-render
      setSelectedRestaurant((prev) => ({
        ...prev,
        menu: [...prev.menu, response.data],
      }));
      setNewMenuItem({
        name: "",
        price: "",
        rating: 0,
        image: "",
      });
      setError(""); // Clear any previous errors
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

      // Update the state to remove the deleted item
      setSelectedRestaurant((prev) => ({
        ...prev,
        menu: prev.menu.filter((item) => item.id !== menuItemId),
      }));
    } catch (err) {
      setError(
        `Failed to delete menu item: ${
          err.response?.data?.message || err.message
        }`
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

      // Update the state to reflect the edited item
      setSelectedRestaurant((prev) => ({
        ...prev,
        menu: prev.menu.map((item) =>
          item.id === menuItemId ? response.data : item
        ),
      }));
      setEditItem(null);
      setError(""); // Clear any previous errors
    } catch (err) {
      setError(
        `Failed to update menu item: ${
          err.response?.data?.message || err.message
        }`
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
    <div className="owner-menu-container ">
      {error && <div className="error">{error}</div>}
      {selectedRestaurant.menu && (
        <div className=" ">
          <h2>
            Manage Menu for{" "}
            <span className="restName">{selectedRestaurant.name}</span>
          </h2>
          <form onSubmit={addMenuItem} className="menuItemForm">
            <label>
              Dish Name: <br />
              <input
                className="add-owner-menu"
                type="text"
                name="name"
                value={newMenuItem.name}
                onChange={handleMenuChange}
                required
              />
            </label>
            <label>
              Price: <br />
              <input
                className="add-owner-menu"
                type="number"
                name="price"
                value={newMenuItem.price}
                onChange={handleMenuChange}
                required
              />
            </label>
            <label>
              Rating: <br />
              <input
                className="add-owner-menu"
                type="number"
                name="rating"
                value={newMenuItem.rating}
                onChange={handleMenuChange}
                required
              />
            </label>
            <label>
              Image URL: <br />
              <input
                className="add-owner-menu"
                type="text"
                name="image"
                value={newMenuItem.image}
                onChange={handleMenuChange}
                required
              />
            </label>
            <div className="addMenueItem">
              <button type="submit">Add Menu Item</button>
            </div>
          </form>
          <h3>Menu Items</h3>
          <table className="table table-striped table-bordered  ">
            <thead>
              <tr className="text-center align-center">
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
                    <button
                      onClick={() => deleteMenuItem(item.id)}
                      className="delete-btn-menu-item">
                      Delete
                    </button>
                    <button
                      onClick={() => setEditItem(item)}
                      className="edit-btn-menu-item">
                      Edit
                    </button>
                    {editItem && editItem.id === item.id && (
                      <form
                        className="fromInputUpdate"
                        onSubmit={(e) => {
                          e.preventDefault();
                          updateMenuItem(item.id);
                        }}>
                        <div className="w-100 handelFieldUpdate d-flex jusify-content-start align-items-center p-2">
                          <label htmlFor="name" for className="w-25 form-label">
                            Dish Name :
                          </label>
                          <input
                            id="name"
                            className="form-control add-owner-menu w-75"
                            type="text"
                            name="name"
                            value={editItem.name}
                            onChange={handleEditChange}
                            required
                          />
                        </div>
                        <div className="w-100 handelFieldUpdate d-flex jusify-content-start align-items-center p-2">
                          <label
                            htmlFor="price"
                            for
                            className="w-25 form-label">
                            Price:
                          </label>
                          <input
                            id="price"
                            className="form-control add-owner-menu w-75"
                            type="number"
                            name="price"
                            value={editItem.price}
                            onChange={handleEditChange}
                            required
                          />
                        </div>

                        <div className="w-100 handelFieldUpdate d-flex jusify-content-start align-items-center p-2">
                          <label
                            htmlFor="rating"
                            for
                            className="w-25 form-label">
                            Rating:
                          </label>
                          <input
                            id="rating"
                            className="form-control add-owner-menu w-75"
                            type="number"
                            name="rating"
                            value={editItem.rating}
                            onChange={handleEditChange}
                            required
                          />
                        </div>

                        <div className="w-100 handelFieldUpdate d-flex jusify-content-start align-items-center p-2">
                          <label
                            htmlFor="image"
                            for
                            className="w-25 form-label">
                            Image URL:
                          </label>
                          <input
                            id="image"
                            className="form-control add-owner-menu w-75"
                            type="text"
                            name="image"
                            value={editItem.image}
                            onChange={handleEditChange}
                            required
                          />
                        </div>
                        <div className="text-center w-100 p-2">
                          <button type="submit">Update Menu Item</button>
                        </div>
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
