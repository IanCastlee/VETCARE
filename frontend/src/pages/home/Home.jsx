import "./Home.scss";
import { motion } from "framer-motion";
//IMAGES
// import waveImage from "../../assets/imges/wave-bg.png";
import waveImage from "../../assets/imges/wavebg3.png";
import dogImage from "../../assets/imges/dog.png";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../components/customButton/CustomButton";
import axiosIntance from "../../../axios";
import { useEffect, useState } from "react";

//ICONS
import { CiSearch } from "react-icons/ci";
import { LuView } from "react-icons/lu";
import { CiStethoscope } from "react-icons/ci";

//IMAGES (servives)
import vaccine from "../../assets/icons/animals.png";
import deworm from "../../assets/icons/deworm (1).png";
import dental from "../../assets/icons/veterinary.png";
import Loader2 from "../../components/loader/Loader2";

const Home = () => {
  const [showLoader2, setShowLoader2] = useState(false);
  const [veterinarian, setVeterinarian] = useState([]);

  //get veterinarian
  useEffect(() => {
    setShowLoader2(true);
    const veterinarian = async () => {
      try {
        const res = await axiosIntance(
          "admin/veterinarian/GetVeterinarian.php"
        );
        if (res.data.success) {
          setVeterinarian(res.data.data);
          setShowLoader2(false);
        } else {
          console.log("Error : ", res.data.data);
        }
      } catch (error) {
        setShowLoader2(false);
        console.log("Error : ", error);
      }
    };

    veterinarian();
  }, []);

  return (
    <>
      <div className="client-home">
        <div className="hero">
          <div className="hero-left">
            <img src={waveImage} alt="wave-bg" className="wave-bg" />

            <div className="hero-wrapper">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                One Paw Closer to Better Care. Book your next vet visit in
                seconds with our smart clinic system.
              </motion.h1>
              <motion.h6
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Trusted by pet parents. Loved by furry friends.
              </motion.h6>

              <CustomButton _bgcolor="primary" _label="Book Now" />
            </div>
          </div>
          <div className="hero-right">
            <img src={dogImage} alt="Dog" className="dog-img" />
          </div>
        </div>

        <div className="services">
          <h2>Our Services</h2>
          <div className="servives-container">
            <div className="services-card">
              <img src={vaccine} alt="" />
              <span>Vaccination</span>
            </div>

            <div className="services-card">
              <img src={deworm} alt="" />
              <span>Deworming</span>
            </div>

            <div className="services-card">
              <img src={dental} alt="" />
              <span>Dental</span>
            </div>
          </div>
        </div>

        <div className="search-container">
          <div className="search-input-icon">
            <input type="text" placeholder="Search Veterinarian" />

            <CiSearch className="search-icon" />
          </div>
        </div>

        <div className="veterinarian-container">
          <h2>Available Veterinarian</h2>
          <div className="veterinarian">
            {showLoader2 ? (
              <Loader2 />
            ) : veterinarian.length > 0 ? (
              veterinarian.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="veterinarian-wrapper"
                >
                  <img
                    src={`http://localhost/VETCARE/backend/uploads/${item.profile}`}
                    alt="veterinarian-profile"
                    className="veterinarian-profile"
                  />

                  <div className="veterinarian-info">
                    <div className="veterinarian-name-button-wrapper">
                      <div className="name-rule">
                        <span className="name">
                          <CiStethoscope className="icon" />
                          {item.fullname}
                        </span>
                        <span className="rule">{item.specialization}</span>
                      </div>

                      <Link to={`/view-veterinarian/${item.user_id}`}>
                        <button>
                          <LuView />
                        </button>
                      </Link>
                    </div>

                    <button className="btn-set-appointment">
                      <Link to={`/set-appointment/${item.user_id}`}>
                        Set Appointment
                      </Link>
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p>No Data Record</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
