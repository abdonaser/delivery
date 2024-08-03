import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import userInfo from "../Styles/customerPrifile.module.css";
import { useSelector } from "react-redux";

const CustomerOrders = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [orders, setOrders] = useState([]);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/orders/user/${userId}/status/delivered`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    console.log(panel);
  };

  const [order, setOrder] = useState(null);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/orders/`);

        setOrder(response.data);
        console.log("response  ", response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, []);
  console.log(orders);
  return (
    <div>
      <h1>Delivered Orders</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <Accordion
            key={order.id}
            expanded={expanded === `panel${order.id}`}
            onChange={handleChange(`panel${order.id}`)}
            sx={{ marginTop: "20px", borderRadius: "30px" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${order.id}-content`}
              id={`panel${order.id}-header`}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "2px solid red",
              }}
            >
              <Typography
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  <div className="orderDetails-Right">
                    <p>Order Number: {order.id}</p>
                    <h4 className="resName fw-bold text-capitalize">
                      {order.restaurantName}
                    </h4>
                  </div>
                </Typography>

                <Typography
                  sx={{
                    color: "text.secondary",
                    width: "33%",
                    marginLeft: "auto",
                  }}
                >
                  <div className="orderDetails-left">
                    <div className="cartInfo">
                      <p>
                        Total Cost:{" "}
                        <span className="totalCartCost">${order.total}</span>
                      </p>
                      <p>At: {new Date(order.orderTime).toLocaleString()}</p>
                    </div>
                  </div>
                </Typography>
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography>
                <div>
                  {order.items.map((item) => (
                    <div key={item.id} className="cartItem mb-2 d-flex ms-auto">
                      <div className="itemImageContainer itemImage">
                        <img src={item.image} className=" " alt={item.name} width={"80px"}/>
                      </div>
                      <div className="itemDetails d-flex justify-content-between w-100 align-items-center">
                        <div className="itemDescription">
                          <h5 className="fw-medium fs-4">{item.name}</h5>
                          <p className="text-muted">{item.description}</p>
                        </div>
                        <div className="itemPrice">
                          <h5 className="itemPrice">${item.price}</h5>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <p>No delivered orders found.</p>
      )}
    </div>
  );
};

export default CustomerOrders;
