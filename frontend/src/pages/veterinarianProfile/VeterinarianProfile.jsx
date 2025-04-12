import "./VeterinarianProfile.scss";

//IMAGES
import veterinarianProfile from "../../assets/imges/veterinarian1.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { veterinarianData } from "../../veterinarianData";
import { useEffect, useState } from "react";

//IC0NS
import { BiLeftArrowAlt } from "react-icons/bi";

const VeterinarianProfile = () => {
  const userId = useParams();

  const [currentVeterinarian, setcurrentVeterinarian] = useState({});

  console.log(
    "veterinarianData : ",
    veterinarianData &&
      veterinarianData.map((item) => userId.userId == item.id && item)
  );

  console.log("currentVeterinarian : ", currentVeterinarian);

  useEffect(() => {
    if (veterinarianData && userId) {
      const found = veterinarianData.find((item) => item.id == userId.userId);
      if (found) {
        setcurrentVeterinarian(found);
      }
    }
  }, [userId]);

  return (
    <div className="veterinarian">
      <div className="veterinarian-container">
        <div className="veterinarian-top">
          <Link to="/home/" className="btn-backlink">
            <BiLeftArrowAlt className="back-icon" />
          </Link>
          <div className="profile-wrapper">
            <img
              src={currentVeterinarian.profile}
              alt="profile"
              className="profile"
            />
          </div>
        </div>
        <div className="veterinarian-bottom">
          <div className="profile-wrapper">
            <img
              src={currentVeterinarian.profile}
              alt="profile"
              className="profile"
            />
          </div>
          <div className="name-rule">
            <h3>{currentVeterinarian.fname}</h3>
            <span className="rule">{currentVeterinarian.rule}</span>
          </div>
          <div className="veterinarian-userinfo-card-wrapper">
            <div className="userinfo-card">
              <span className="experience">Experience</span>
              <h6>10 years</h6>
            </div>

            <div className="userinfo-card">
              <span className="experience">Experience</span>
              <h6>10 years</h6>
            </div>

            <div className="userinfo-card">
              <span className="experience">Experience</span>
              <h6>10 years</h6>
            </div>
          </div>

          <div className="about">
            <h2>About</h2>
            <p className="about">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
              aperiam accusamus iusto natus aliquid officiis magni quis earum
              fugit! Vitae esse dignissimos earum quam, fuga nisi sed ad numquam
              adipisci?
            </p>
          </div>

          <button className="btn-sent-appointment">
            <Link to="/set-appointment/">Set Appointment</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VeterinarianProfile;
