import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { clearCustomerInfo } from "../redux/actions";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearCustomerInfo());

    dispatch(logout());

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/signup");
  };

  return handleLogout;
};

export default useLogout;
