import "../Styles/Loader.css";

const Loader = () => {
  return (
    <div className="truck-loader-container">
      <div className="truck-loader">
        <div className="truck-body">
          <div className="truck-wheel"></div>
          <div className="truck-wheel"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
