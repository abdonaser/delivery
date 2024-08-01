import React, { useState } from "react";
import "../Styles/Home.css";

const reviews = [
  {
    id: 1,
    name: "Alice",
    text: "Fantastic service and delicious food!\nThe delivery was quick, and the food was still hot.\nHighly recommend this place!",
    rating: 5,
  },
  {
    id: 2,
    name: "Bob",
    text: "Fast delivery and great quality.\nThe customer service was friendly and efficient.\nWill definitely order again!",
    rating: 4,
  },
  {
    id: 3,
    name: "Charlie",
    text: "The special offers are amazing.\nI was pleasantly surprised by the variety of options.\nGreat value for money!",
    rating: 5,
  },
  {
    id: 4,
    name: "David",
    text: "The food was fresh and tasty.\nI appreciated the prompt service and attention to detail.\nA great dining experience overall.",
    rating: 4,
  },
  {
    id: 5,
    name: "Eve",
    text: "The online ordering process was smooth.\nDelivery was on time, and the packaging was neat.\nVery satisfied with the service!",
    rating: 5,
  },
  {
    id: 6,
    name: "Frank",
    text: "Delicious food and excellent service.\nThe delivery driver was courteous and professional.\nWill definitely recommend to friends!",
    rating: 4,
  },
];

const CustomerReview = () => {
  const [currentReview, setCurrentReview] = useState(0);

  const handleNext = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <>
      {" "}
      <h1 className="customer-review-heading">See What our customers Say</h1>
      <div className="customer-review">
        <div className="review-image">
          <img
            src="../Images/HomePage/customerReview.png"
            alt="CustomerReview"
          />
        </div>
        <div className="review-content">
          <h2>Our Lovely Customer Loves Our Services</h2>
          <p>
            {reviews[currentReview].text.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
          <div className="review-rating">
            {"★".repeat(reviews[currentReview].rating)}
            {"☆".repeat(5 - reviews[currentReview].rating)}
          </div>
          <p className="review-name">{reviews[currentReview].name}</p>
          <div className="review-navigation">
            <button onClick={handlePrev}>&larr;</button>
            <button onClick={handleNext}>&rarr;</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerReview;
