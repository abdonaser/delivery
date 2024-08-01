import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
} from "@mui/material";

const AdminProfile = () => {
  const [pendingRegistrations, setPendingRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    } catch (err) {
      setError("Error approving registration");
      console.error(err);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Pending Registrations
      </Typography>
      <List>
        {pendingRegistrations.length > 0 ? (
          pendingRegistrations.map((registration) => (
            <ListItem key={registration.id} divider>
              <ListItemText
                primary={`Restaurant Name: ${registration.restaurantName}`}
                secondary={`Owner: ${registration.ownerName} | Email: ${registration.email}`}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleApprove(registration.id)}
              >
                Approve
              </Button>
            </ListItem>
          ))
        ) : (
          <Typography>No pending registrations</Typography>
        )}
      </List>
    </div>
  );
};

export default AdminProfile;
