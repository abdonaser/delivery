import { useState, useEffect } from "react";
import "../Styles/Home.css";

const slides = [
  {
    image: "Images/HomePage/pizza.png",
    text: "Are You Hungry?!",
    paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    image: "Images/HomePage/burger.png",
    text: "What about Some Burger?!",
    paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    image: "Images/HomePage/juice.png",
    text: "Thirsty..huh?",
    paragraph:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const VerticalImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container vh-100 rounded-0">
      <div
        className="slider-wrapper"
        style={{ transform: `translateY(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <div className="text-container">
              <h1>{slide.text}</h1>
              <p>{slide.paragraph}</p>
              <button className="button">Order Now</button>
            </div>
            <div className="image-container">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="slider-image"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalImageSlider;
