import "./Notification.scss";
import { motion } from "framer-motion";

//ICONS
import { IoCloseOutline } from "react-icons/io5";

//IMAGES
import { useEffect, useState } from "react";
import axiosIntance from "../../../axios";
import Loader2 from "../loader/Loader3";
import Emptydata from "../emptydata/Emptydata";
import appointmentImg from "../../assets/icons/calendar.png";

const Notification = ({ close }) => {
  const [loader, setLoader] = useState(false);
  const [notif, setNotif] = useState([]);
  const [visibleNotif, setVisibleNotif] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const MAX_VISIBLE = 5;

  //get notification
  useEffect(() => {
    const getNotification = async () => {
      setLoader(true);
      const res = await axiosIntance.get("client/notif/GetNotification.php");
      if (res.data.success) {
        console.log("NOTIFICATION : ", res.data.data);
        setNotif(res.data.data);
        setVisibleNotif(res.data.data.slice(0, MAX_VISIBLE));
      } else {
        console.log("Error : ", res.data);
      }
      setLoader(false);
    };

    getNotification();
  }, []);

  const handleViewMore = () => {
    setShowAll(true);
    setVisibleNotif(notif);
  };

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
          {loader ? (
            <Loader2 />
          ) : visibleNotif.length > 0 ? (
            <>
              {visibleNotif.map((item) => (
                <div key={item.notif_id} className="card">
                  <div className="left">
                    <img src={appointmentImg} alt="" />
                  </div>
                  <div className="right">
                    <div className="top">
                      <span className="title">{item.title}</span>
                      <p>{item.description}</p>
                    </div>
                    <div className="bot">
                      <span>{item.sentDate}</span>
                      <button>Button</button>
                    </div>
                  </div>
                </div>
              ))}
              {!showAll && notif.length > MAX_VISIBLE && (
                <button className="view-more-btn" onClick={handleViewMore}>
                  View More
                </button>
              )}
            </>
          ) : (
            <Emptydata />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Notification;
