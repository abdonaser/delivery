import React, { useState, useEffect } from "react";
import "../Styles/adminPrfile.css";
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

  if (loading)
    return (
      <div className="vh-100 w-100 d-flex align-items-center justify-content-center">
        <CircularProgress />
      </div>
    );
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div style={{ padding: "20px", fontSize: "50px" }}>
      <Typography
        sx={{
          margin: "50px 20px 0 20px",
          borderBottom: "1px solid black",
          padding: "30px 10px",
        }}
        variant="h4"
        gutterBottom>
        Pending Registrations
      </Typography>
      <List sx={{ width: "80%", margin: "20px auto" }}>
        {pendingRegistrations.length > 0 ? (
          pendingRegistrations.map((registration) => (
            <ListItem
            size="large"
              key={registration.id}
              sx={{
                margin: "20px 0",
                fontSize: "60px",
              }}
              divider>
              <ListItemText
                
                sx={{
                  margin: "20px 0",
                }}
                primary={`Restaurant Name: ${registration.restaurantName}`}
                secondary={`Owner: ${registration.ownerName} | Email: ${registration.email}`}
              />
              <Button
                className="btn-approve"
                variant="contained"
                color="primary"
                onClick={() => handleApprove(registration.id)}>
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
