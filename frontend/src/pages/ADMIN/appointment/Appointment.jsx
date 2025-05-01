import { useEffect, useState } from "react";
import "./Appointment.scss";
import axiosIntance from "../../../../axios";

//ICONS
import { FaTrashAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { MdAddBox } from "react-icons/md";

const Appointment = () => {
  const [doneAppointment, setDoneAppointment] = useState([]);

  //get veterinarian
  useEffect(() => {
    const veterinarian = async () => {
      try {
        const res = await axiosIntance.get(
          "admin/appointment/GetDoneAppointment.php"
        );
        if (res.data.success) {
          setDoneAppointment(res.data.data);
          console.log("DATA : ", res.data.data);
        } else {
          console.log("Error : ", res.data);
        }
      } catch (error) {
        console.log("Error : ", error);
      }
    };

    veterinarian();
  }, []);

  return (
    <>
      <div className="admin-appointment">
        <div className="top">
          <div className="left">
            <h3>APPOINTMENT</h3>
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
                <th>Client Fullname</th>
                <th>Pet Type</th>
                <th>Pet Name</th>
                <th>Service</th>
                <th>Pet Healt Issue</th>
                <th>Dr Incharge</th>
                <th>Payment</th>
                <th>Status</th>
                <th className="action-header">Action</th>
              </tr>
            </thead>
            <tbody>
              {doneAppointment &&
                doneAppointment.map((item) => (
                  <tr key={item.user_id}>
                    <td style={{ fontWeight: "700" }}>{item.appointment_id}</td>
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

                    <td>{item.clientName}</td>
                    <td>{item.pet_type}</td>
                    <td>{item.pet_name}</td>
                    <td>{item.service}</td>
                    <td>{item.current_health_issue}</td>
                    <td>Dr. {item.drFullname}</td>
                    <td>{item.paid_payment}</td>
                    <td>{item.status}</td>
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
    </>
  );
};

export default Appointment;
