import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../Styles/joinUs.css";

const JoinUs = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    restaurantName: "",
    address: "",
    phoneNumberOwner: "",
    phoneNumberRestaurant: "",
    serverCuisine: "",
    taxNumber: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3000/join-us",
        formData
      );
      setMessage(response.data.message);
      setFormData({
        ownerName: "",
        restaurantName: "",
        address: "",
        phoneNumberOwner: "",
        phoneNumberRestaurant: "",
        serverCuisine: "",
        taxNumber: "",
        email: "",
        password: "",
      });
      navigate("/signup");
    } catch (err) {
      setError("Error submitting the form");
      console.error(err);
    }
  };

  return (
    <div className="container  pb-5">
      <div className="joinUs">
        <Typography variant="h4" className="mb-3 fw-bold">
          Join Us
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Owner Name"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Restaurant Name"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number (Owner)"
                name="phoneNumberOwner"
                value={formData.phoneNumberOwner}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number (Restaurant)"
                name="phoneNumberRestaurant"
                value={formData.phoneNumberRestaurant}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Category"
                name="serverCuisine"
                value={formData.serverCuisine}
                onChange={handleChange}
                fullWidth
                required
                select
                SelectProps={{ native: true }}
              >
                <option value="" disabled></option>
                <option value="Burger">Burger</option>
                <option value="Pizza">Pizza</option>
                <option value="Chicken">Chicken</option>
                <option value="Pasta">Pasta</option>
                <option value="Drinks">Drinks</option>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Tax Number"
                name="taxNumber"
                value={formData.taxNumber}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="joinUs-button py-2 px-3"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>

        {message && <Typography color="green">{message}</Typography>}
        {error && <Typography color="red">{error}</Typography>}
      </div>
    </div>
  );
};

export default JoinUs;
