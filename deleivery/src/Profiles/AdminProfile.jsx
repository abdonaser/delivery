import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
  Collapse,
} from "@mui/material";
import "../Styles/adminProfile.css";

const AdminProfile = () => {
  const [pendingRegistrations, setPendingRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRegistration, setSelectedRegistration] = useState(null);

  useEffect(() => {
    const fetchPendingRegistrations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/pending-registrations"
        );
        setPendingRegistrations(response.data);
      } catch (err) {
        setError("Error fetching pending registrations");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRegistrations();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:3000/approve-registration/${id}`);
      setPendingRegistrations(
        pendingRegistrations.filter((reg) => reg.id !== id)
      );
      if (selectedRegistration?.id === id) {
        setSelectedRegistration(null); // Deselect if approving the currently selected registration
      }
    } catch (err) {
      setError("Error approving registration");
      console.error(err);
    }
  };

  const handleSelect = (registration) => {
    setSelectedRegistration(
      selectedRegistration?.id === registration.id ? null : registration
    );
  };

  if (loading)
    return (
      <div className="vh-100 w-100 d-flex align-items-center justify-content-center">
        <CircularProgress />
      </div>
    );
  if (error) return <Typography className="error-message">{error}</Typography>;

  return (
    <div className="admin-profile-container">
      <Typography className="admin-profile-header" variant="h4" gutterBottom>
        Pending Registrations
      </Typography>
      <List className="admin-profile-list">
        {pendingRegistrations.length > 0 ? (
          pendingRegistrations.map((registration) => (
            <div key={registration.id}>
              <ListItem
                className="admin-profile-list-item"
                divider
                onClick={() => handleSelect(registration)}
                style={{ cursor: "pointer" }}
              >
                <ListItemText
                  primary={`Restaurant Name: ${registration.restaurantName}`}
                  secondary={`Owner: ${registration.ownerName} | Email: ${registration.email}`}
                />
                <Button
                  variant="contained"
                  className="btn-approve"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApprove(registration.id);
                  }}
                >
                  Approve
                </Button>
              </ListItem>
              <Collapse in={selectedRegistration?.id === registration.id}>
                <div className="admin-profile-details">
                  <Typography variant="h6">Details:</Typography>
                  <Typography>
                    Restaurant Name: {registration.restaurantName}
                  </Typography>
                  <Typography>Owner: {registration.ownerName}</Typography>
                  <Typography>Email: {registration.email}</Typography>
                  <Typography>Address: {registration.address}</Typography>
                  <Typography>
                    Phone Number: {registration.phoneNumber}
                  </Typography>
                  <Typography>Category: {registration.category}</Typography>
                  <Typography>Tax Number: {registration.taxNumber}</Typography>
                </div>
              </Collapse>
            </div>
          ))
        ) : (
          <Typography>No pending registrations</Typography>
        )}
      </List>
    </div>
  );
};

export default AdminProfile;
