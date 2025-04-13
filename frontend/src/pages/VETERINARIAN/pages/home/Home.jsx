import "./Home.scss";

//IMAGES
import profile from "../../../../assets/imges/veterinarian1.png";

//ICONS
import { CiStethoscope } from "react-icons/ci";
import { MdOutlineMoreHoriz } from "react-icons/md";

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <div className="left">
          <div className="left-wrapper">
            <div className="profile-wrapper">
              <img src={profile} alt="profile_pic" className="profile" />
            </div>

            <div className="name-rule">
              <h3>
                <CiStethoscope className="icon" /> Dr. Hanabi Hayabusa
              </h3>
              <span>Veterinarian</span>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="right-wrapper">
            <div className="today-appointment">
              <h4>Today's Appointment</h4>

              <div className="card">
                <div className="left-card">
                  <img src={profile} alt="profile" className="profile-card" />
                </div>

                <div className="right-card">
                  <div className="top">
                    <div className="name-info">
                      <div className="name">Braka Kkaka</div>
                      <p>04-11-25</p>
                    </div>
                    <MdOutlineMoreHoriz className="more-icon" />
                  </div>

                  <div className="bot">
                    <div className="pet">
                      <span className="type">Pet : Dog</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pending-appointment">
              <h4>Pending Appointment</h4>

              <div className="card">
                <div className="left-card">
                  <img src={profile} alt="profile" className="profile-card" />
                </div>

                <div className="right-card">
                  <div className="top">
                    <div className="name-info">
                      <div className="name">Braka Kkaka</div>
                      <p>04-11-25</p>
                    </div>
                    <MdOutlineMoreHoriz className="more-icon" />
                  </div>

                  <div className="bot">
                    <div className="pet">
                      <span className="type">Pet : Dog</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
