import "./Home.scss";
import { motion } from "framer-motion";
//IMAGES
// import waveImage from "../../assets/imges/wave-bg.png";
import waveImage from "../../assets/imges/wavebg3.png";
import dogImage from "../../assets/imges/dog.png";

//ICONS
import { CiSearch } from "react-icons/ci";
import { LuView } from "react-icons/lu";

//IMAGES (servives)
import vaccine from "../../assets/icons/animals.png";
import deworm from "../../assets/icons/deworm (1).png";
import dental from "../../assets/icons/veterinary.png";

import { Link, useNavigate } from "react-router-dom";
import { veterinarianData } from "../../veterinarianData";

import CustomButton from "../../components/customButton/CustomButton";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="home">
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
            {veterinarianData &&
              veterinarianData.map((item) => (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="veterinarian-wrapper"
                  >
                    <img
                      src={item.profile}
                      alt="veterinarian-profile"
                      className="veterinarian-profile"
                    />

                    <div className="veterinarian-info">
                      <div className="veterinarian-name-button-wrapper">
                        <div className="name-rule">
                          <span className="name">{item.fname}</span>
                          <span className="rule">{item.rule}</span>
                        </div>

                        <Link to={`/veterinarian/${item.id}`}>
                          <button onClick={() => navigate("/veterinarian/")}>
                            <LuView />
                          </button>
                        </Link>
                      </div>

                      <button className="btn-set-appointment">
                        <Link to="/set-appointment/">Set Appointment</Link>
                      </button>
                    </div>
                  </motion.div>
                </>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
