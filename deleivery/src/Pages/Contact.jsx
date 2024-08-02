import "../Styles/Contact.css";
// import "../../node_modules/bootstrap/dist/css/bootstrap.css";

export default function Contact() {
  return (
    <div>
      <section className="contact-section">
        <div className="back"></div>
        <div className="contact-container">
          <div className="row contact-head">
            <div className=" contact">
              <div className="col-12">
                <h1 className="p-3 my-2 fw-medium ">Contact Us</h1>
              </div>
              <div className="d-flex justify-content-between ">
                <div className="contact-info ">
                  <div className="phone social">
                    <i class="fa-solid fa-phone-volume"></i>
                    <a>
                      <h6>01550406840</h6>
                    </a>
                  </div>
                  <div className="email social">
                    <i class="fa-solid fa-envelope"></i>
                    <a>
                      <h6>contact@gmail.com</h6>
                    </a>
                  </div>
                  <div className="location social">
                    <i class="fa-solid fa-location-dot"></i>
                    <a>
                      <h6> 203, Envato Labs, Behind Alis Steet, Australia</h6>
                    </a>
                  </div>
                </div>
                <div className="form-contact ">
                  <form id="contactForm">
                    <div className=" mb-2 ">
                      <label htmlFor="name" className="form-label">
                        Your Name :
                      </label>
                      <input
                        type="text"
                        className="form-control mb-3 "
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        required></input>
                    </div>
                    <div className=" mb-2 ">
                      <label htmlFor="email" className="form-label">
                        Email Address :
                      </label>
                      <input
                        type="email"
                        className="form-control mb-3 "
                        id="email"
                        name="email"
                        placeholder="youremail@example.com"
                        required></input>
                    </div>
                    <div className=" mb-2 ">
                      <label htmlFor="message" className="form-label">
                        Message :
                      </label>
                      <textarea
                        className="form-control "
                        id="message"
                        name="message"
                        rows="5"
                        placeholder="Write your message here"
                        required></textarea>
                    </div>
                    <button
                      type="submit"
                      className=" btn btn-danger submit-contact">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
