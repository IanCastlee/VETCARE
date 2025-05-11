import "./Shop.scss";

import { useEffect, useState } from "react";
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

const Shop = () => {
  const [showModalServices, setShowModalShowModalServcies] = useState(false);
  const [veterinarian, setVeterinarian] = useState([]);
  const [veterinarianServices, setVeterinarianServices] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [servicesData, setServicesData] = useState([]);

  const [activeFormModal, setActiveFormModal] = useState("");
  const [showDelForm, setShowDelForm] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    specialization: "",
    category: "",
    med_name: "",
    stock: "",
    price: "",
    dosage: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(formData.image);
  //handle submmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataAppend = new FormData();
    formDataAppend.append("specialization", formData.specialization);
    formDataAppend.append("category", formData.category);
    formDataAppend.append("med_name", formData.med_name);
    formDataAppend.append("stock", formData.stock);
    formDataAppend.append("price", formData.price);
    formDataAppend.append("dosage", formData.dosage);
    formDataAppend.append("description", formData.description);
    formDataAppend.append("image", formData.image);

    try {
      const res = await axiosIntance.post(
        "admin/shop/PostMedicine.php",
        formDataAppend,
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
      <div className="admin-shop">
        <div className="top">
          <div className="left">
            <h3>SHOP MANAGEMENT</h3>
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
        <div className="overlay-shop">
          <motion.div
            initial={{ opacity: 0, y: -200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="modaladdshop"
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
                  {/* <input
                    type="hidden"
                    name="user_id"
                    value={veterinarianData.user_id}
                  /> */}
                  <div className="input-label-wrapper">
                    <label htmlFor="specialization">
                      Animal Specialization
                    </label>
                    <select
                      value={formData.specialization}
                      onChange={handleChange}
                      name="specialization"
                      id="specialization"
                    >
                      <option value="">Animal Specialization</option>{" "}
                      <option value="Dog Medicine">Dog Medicine</option>
                      <option value="Cat Medicine">Cat Medicine</option>
                      <option value="Bird Medicine">Bird Medicine</option>
                    </select>
                  </div>

                  <div className="input-label-wrapper">
                    <label htmlFor="category">Category</label>
                    <select
                      value={formData.category}
                      onChange={handleChange}
                      name="category"
                      id="category"
                    >
                      <option value="">Category</option>{" "}
                      <option value="Flea & Tick Prevention">
                        Flea & Tick Prevention
                      </option>
                      <option value="Dewormer">Dewormer</option>
                    </select>
                  </div>
                </div>

                <div className="form-wrapper">
                  <div className="input-label-wrapper">
                    <label htmlFor="med_name">Medicine Name</label>
                    <input
                      className="input"
                      type="text"
                      id="med_name"
                      name="med_name"
                      placeholder="Medicine Name"
                      value={formData.med_name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-label-wrapper">
                    <label htmlFor="stock">Stock</label>
                    <input
                      className="input"
                      type="number"
                      id="stock"
                      name="stock"
                      placeholder="Stock"
                      value={formData.stock}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-wrapper">
                  <div className="input-label-wrapper">
                    <label htmlFor="price">Price</label>
                    <input
                      className="input"
                      type="text"
                      id="price"
                      name="price"
                      placeholder="Price"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-label-wrapper">
                    <label htmlFor="dosage">Dosage</label>
                    <input
                      className="input"
                      type="text"
                      id="dosage"
                      name="dosage"
                      placeholder="Dosage"
                      value={formData.certificate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-address-wrapper">
                  <div className="input-label-wrapper">
                    <label htmlFor="description">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={handleChange}
                      name="description"
                      placeholder="Description"
                      id="description"
                    ></textarea>
                  </div>
                </div>

                <div className="form-textarea-wrapper">
                  <label htmlFor="image">Medicine Image</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        image: e.target.files[0],
                      }))
                    }
                  />
                </div>
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

export default Shop;
