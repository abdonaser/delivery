import { Link } from "react-router-dom";
import "../Styles/ErrorPage.css";
const ErrorPage = () => {
  return (
    <div className="errorPage">
      <h1>404 ERROR</h1>
      <p>Oh Snap, Double Check Your URL....</p>
      <Link to="/">
        <button>Go to Home</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
