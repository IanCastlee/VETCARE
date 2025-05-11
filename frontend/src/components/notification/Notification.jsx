import "./Notification.scss";
import { motion } from "framer-motion";

//ICONS
import { IoCloseOutline } from "react-icons/io5";

//IMAGES
import img from "../../assets/imges/dog.png";

const Notification = ({ close }) => {
  return (
    <div className="notification-overlay">
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="notification"
      >
        <div className="top">
          <h6>Notification</h6>{" "}
          <IoCloseOutline className="icon" onClick={close} />
        </div>
        <div className="notification-content">
          <div className="card">
            <div className="left">
              <img src={img} alt="" />
            </div>

            <div className="right">
              <div className="top">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam?
              </div>

              <div className="bot">
                <button>Button</button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="left">
              <img src={img} alt="" />
            </div>

            <div className="right">
              <div className="top">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam?
              </div>

              <div className="bot">
                <button>Button</button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="left">
              <img src={img} alt="" />
            </div>

            <div className="right">
              <div className="top">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam?
              </div>

              <div className="bot">
                <button>Button</button>
              </div>
            </div>
          </div>

          <button className="btn-viewmore">View More</button>
        </div>
      </motion.div>
    </div>
  );
};

export default Notification;
