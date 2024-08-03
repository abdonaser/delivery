import React, { useEffect, useState } from "react";
import "../Styles/CustomerProfile.css";
import userInfo from "../Styles/customerPrifile.module.css";
// import "../Styles/customerOrders.css";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { changeActive } from "../redux/ActiveWelcomName";


import CustomerOrders from "../Components/CustomerOrders";
import CustomerPage from "../Components/CustomerOrders";

const CustomerProfile = () => {
  //'Receive activeName slice
  const activeName = useSelector((state) => state.activeNameStore.activeName);
  const dispatch = useDispatch();

  //'-----------------------------
  const [activeView, setActiveView] = useState("profile");

  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState({
    username: "false",
    email: "false",
    address: "false",
    phoneNumber: "false",
    gender: "false",
  });

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    phoneNumber: "",
    gender: "",
  });

  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:3000/user-info", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const userData = response.data;

          setUser(userData);

          setFormData({
            username: userData.user.username,
            email: userData.user.email,
            address: userData.user.address,
            phoneNumber: userData.user.phoneNumber,
            gender: userData.user.gender,
          });
        } catch (error) {
          console.error("Error fetching user:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, [location]);
  console.log("user ", user);

  const handleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleChangeForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log("handel");
  };

  const handleSave = async (field) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.put(
          "http://localhost:3000/update-user-info",
          { [field]: formData[field] },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser((prev) => ({
          ...prev,
          user: { ...prev.user, [field]: formData[field] },
        }));

        setIsEditing((prev) => ({ ...prev, [field]: false }));
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
    dispatch(changeActive("true"));
  };

  // console.log(formData);
  // useEffect(() => {
  //   setUser({
  //     username: "abdo Naser",
  //     email: "abdo@gmail.com",
  //     address: "sfafasfasdf",
  //     phoneNumber: "12346",
  //     gender: "male",
  //   });
  //   console.log(user);
  // }, []);
  // console.log(isEditing);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }
  //' Handel Order Section---------------------------------------

  // const [isShow, setIsShow] = useState("true");
  // const hadelShow = () => {
  //   setIsShow("true");
  //   console.log(" hadelShow ", isShow);
  // };
  // const hadelHide = () => {
  //   setIsShow("false");
  //   console.log(" hadelHide ", isShow);
  // };

  return (
    <>
      <Navbar />
      <div className="customer-profile-container ">
        <div className="sidebar">
          <button
            className={`sidebar-button ${
              activeView === "profile" ? "active" : ""
            }`}
            onClick={() => setActiveView("profile")}
          >
            Profile
          </button>

          <button
            className={`sidebar-button ${
              activeView === "orders" ? "active" : ""
            }`}
            onClick={() => setActiveView("orders")}
          >
            Orders
          </button>
        </div>
        <div className="profile-content">
          {activeView === "profile" && (
            <div className="profile-info">
              <div className="profile-pic-container">
                <img
                  src="https://escp.eu/sites/default/files/excel/ambassadors/mim/img/default-picture.jpg"
                  alt="Profile Pic"
                  className="profile-pic"
                />
              </div>
              <h2 className="text-start py-2">Your Information</h2>
              <div className="user-info">
                {user &&
                  Object.keys(formData).map((key) => (
                    <div
                      key={key}
                      className="info-item   d-flex align-items-center  mb-3"
                    >
                      <div className={userInfo.lable + " "}>
                        <b className="text-capitalize">{key} :</b>
                      </div>
                      <div
                        className={
                          userInfo.Input +
                          " prfileInput d-flex align-items-center justify-content-start gap-2"
                        }>
                        <div className=" ">
                          <input
                            type={
                              key == "username"
                                ? "text "
                                : key == "email"
                                ? "email"
                                : key == "address"
                                ? "text"
                                : key == "phoneNumber"
                                ? "tel"
                                : "text"
                            }
                            name={key}
                            id={key}
                            className="form-control w-100"
                            style={{
                              outline: `${
                                isEditing[key] == "true"
                                  ? "2px solid #E04A00"
                                  : "none"
                              }`,
                            }}
                            value={formData[key]}
                            onChange={
                              isEditing[key] == "true" ? handleChangeForm : ""
                            }
                          />
                        </div>
                        <div className="editIcons  text-start ">
                          {isEditing[key] == "true" ? (
                            <button onClick={() => handleSave(key)}>
                              Save
                            </button>
                          ) : (
                            <FaEdit
                              className="edit-icon activeEdit"
                              onClick={() => {
                                setIsEditing((prev) => {
                                  return { ...prev, [key]: "true" };
                                });
                              }}
                            />
                          )}
                        </div>
                      </div>

                      {/* <button onClick={() => handleSave(key)}>Save</button> */}
                      {/* {isEditing[key] ? (
                        <>
                          <input
                            className="bg-dark"
                            type="text"
                            name={key}
                            value={formData[key] || ""}
                            onChange={handleChange}
                          />
                          <button onClick={() => handleSave(key)}>Save</button>
                        </>
                      ) : (
                        <>
                          {user.user[key] || "N/A"}
                          <FaEdit
                            className="edit-icon"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                [key]: user.user[key] || "",
                              });
                              handleEdit(key);
                            }}
                          />
                        </>
                      )} */}
                    </div>
                  ))}
              </div>
            </div>
          )}
          {activeView === "orders" && (
            <div className="orders-info">
              <h2>Orders</h2>
              <div>
                <CustomerOrders></CustomerOrders>
              
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CustomerProfile;

//  {
//    /* //' Order-1 */
//  }
//  <div className={userInfo.orderCart + " cart   rounded-5  p-3 mb-4"}>
//    <div className="orderDetails ">
//      <div className="orderDetails-Right">
//        <p>orderNum : 1</p>
//        <h4 className="resName fw-bold text-capitalize">Hala Restaurant</h4>
//      </div>
//      <div className="orderDetails-left  ">
//        <div className="cartInfo ">
//          <p>
//            TotalCost : <span className="totalCartCost">150$</span>
//          </p>
//          <p>At : 20/4/2024 - 0:15 pm</p>
//        </div>
//        <div className="arrowCartIcon">
//          {isShow == "true" ? (
//            <i className="fa-solid fa-angles-down " onClick={hadelHide}></i>
//          ) : (
//            <i className="fa-solid fa-angles-up" onClick={hadelShow}></i>
//          )}
//        </div>
//      </div>
//    </div>
// <div
//      className={
//        isShow == "true" ? " d-none cartitems p-2 " : " d-block cartitems p-2"
//      }>
//      <div className={userInfo.cardItem + " cartItem mb-2 d-flex ms-auto"}>
//        <div className={userInfo.itemImageContainer + "  itemImage"}>
//          <img
//            src="../../../public/Images/LogPageImage/meal-1.jpg"
//            className=" "
//            alt=""
//          />
//        </div>
//        <div
//          className={
//            userInfo.itemDetails +
//            " itemDetails d-flex  justify-content-between w-100 align-items-center"
//          }>
//          <div className="itemDescription">
//            <h5 className="fw-medium fs-4">Pizza</h5>
//            <p className="text-muted">
//              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate.
//            </p>
//          </div>
//          <div className="itemPrice">
//            <h5 className={userInfo.itemPrice + " "}>$180</h5>
//          </div>
//        </div>
//      </div>
//      <div className={userInfo.cardItem + " cartItem mb-2 d-flex ms-auto"}>
//        <div className={userInfo.itemImageContainer + "  itemImage"}>
//          <img
//            src="../../../public/Images/LogPageImage/meal-2.jpg"
//            className=" "
//            alt=""
//          />
//        </div>
//        <div
//          className={
//            userInfo.itemDetails +
//            " itemDetails d-flex  justify-content-between w-100 align-items-center"
//          }>
//          <div className="itemDescription">
//            <h5 className="fw-medium fs-4">Pizza</h5>
//            <p className="text-muted">
//              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate.
//            </p>
//          </div>
//          <div className="itemPrice">
//            <h5 className={userInfo.itemPrice + " "}>$180</h5>
//          </div>
//        </div>
//      </div>
//      <div className={userInfo.cardItem + " cartItem mb-2 d-flex ms-auto"}>
//        <div className={userInfo.itemImageContainer + "  itemImage"}>
//          <img
//            src="../../../public/Images/LogPageImage/meal-3.jpg"
//            className=" "
//            alt=""
//          />
//        </div>
//        <div
//          className={
//            userInfo.itemDetails +
//            " itemDetails d-flex  justify-content-between w-100 align-items-center"
//          }>
//          <div className="itemDescription">
//            <h5 className="fw-medium fs-4">Pizza</h5>
//            <p className="text-muted">
//              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate.
//            </p>
//          </div>
//          <div className="itemPrice">
//            <h5 className={userInfo.itemPrice + " "}>$180</h5>
//          </div>
//        </div>
//      </div>
//    </div>
//
//  </div>;
//  {
//    /* //' Order-2 */
//  }
//  <div className={userInfo.orderCart + " cart   rounded-5  p-3 mb-4"}>
//    <div className="orderDetails ">
//      <div className="orderDetails-Right">
//        <p>orderNum : 1</p>
//        <h4 className="resName fw-bold text-capitalize">Hala Restaurant</h4>
//      </div>
//      <div className="orderDetails-left  ">
//        <div className="cartInfo ">
//          <p>
//            TotalCost : <span className="totalCartCost">150$</span>
//          </p>
//          <p>At : 20/4/2024 - 0:15 pm</p>
//        </div>
//        <div className="arrowCartIcon">
//          {isShow == "true" ? (
//            <i className="fa-solid fa-angles-down " onClick={hadelHide}></i>
//          ) : (
//            <i className="fa-solid fa-angles-up" onClick={hadelShow}></i>
//          )}
//        </div>
//      </div>
//    </div>

//    <div
//      className={
//        isShow == "true" ? " d-none cartitems p-2 " : " d-block cartitems p-2"
//      }>
//      <div className={userInfo.cardItem + " cartItem mb-2 d-flex ms-auto"}>
//        <div className={userInfo.itemImageContainer + "  itemImage"}>
//          <img
//            src="../../../public/Images/LogPageImage/meal-1.jpg"
//            className=" "
//            alt=""
//          />
//        </div>
//        <div
//          className={
//            userInfo.itemDetails +
//            " itemDetails d-flex  justify-content-between w-100 align-items-center"
//          }>
//          <div className="itemDescription">
//            <h5 className="fw-medium fs-4">Pizza</h5>
//            <p className="text-muted">
//              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate.
//            </p>
//          </div>
//          <div className="itemPrice">
//            <h5 className={userInfo.itemPrice + " "}>$180</h5>
//          </div>
//        </div>
//      </div>
//      <div className={userInfo.cardItem + " cartItem mb-2 d-flex ms-auto"}>
//        <div className={userInfo.itemImageContainer + "  itemImage"}>
//          <img
//            src="../../../public/Images/LogPageImage/meal-2.jpg"
//            className=" "
//            alt=""
//          />
//        </div>
//        <div
//          className={
//            userInfo.itemDetails +
//            " itemDetails d-flex  justify-content-between w-100 align-items-center"
//          }>
//          <div className="itemDescription">
//            <h5 className="fw-medium fs-4">Pizza</h5>
//            <p className="text-muted">
//              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate.
//            </p>
//          </div>
//          <div className="itemPrice">
//            <h5 className={userInfo.itemPrice + " "}>$180</h5>
//          </div>
//        </div>
//      </div>
//      <div className={userInfo.cardItem + " cartItem mb-2 d-flex ms-auto"}>
//        <div className={userInfo.itemImageContainer + "  itemImage"}>
//          <img
//            src="../../../public/Images/LogPageImage/meal-3.jpg"
//            className=" "
//            alt=""
//          />
//        </div>
//        <div
//          className={
//            userInfo.itemDetails +
//            " itemDetails d-flex  justify-content-between w-100 align-items-center"
//          }>
//          <div className="itemDescription">
//            <h5 className="fw-medium fs-4">Pizza</h5>
//            <p className="text-muted">
//              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate.
//            </p>
//          </div>
//          <div className="itemPrice">
//            <h5 className={userInfo.itemPrice + " "}>$180</h5>
//          </div>
//        </div>
//      </div>
//    </div>
//  </div>;
