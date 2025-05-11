import { useEffect, useState } from "react";
import "./Veterinarian.scss";
import { motion } from "framer-motion";
import axiosIntance from "../../../../axios";
import Loader2 from "../../../components/loader/Loader2";

//ICONS
import { FaTrashAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { MdAddBox } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Emptydata from "../../../components/emptydata/Emptydata";

const ActiveVeterinarian = () => {
  const [showModalServices, setShowModalShowModalServcies] = useState(false);
  const [veterinarian, setVeterinarian] = useState([]);
  const [veterinarianServices, setVeterinarianServices] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [servicesData, setServicesData] = useState([]);

  const [activeFormModal, setActiveFormModal] = useState("");
  const [showDelForm, setShowDelForm] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [veterinarianData, setVeterinarianData] = useState({
    user_id: "",
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
        const res = await axiosIntance.get(
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

    setShowLoader(true);
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
        setServicesForm({
          service: "",
          price: "",
        });

        setShowLoader(false);
      } else {
        setShowLoader(false);
        console.log("ERROR : ", res.data);
      }
    } catch (error) {
      setShowLoader(false);
      console.log("Error : ", error);
    }
  };
  const getServices = async () => {
    setShowLoader(true);
    try {
      const res = await axiosIntance.get("admin/veterinarian/GetServices.php");
      if (res.data.data) {
        setVeterinarianServices(res.data.data);
        setShowLoader(false);
      }
    } catch (error) {
      setShowLoader(false);
      console.log("Error : ", error);
    }
  };
  //get services
  useEffect(() => {
    getServices();
  }, []);

  const setShowEditModal = (item) => {
    setVeterinarianData({
      user_id: item.user_id || "",
      fullname: item.fullname || "",
      specialization: item.specialization || "",
      age: item.age || "",
      gender: item.gender || "",
      time: item.time || "",
      duration: item.duration || "",
      experience: item.experience || "",
      certificate: item.certification || "",
      address: item.address || "",
      phone: item.phone || "",
      about: item.about || "",
      profile: item.profile || "",
      email: item.email || "",
      password: "",
      cpassword: "",
    });

    setServicesData(item.services);
    setActiveFormModal("update");
  };

  //closeFormModal
  const closeFormModal = () => {
    setVeterinarianData({
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

    setActiveFormModal("");
  };

  //handleUpdate Veterinarian Information
  const handleUpdateVeterinarianInof = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_id", veterinarianData.user_id);
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
        "admin/veterinarian/UpdateVeterinarian.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.success) {
        console.log("Response : ", res.data.message);

        setVeterinarian((prevData) =>
          prevData.map((vet) =>
            Number(vet.user_id) === Number(veterinarianData.user_id)
              ? { ...vet, ...veterinarianData }
              : vet
          )
        );

        closeFormModal();
      } else {
        console.log("Error : ", res.data);
      }
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  //handle Delete
  // Assuming `setVeterinarian` is your state setter and `veterinarian` is your array
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosIntance.post(
        `admin/veterinarian/SetAsNotActiveVeterinarian.php?user_id=${showDelForm}`
      );

      if (res.data.success) {
        console.log("RES : ", res.data.message);

        setVeterinarian((prevData) =>
          prevData.filter((vet) => vet.user_id !== showDelForm)
        );

        setShowDelForm(null);
      } else {
        console.log("Delete failed:", res.data);
      }
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  //filteredVeterinarians
  const filteredVeterinarians = veterinarian.filter(
    (item) =>
      item.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="admin-veterinarian">
        <div className="top">
          <div className="left">
            <h3>ACTIVE VETERINARIAN</h3>
          </div>
          <div className="right">
            <div className="search-input">
              <input
                type="text"
                placeholder="Search Name, Specialization, Address"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch className="icon" />
            </div>

            <button
              title="Add New Record"
              className="btn-addnew"
              onClick={() => setActiveFormModal("add")}
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
              {filteredVeterinarians.length > 0 ? (
                filteredVeterinarians.map((item) => (
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
                        <FaTrashAlt
                          className="icon"
                          onClick={() => setShowDelForm(item.user_id)}
                        />
                      </button>
                      <button
                        title="Edit"
                        className="btn"
                        onClick={() => setShowEditModal(item)}
                      >
                        <FaEdit style={{ color: "blue" }} className="icon" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <Emptydata />
              )}
            </tbody>
          </table>
        </div>
      </div>

      {activeFormModal !== "" && (
        <div className="overlay">
          <motion.div
            initial={{ opacity: 0, y: -200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="modaladdvet"
          >
            <div className="container">
              <div className="top">
                <h3 className="title">
                  {activeFormModal === "update"
                    ? "UPDATE VETERINARIAN INFO"
                    : activeFormModal === "add"
                    ? "ADD NEW VETERINARIAN"
                    : ""}
                </h3>
                <IoMdClose className="icon" onClick={closeFormModal} />
              </div>

              <div className="form">
                <div className="form-wrapper">
                  <input
                    type="hidden"
                    name="user_id"
                    value={veterinarianData.user_id}
                  />
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
                          checked={veterinarianData.gender === "male"}
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
                          checked={veterinarianData.gender === "female"}
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

                {/* SERVICES */}
                {activeFormModal === "update" && (
                  <div className="services-container">
                    <div className="divider">
                      <span className="title">SERVICES</span>
                    </div>
                    <div className="services-wrapper">
                      {servicesData.length > 0 ? (
                        servicesData.map((item, index) => (
                          <div className="services-list">
                            <span key={index}>{item.vservices}</span>
                            <div className="actions">
                              <FaTrashAlt className="icon-del" />
                              <FaEdit className="icon-update" />
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No Services yet</p>
                      )}
                    </div>
                  </div>
                )}

                {/* CREDENTIALS */}
                {activeFormModal === "add" && (
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
                )}
              </div>

              <div className="button-wrapper">
                <button
                  className="btn-submit"
                  onClick={
                    activeFormModal === "add"
                      ? handleSubmit
                      : activeFormModal === "update"
                      ? handleUpdateVeterinarianInof
                      : ""
                  }
                >
                  {showLoader ? (
                    <Loader2 />
                  ) : activeFormModal === "add" ? (
                    " SUBMIT"
                  ) : activeFormModal === "update" ? (
                    "UPDATE"
                  ) : (
                    ""
                  )}
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
                {showLoader ? <Loader2 /> : "SUBMIT"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {showDelForm !== null && (
        <div className="delete-overlay">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="delete"
          >
            <div className="top">
              <h6>Confirmation</h6>
            </div>

            <p>Are you sure this veterinarian is not active?</p>

            <div className="bot">
              <button className="btn-yes" onClick={handleDelete}>
                Yes
              </button>
              <button className="btn-no" onClick={() => setShowDelForm(null)}>
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ActiveVeterinarian;
