import { Link } from "react-router-dom";
import "../Styles/about.css";

const About = () => {
  return (
    <>
      <div className="about-Us-page">
        <div className="about-container">
          <div className="about-Details">
            <h4>Delicious Food delivered at Your doorStep</h4>
            <p>Yes, we have the best Food in town </p>
            <div>
              <Link to={"/"}>
                <button className="btn btn-danger px-2 py-3">Order Now</button>
              </Link>
            </div>
          </div>
          <div className="about-imgContainer">
            <img
              src="Images/LogPageImage/meal-3.jpg"
              className="w-100 h-100"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
