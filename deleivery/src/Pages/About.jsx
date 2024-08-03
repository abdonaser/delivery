import { Link } from "react-router-dom";
import "../Styles/about.css";

const About = () => {
  return (
    <>
      <div className="about-Us-page ">
        <div className=" w-75 ">
          <div className="container about-container">
            <div className="about-Details">
              <h4>
                Delicious food <br></br> delivered at <br></br> your doorStep
              </h4>

              <p>Yes, we have the best Food in town </p>

              <div>
                <Link to={"/"}>
                  <button className="btn ">Order Now</button>
                </Link>
              </div>
            </div>
            <div className="about-imgContainer">
              <img
                src="../../public/Images/aboutImages/aboutimg4.png"
                className="w-100 h-100"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
