import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import userInfo from "../Styles/customerPrifile.module.css";
const CustomerOrders = () => {
  const [expanded, setExpanded] = React.useState(false);

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
  

  return (
    <>
      {/* //!1 please replace "1" by order NUmber ------------------*/}

      <Accordion
        expanded={expanded === "1"}
        onChange={handleChange("1")}
        sx={{ marginTop: "20px", borderRadius: "30px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={
            {
              // display: "flex",
              // justifyContent: "space-between",
              // alignItems: "center",
              // borderBottom: "2px solid red",
            }
          }>
          <Typography
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "2px solid red",
            }}>
            <Typography
              sx={{
                width: "33%",
                flexShrink: 0,
              }}>
              <div className="orderDetails-Right">
                <p>orderNum : 1</p>
                <h4 className="resName fw-bold text-capitalize">
                  Hala Restaurant
                </h4>
              </div>
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                width: "33%",

                marginLeft: "auto",
              }}>
              <div className="orderDetails-left  ">
                <div className="cartInfo ">
                  <p>
                    TotalCost : <span className="totalCartCost">150$</span>
                  </p>
                  <p>At : 20/4/2024 - 0:15 pm</p>
                </div>
              </div>
            </Typography>
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography>
            <div>
              <div
                className={userInfo.cardItem + " cartItem mb-2 d-flex ms-auto"}>
                <div className={userInfo.itemImageContainer + "  itemImage"}>
                  <img
                    src="../../../public/Images/LogPageImage/meal-1.jpg"
                    className=" "
                    alt=""
                  />
                </div>
                <div
                  className={
                    userInfo.itemDetails +
                    " itemDetails d-flex  justify-content-between w-100 align-items-center"
                  }>
                  <div className="itemDescription">
                    <h5 className="fw-medium fs-4">Pizza</h5>
                    <p className="text-muted">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptate.
                    </p>
                  </div>
                  <div className="itemPrice">
                    <h5 className={userInfo.itemPrice + " "}>$180</h5>
                  </div>
                </div>
              </div>
              <div
                className={userInfo.cardItem + " cartItem mb-2 d-flex ms-auto"}>
                <div className={userInfo.itemImageContainer + "  itemImage"}>
                  <img
                    src="../../../public/Images/LogPageImage/meal-2.jpg"
                    className=" "
                    alt=""
                  />
                </div>
                <div
                  className={
                    userInfo.itemDetails +
                    " itemDetails d-flex  justify-content-between w-100 align-items-center"
                  }>
                  <div className="itemDescription">
                    <h5 className="fw-medium fs-4">Pizza</h5>
                    <p className="text-muted">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptate.
                    </p>
                  </div>
                  <div className="itemPrice">
                    <h5 className={userInfo.itemPrice + " "}>$180</h5>
                  </div>
                </div>
              </div>
              <div
                className={userInfo.cardItem + " cartItem mb-2 d-flex ms-auto"}>
                <div className={userInfo.itemImageContainer + "  itemImage"}>
                  <img
                    src="../../../public/Images/LogPageImage/meal-3.jpg"
                    className=" "
                    alt=""
                  />
                </div>
                <div
                  className={
                    userInfo.itemDetails +
                    " itemDetails d-flex  justify-content-between w-100 align-items-center"
                  }>
                  <div className="itemDescription">
                    <h5 className="fw-medium fs-4">Pizza</h5>
                    <p className="text-muted">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptate.
                    </p>
                  </div>
                  <div className="itemPrice">
                    <h5 className={userInfo.itemPrice + " "}>$180</h5>
                  </div>
                </div>
              </div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* //!2--------------------------------------------- */}
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{
          marginTop: "20px",
          borderRadius: "30px",
          border: "0",
        }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={
            {
              // display: "flex",
              // justifyContent: "space-between",
              // alignItems: "center",
              // borderBottom: "2px solid red",
            }
          }>
          <Typography
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "2px solid red",
            }}>
            <Typography
              sx={{
                width: "33%",
                flexShrink: 0,
              }}>
              <div className="orderDetails-Right">
                <p>orderNum : 1</p>
                <h4 className="resName fw-bold text-capitalize">
                  Hala Restaurant
                </h4>
              </div>
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                width: "33%",

                marginLeft: "auto",
              }}>
              <div className="orderDetails-left  ">
                <div className="cartInfo ">
                  <p>
                    TotalCost : <span className="totalCartCost">150$</span>
                  </p>
                  <p>At : 20/4/2024 - 0:15 pm</p>
                </div>
              </div>
            </Typography>
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography>
            <div>
              <div
                className={userInfo.cardItem + " cartItem mb-2 d-flex ms-auto"}>
                <div className={userInfo.itemImageContainer + "  itemImage"}>
                  <img
                    src="../../../public/Images/LogPageImage/meal-1.jpg"
                    className=" "
                    alt=""
                  />
                </div>
                <div
                  className={
                    userInfo.itemDetails +
                    " itemDetails d-flex  justify-content-between w-100 align-items-center"
                  }>
                  <div className="itemDescription">
                    <h5 className="fw-medium fs-4">Pizza</h5>
                    <p className="text-muted">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptate.
                    </p>
                  </div>
                  <div className="itemPrice">
                    <h5 className={userInfo.itemPrice + " "}>$180</h5>
                  </div>
                </div>
              </div>
              <div
                className={userInfo.cardItem + " cartItem mb-2 d-flex ms-auto"}>
                <div className={userInfo.itemImageContainer + "  itemImage"}>
                  <img
                    src="../../../public/Images/LogPageImage/meal-2.jpg"
                    className=" "
                    alt=""
                  />
                </div>
                <div
                  className={
                    userInfo.itemDetails +
                    " itemDetails d-flex  justify-content-between w-100 align-items-center"
                  }>
                  <div className="itemDescription">
                    <h5 className="fw-medium fs-4">Pizza</h5>
                    <p className="text-muted">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptate.
                    </p>
                  </div>
                  <div className="itemPrice">
                    <h5 className={userInfo.itemPrice + " "}>$180</h5>
                  </div>
                </div>
              </div>
              <div
                className={userInfo.cardItem + " cartItem mb-2 d-flex ms-auto"}>
                <div className={userInfo.itemImageContainer + "  itemImage"}>
                  <img
                    src="../../../public/Images/LogPageImage/meal-3.jpg"
                    className=" "
                    alt=""
                  />
                </div>
                <div
                  className={
                    userInfo.itemDetails +
                    " itemDetails d-flex  justify-content-between w-100 align-items-center"
                  }>
                  <div className="itemDescription">
                    <h5 className="fw-medium fs-4">Pizza</h5>
                    <p className="text-muted">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptate.
                    </p>
                  </div>
                  <div className="itemPrice">
                    <h5 className={userInfo.itemPrice + " "}>$180</h5>
                  </div>
                </div>
              </div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CustomerOrders;
