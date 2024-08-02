import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "../Styles/NavBar.css";
import useLogout from "../Hooks/useLogout";
import { changeActive } from "../redux/ActiveWelcomName";

function Navbar() {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = useLogout();

  //'Receive activeName slice
  const activeName = useSelector((state) => state.activeNameStore.activeName);
  const dispatch = useDispatch();
  //'-----------------------------------------

  if (activeName == "true") {
    // console.log("nav ", activeName);
    
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:3000/current-user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    fetchUser();
    dispatch(changeActive("false"));
  }
  //'-----------------------------

  const cartItems = useSelector((state) => state.cart.items);
  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (location.pathname === "/login") {
    return null;
  }

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:3000/current-user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser(response.data);
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

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleScroll = () => {
    setIsSticky(window.scrollY > 150);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleUserLogout = () => {
    handleLogout();
    setUser(null);
  };

  const handleCartClick = () => {
    navigate("/checkout");
  };

  return (
    <header className={`page-header ${isSticky ? "is-sticky" : ""}`}>
      <nav className="Navbar">
        <Link to="/" className="logo">
          <img
            src="public/Images/LogPageImage/hero-img.png"
            alt="logo"
            width={"50px"}
          />
        </Link>
        <div className="nav-items">
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="auth-buttons">
            {user ? (
              <span className="welcome-message">Welcome, {user.username}!</span>
            ) : (
              <>
                <Link to="/signup" className="auth-button login-button">
                  Sign Up
                </Link>
                <Link to="/join-us" className="auth-button join-button">
                  Join Us
                </Link>
              </>
            )}
          </div>
          <div className="icons">
            <span className="cart-icon" onClick={handleCartClick}>
              🛒
              {cartQuantity > 0 && (
                <span className="cart-quantity">{cartQuantity}</span>
              )}
            </span>
            <span className="profile-icon" onClick={toggleProfileMenu}>
              👤
            </span>
          </div>
          <div className={`profile-menu ${isProfileMenuOpen ? "show" : ""}`}>
            <ul>
              <li>
                <Link to="/Customer-Profile">Profile</Link>
              </li>
              <li>
                <Link to="/Customer-Profile">Orders</Link>
              </li>
              <li>
                <button onClick={handleUserLogout}>Sign Out</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
