import "./Home.scss";

//IMAGES
import profile from "../../../../assets/imges/veterinarian1.png";

//ICONS
import { CiStethoscope } from "react-icons/ci";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import { TbCancel } from "react-icons/tb";
import { useEffect, useState } from "react";
import { VscClose } from "react-icons/vsc";
import { useParams } from "react-router-dom";
import axiosIntance from "../../../../../axios";

const Home = () => {
  const vetId = useParams();

  const [veterinarianInfo, setVeterinarianInfo] = useState([]);
  const [veterinarianServices, setVeterinarianServices] = useState([]);

  useEffect(() => {
    const getClickedVeterinarian = async () => {
      try {
        const res = await axiosIntance.post(
          "admin/veterinarian/GetClickedVeterinarian.php",
          { user_id: vetId.vetId }
        );
        if (res.data.success) {
          setVeterinarianInfo(res.data.data.veterinarianInfo);
          console.log(res.data.data.veterinarianInfo);
          setVeterinarianServices(res.data.data.services);

          console.log(res.data.data.veterinarianInfo);
        } else {
          console.log(res.data.message);
        }
      } catch (error) {
        console.log("Error : ", error);
      }
    };
    getClickedVeterinarian();
  }, [vetId]);

  const [showModalMenu, setShowModalMenu] = useState(false);
  return (
    <>
      <div className="veterinarian-home">
        <div className="container">
          <div className="left">
            <div className="left-wrapper">
              <div className="profile-wrapper">
                <img
                  src={`http://localhost/VETCARE/backend/uploads/${veterinarianInfo?.profile}`}
                  alt="profile_pic"
                  className="profile"
                />
              </div>

              <div className="name-rule">
                <h3>
                  <CiStethoscope className="icon" /> Dr.
                  {veterinarianInfo?.fullname}
                </h3>
                <span> {veterinarianInfo?.specialization}</span>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="right-wrapper">
              <div className="today-appointment">
                <h4>Today's Appointment</h4>

                <div className="card">
                  <div className="left-card">
                    <img src="profile" alt="profile" className="profile-card" />
                  </div>

                  <div className="right-card">
                    <div className="top">
                      <div className="name-info">
                        <div className="name">Braka Kkaka</div>
                        <p>04-11-25</p>
                      </div>
                      <MdOutlineMoreHoriz
                        onClick={() => setShowModalMenu(!showModalMenu)}
                        className="more-icon"
                      />
                    </div>

                    <div className="bot">
                      <div className="pet">
                        <span className="type">Pet : Dog</span>
                      </div>
                    </div>

                    {showModalMenu && (
                      <div className="modal-menu">
                        <div className="top">
                          <VscClose
                            className="back-icon"
                            onClick={() => setShowModalMenu(false)}
                          />
                        </div>
                        <div className="menu">
                          <button className="btn">
                            <FaRegCircleCheck className="icon" />
                            Done
                          </button>
                          <button className="btn">
                            <TbCancel className="icon" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
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
                      <MdOutlineMoreHoriz
                        className="more-icon"
                        onClick={() => setShowModalMenu(!showModalMenu)}
                      />
                    </div>

                    {showModalMenu && (
                      <div className="modal-menu">
                        <div className="top">
                          <VscClose
                            className="back-icon"
                            onClick={() => setShowModalMenu(false)}
                          />
                        </div>
                        <div className="menu">
                          <button className="btn">
                            <FaRegCircleCheck className="icon" />
                            Done
                          </button>
                          <button className="btn">
                            <TbCancel className="icon" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

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
    </>
  );
};

export default Home;
