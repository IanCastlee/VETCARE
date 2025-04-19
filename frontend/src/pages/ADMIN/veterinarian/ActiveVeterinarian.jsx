import { useEffect, useState } from "react";
import "./Veterinarian.scss";
import { motion } from "framer-motion";
import axiosIntance from "../../../../axios";

//ICONS
import { FaTrashAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { MdAddBox } from "react-icons/md";

const ActiveVeterinarian = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalServices, setShowModalShowModalServcies] = useState(false);
  const [veterinarian, setVeterinarian] = useState([]);

  const [veterinarianData, setVeterinarianData] = useState({
    fullname: "",
    specialization: "",
    age: "",
    gender: "",
    time: "",
    duration: "",
    experience: "",
    certificate: "",
    address: "",
    phone: "",
    about: "",
    profile: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setVeterinarianData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //services
  const [servicesForm, setServicesForm] = useState({
    service: "",
    price: "",
  });

  const handleChangeServices = (e) => {
    const { name, value } = e.target;

    setServicesForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //handle submmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("first");

    const formData = new FormData();
    formData.append("fullname", veterinarianData.fullname);
    formData.append("specialization", veterinarianData.specialization);
    formData.append("age", veterinarianData.age);
    formData.append("gender", veterinarianData.gender);
    formData.append("time", veterinarianData.time);
    formData.append("duration", veterinarianData.duration);
    formData.append("experience", veterinarianData.experience);
    formData.append("certificate", veterinarianData.certificate);
    formData.append("address", veterinarianData.address);
    formData.append("phone", veterinarianData.phone);
    formData.append("about", veterinarianData.about);
    formData.append("profile", veterinarianData.profile);
    formData.append("email", veterinarianData.email);
    formData.append("password", veterinarianData.cpassword);

    try {
      const res = await axiosIntance.post(
        "admin/veterinarian/PostVeterinarian.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.success) {
        console.log("Response : ", res.data.message);
      } else {
        console.log("Error : ", res.data);
      }
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  //get veterinarian
  useEffect(() => {
    const veterinarian = async () => {
      try {
        const res = await axiosIntance(
          "admin/veterinarian/GetVeterinarian.php"
        );
        if (res.data.success) {
          setVeterinarian(res.data.data);
          console.log("DATA : ", res.data.data);
        } else {
          console.log("Error : ", res.data.data);
        }
      } catch (error) {
        console.log("Error : ", error);
      }
    };

    veterinarian();
  }, []);

  //handleClikedServices
  const [clickedUserId, setClickedUserId] = useState(null);
  const handleClikedServices = (user_id) => {
    setClickedUserId(user_id);
    if (user_id) {
      setShowModalShowModalServcies(true);
    }
  };

  const handleSubmitServices = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosIntance.post(
        "admin/veterinarian/PostVetServices.php",
        {
          user_id: clickedUserId,
          service: servicesForm.service,
          price: servicesForm.price,
        }
      );
      if (res.data.success) {
        console.log("RESPONSE : ", res.data.message);
        setServicesForm({
          service: "",
          price: "",
        });
      } else {
        console.log("ERROR : ", res.data);
      }
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  return (
    <>
      <div className="admin-veterinarian">
        <div className="top">
          <div className="left">
            <h3>ACTIVE VETERINARIAN</h3>
          </div>
          <div className="right">
            <div className="search-input">
              <input type="text" placeholder="Search" />{" "}
              <FiSearch className="icon" />
            </div>

            <button
              title="Add New Record"
              className="btn-addnew"
              onClick={() => setShowModal(!showModal)}
            >
              <IoIosAdd className="icon" />
            </button>
          </div>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Profile</th>
                <th>Fullname</th>
                <th>Specialization</th>
                <th>Address</th>
                <th>Certification</th>
                <th>Experience</th>
                <th className="action-header">Action</th>
              </tr>
            </thead>
            <tbody>
              {veterinarian &&
                veterinarian.map((item) => (
                  <tr key={item.user_id}>
                    <td style={{ fontWeight: "700" }}>{item.user_id}</td>
                    <td>
                      <img
                        style={{
                          height: "40px",
                          width: "40px",
                          objectFit: "cover",
                        }}
                        src={`http://localhost/VETCARE/backend/uploads/${item.profile}`}
                        alt="profile_pic"
                      />
                    </td>

                    <td>{item.fullname}</td>
                    <td>{item.specialization}</td>
                    <td>{item.address}</td>
                    <td>{item.certification}</td>
                    <td>{item.experience}</td>
                    <td className="btns-wrapper">
                      <button
                        title="Add Services"
                        className="btn-add-services"
                        onClick={() => handleClikedServices(item.user_id)}
                      >
                        <MdAddBox className="icon" />
                      </button>
                      <button title="Delete" className="btn">
                        <FaTrashAlt className="icon" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="overlay">
          <motion.div
            initial={{ opacity: 0, y: -200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="modal"
          >
            <div className="container">
              <div className="top">
                <h3 className="title">ADD NEW VETERINARIAN</h3>
                <IoMdClose
                  className="icon"
                  onClick={() => setShowModal(false)}
                />
              </div>

              <div className="form">
                <div className="form-wrapper">
                  <div className="input-label-wrapper">
                    <label htmlFor="fullname">Doctor's Fullname</label>
                    <input
                      className="input"
                      type="text"
                      id="fullname"
                      name="fullname"
                      placeholder="Doctor's Fullname"
                      value={veterinarianData.fullname}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-label-wrapper">
                    <label htmlFor="specialization">Specialization</label>
                    <select
                      value={veterinarianData.specialization}
                      onChange={handleChange}
                      name="specialization"
                      id="specialization"
                    >
                      <option value="">Specialization</option>{" "}
                      <option value="Dog Veterinarian">Dog Veterinarian</option>
                      <option value="Cat Veterinarian">Cat Veterinarian</option>
                      <option value="Bird Veterinarian">
                        Bird Veterinarian
                      </option>
                    </select>
                  </div>
                </div>
                <div className="form-wrapper">
                  <div className="input-label-wrapper">
                    <label htmlFor="age">Age</label>
                    <input
                      className="input"
                      type="text"
                      id="age"
                      name="age"
                      placeholder="Age"
                      value={veterinarianData.age}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-radio-wrapper">
                    <label htmlFor="age">Gender</label>

                    <div className="radio-button-wrapper">
                      <div className="radio-wrapper">
                        <input
                          className="radio-input"
                          name="gender"
                          type="radio"
                          value="male"
                          onChange={handleChange}
                        />
                        <label htmlFor="">Male</label>
                      </div>
                      <div className="radio-wrapper">
                        <input
                          className="radio-input"
                          name="gender"
                          type="radio"
                          value="female"
                          onChange={handleChange}
                        />
                        <label htmlFor="">Female</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-wrapper">
                  <div className="input-label-wrapper">
                    <label htmlFor="time">Time</label>
                    <input
                      className="input"
                      type="text"
                      id="time"
                      name="time"
                      placeholder="Time"
                      value={veterinarianData.time}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-label-wrapper">
                    <label htmlFor="duration">Duration</label>
                    <input
                      className="input"
                      type="text"
                      id="duration"
                      name="duration"
                      placeholder="Duration"
                      value={veterinarianData.duration}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-wrapper">
                  <div className="input-label-wrapper">
                    <label htmlFor="experience">Experience</label>
                    <input
                      className="input"
                      type="text"
                      id="experience"
                      name="experience"
                      placeholder="Experience"
                      value={veterinarianData.experience}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-label-wrapper">
                    <label htmlFor="certification">Certifications</label>
                    <input
                      className="input"
                      type="text"
                      id="certification"
                      name="certificate"
                      placeholder="Certification"
                      value={veterinarianData.certificate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-address-wrapper">
                  <div className="input-label-wrapper">
                    <label htmlFor="address">Address</label>
                    <textarea
                      value={veterinarianData.address}
                      onChange={handleChange}
                      name="address"
                      id="address"
                    ></textarea>
                  </div>

                  <div className="input-label-wrapper">
                    <label htmlFor="phone">Phone</label>
                    <input
                      className="input"
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="Phone"
                      value={veterinarianData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-textarea-wrapper">
                  <label htmlFor="about">About</label>
                  <textarea
                    value={veterinarianData.about}
                    onChange={handleChange}
                    name="about"
                    id="about"
                    placeholder="About"
                  ></textarea>
                </div>

                <div className="form-textarea-wrapper">
                  <label htmlFor="about">Profile Picture</label>
                  <input
                    type="file"
                    onChange={(e) =>
                      setVeterinarianData({
                        ...veterinarianData,
                        profile: e.target.files[0],
                      })
                    }
                  />
                </div>

                {/* CREDENTIALS */}
                <div className="credentials">
                  <div className="divider">
                    <span className="title">CREDENTIALS</span>
                  </div>
                  <div className="form-wrapper">
                    <label htmlFor="about">Email</label>
                    <input
                      className="input"
                      type="email"
                      name="email"
                      value={veterinarianData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-wrapper">
                    <label htmlFor="password">Password</label>
                    <input
                      className="input"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={veterinarianData.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-wrapper">
                    <label htmlFor="cPassword">Confirm Password</label>
                    <input
                      className="input"
                      type="cPassword"
                      placeholder="Cofirm password"
                      name="cpassword"
                      value={veterinarianData.cpassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="button-wrapper">
                <button className="btn-submit" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {showModalServices && (
        <div className="addservices">
          <motion.div
            initial={{ opacity: 0, y: -200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container"
          >
            <div className="top">
              <div className="left">
                <h3>ADD SERVICES</h3>
              </div>

              <IoMdClose
                className="icon"
                onClick={() => setShowModalShowModalServcies(false)}
              />
            </div>

            <div className="wrapper">
              <div className="form">
                <div className="input-wrapper">
                  <label htmlFor="service">Service</label>
                  <input
                    style={{ width: "100%" }}
                    type="text"
                    name="service"
                    placeholder="Service"
                    value={servicesForm.service}
                    onChange={handleChangeServices}
                  />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="price">Price</label>
                  <input
                    style={{ width: "100%" }}
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={servicesForm.price}
                    onChange={handleChangeServices}
                  />
                </div>
              </div>

              <button
                className="btn-add-service"
                onClick={handleSubmitServices}
              >
                SUBMIT
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ActiveVeterinarian;
