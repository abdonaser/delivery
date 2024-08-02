import React from "react";
import "../Styles/waitingApproval.css";
import { Link } from "react-router-dom";
const WaitingForApproval = () => {
  return (
    <div className="container p-5">
      <div className="waitingApproval">
        <p className="">Request Sent Successfully</p>
        <h1>ThankYou For Joining Us</h1>
        <p>
          Your registration is under review. Please wait until the admin
          approves your account.
        </p>
        <Link to={"/"}>
        <button className="waiting-btn mt-4"
        >
          Back To Home
        </button>
        </Link>
      </div>
    </div>
  );
};

export default WaitingForApproval;
