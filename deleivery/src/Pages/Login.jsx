import React, { useState } from "react";
import log from "../Styles/Login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCustomerInfo } from "../redux/actions";

const Login = () => {
  //'==================================handel Flip Cards
  const [hasAccount, sethasAccount] = useState(false);
  const handelCreateAcc = (e) => {
    sethasAccount(false);
  };
  const handelSignIn = () => {
    sethasAccount(true);
  };
  //'=======================================login stats================================
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        formData
      );
      const { token, user } = response.data;
      // Save token and user info to local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Dispatch action to save user info in Redux store
      dispatch(setCustomerInfo(user));

      // Debugging logs
      console.log("User:", user); // Check user object

      // Navigate based on user role and status
      if (user.role === "customer") {
        navigate("/customer-profile");
      } else if (user.role === "admin") {
        navigate("/admin-profile");
      } else if (user.role === "owner") {
        if (user.status === "approved") {
          navigate("/owner-profile");
        } else {
          navigate("/waiting-for-approval");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      console.log(err);
    }
  };

  //'===========================signup stats============================

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  // const [role, setRole] = useState("");

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        username,
        email,
        password,
        address,
        phoneNumber,
        gender,
        // role,
      });

      console.log(response); // Log the response for debugging
      sethasAccount(true); // Set hasAccount only on successful signup
    } catch (error) {
      console.error("Sign Up error:", error);

      console.log({
        username,
        email,
        password,
        address,
        phoneNumber,
        gender,
      });

      // sethasAccount(true); //! Delete this after fixing the problem
    }
  };

  //'==============================================================================================

  return (
    <>
      <div className={log.SignComp + " container  "}>
        <div className={log.signContainer + " row "}>
          {/* //'=======================================================Left Section */}
          <div className={log.LeftSection + "  col-12 col-lg-6 p-2  "}>
            <div className={" inner "}>
              <div className={log.Boxs}>
                <div className={log.mealBoxParant}>
                  <div className={log.singleBox1}></div>
                  <div className={log.singleBox2}></div>
                  <div className={log.singleBox3}></div>
                </div>
              </div>
            </div>
          </div>
          {/* //'=======================================================right Section */}

          <div className={log.RightSection + " col-12 col-lg-6 "}>
            <div className={log.rightContainer}>
              <div className={log.mainContainer + ``}>
                <div
                  className={log.theCard}
                  style={!hasAccount ? { transform: "rotateY(180deg)" } : null}>
                  {/*  //!  ================Login Card================================================================  */}
                  <div className={log.theFront}>
                    <h1 className="text-danger">Delivery App</h1>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit} className=" my-3 py-1">
                      {/* //' user Email */}
                      <div className={log.inputContainer + " "}>
                        <i className={log.inputIcon + " fa-solid fa-user"}></i>
                        <input
                          className={
                            log.inputPadding +
                            " form-control text-start   mb-4 "
                          }
                          type="email"
                          name="email"
                          id="userEmailLogIn"
                          placeholder="Email/Phone no"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      {/* //'user password */}
                      <div className={log.inputContainer + " "}>
                        <i
                          className={
                            log.inputIcon + " fa-solid fa-unlock-keyhole"
                          }></i>
                        <input
                          className={
                            log.inputPadding + " form-control text-start  mb-3"
                          }
                          type="password"
                          name="password"
                          id="userPasswordLogIn"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      {/* //'Forgot Password? */}
                      <div className=" text-end text-danger">
                        <a className={log.redHover}>Forgot Password?</a>
                      </div>

                      {/* //'Login Btn */}
                      <button
                        type="submit"
                        className={
                          log.LogBtnColor + " btn btn-danger w-100 my-2"
                        }>
                        Login
                      </button>

                      {/* //'create One */}
                      <div
                        className={log.handelcreate + " text-center mb-2 p-2"}>
                        Don&apos;t have an Account?
                        <a
                          className={log.cursorPointer + "  ms-2"}
                          onClick={handelCreateAcc}>
                          create one
                        </a>
                      </div>
                    </form>
                  </div>

                  {/* //! ================Register Card================================================================ */}

                  <div className={log.theBack}>
                    <h1 className="text-danger">Delivery App</h1>
                    <h2>Register</h2>
                    <form onSubmit={handleSubmitSignUp} className=" my-3 py-1">
                      {/* //'USer Name */}
                      <div className={log.inputContainer + " "}>
                        <i
                          className={
                            log.inputIcon + " fa-solid fa-signature "
                          }></i>
                        <input
                          className={
                            log.inputPadding +
                            " form-control text-start   mb-1 "
                          }
                          type="text"
                          name="userName"
                          id="userName"
                          placeholder="User Name"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>

                      {/* //'USer phone */}
                      <div className={log.inputContainer + " "}>
                        <i className={log.inputIcon + " fa-solid fa-phone"}></i>
                        <input
                          className={
                            log.inputPadding + " form-control text-start  mb-1"
                          }
                          type="Phone"
                          name="userPhone"
                          id="userPhone"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="PhoneNumber"
                        />
                      </div>

                      {/* //' user gender */}

                      <div
                        className={
                          log.inputContainer +
                          " d-flex align-items-center justify-content-between pe-2"
                        }>
                        <label htmlFor="gender" className=" fw-medium ">
                          Gender :
                        </label>
                        <div className=" d-flex justify-content-around p-2 gap-5">
                          <div>
                            <input
                              className={
                                log.inputPadding +
                                " " +
                                log.pointer +
                                "  text-start  m-2"
                              }
                              type="radio"
                              name="gender"
                              id="Female"
                              value="female"
                              checked={gender === "female"}
                              onChange={(e) => setGender(e.target.value)}
                            />
                            <label
                              htmlFor="Female"
                              className={log.pointer + " "}>
                              Female
                            </label>
                          </div>
                          <div>
                            <input
                              className={
                                log.inputPadding +
                                " " +
                                log.pointer +
                                "  text-start   m-2 "
                              }
                              type="radio"
                              name="gender"
                              id="male"
                              value="male"
                              checked={gender === "male"}
                              onChange={(e) => setGender(e.target.value)}
                            />

                            <label htmlFor="male" className={log.pointer + " "}>
                              male
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* //'USer Address */}
                      <div className={log.inputContainer + " "}>
                        <i
                          className={
                            log.inputIcon + " fa-solid fa-signature "
                          }></i>
                        <input
                          className={
                            log.inputPadding +
                            " form-control text-start   mb-1 "
                          }
                          type="text"
                          name="userAddress"
                          id="userAddress"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Address"
                        />
                      </div>

                      {/* //' user Email */}
                      <div className={log.inputContainer + " "}>
                        <i className={log.inputIcon + " fa-solid fa-at"}></i>
                        <input
                          className={
                            log.inputPadding +
                            " form-control text-start   mb-1 "
                          }
                          type="email"
                          name="userEmail"
                          id="userEmail"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email"
                        />
                      </div>

                      {/* //'USer password */}
                      <div className={log.inputContainer + " "}>
                        <i
                          className={
                            log.inputIcon + " fa-solid fa-unlock-keyhole"
                          }></i>
                        <input
                          className={
                            log.inputPadding + " form-control text-start  mb-1"
                          }
                          type="password"
                          name="userPassword"
                          id="userPassword"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                        />
                      </div>

                      <button
                        type="submit"
                        className={
                          log.LogBtnColor + " btn btn-danger w-100 my-2"
                        }>
                        SignUp
                      </button>
                      <div
                        className={log.handelcreate + " text-center mb-2 p-2"}>
                        Alreaady has Account?
                        <a
                          className={log.cursorPointer + " ms-2"}
                          onClick={handelSignIn}>
                          SignIn
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className={log.mainContainer + ``}>
            <div className={log.theCard}>
              <div className={log.theFront}>front card</div>
              <div className={log.theBack}>Back card</div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Login;
