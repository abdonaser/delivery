import "../Styles/Home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faUtensils, faTag, faClock } from '@fortawesome/free-solid-svg-icons';

const TrustedBrandsAndWhy = () => {
  return (
    <div className="trusted-brands-why">
      <section className="trusted-brands">
        <h2>Our Trusted Brand</h2>
        <p>
          Many companies trusted us from around the world. They always support
          us and give us different ideas.
        </p>
        <div className="brands">
          <img src="../Images/HomePage/mclogo.jpeg" alt="McDonald's" />
          <img src="../Images/HomePage/kfc_logo.png" alt="KFC" />
          <img src="../Images/HomePage/burger_king_logo.png" alt="Burger King" />
          <img src="../Images/HomePage/pizza_hut_logo.png" alt="Pizza Hut" />
          <img src="../Images/HomePage/pringles_logo.png" alt="Pringles" />
          <img src="../Images/HomePage/dominos_logo.png" alt="Domino's" />
        </div>
      </section>

      <section className="why-we-are-best">
        <h2>Why We Are The Best?</h2>
        <p>
          We will serve you in various ways, which will make your online food
          ordering more reliable.
        </p>
        <div className="features">
          <div className="feature">
            <FontAwesomeIcon icon={faTruck} size="2x" style={{ color: '#d66800' }} />
            <h3>Super Fast Delivery</h3>
            <p>
              We provide fast delivery services, which is superior and your
              product caring.
            </p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon={faUtensils} size="2x" style={{ color: '#d66800' }} />
            <h3>Best Quality Food</h3>
            <p>We serve the best and high-quality food with care.</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon={faTag} size="2x" style={{ color: '#d66800' }} />
            <h3>Super Offer</h3>
            <p>We always have a variety of big and small offers here.</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon={faClock} size="2x" style={{ color: '#d66800' }} />
            <h3>24/7 Service</h3>
            <p>We are always open for any inquiry or problem.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrustedBrandsAndWhy;
