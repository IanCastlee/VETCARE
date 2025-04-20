import "./App.css";

import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import LandingPage from "./pages/landingPage/LandingPage";
import Home from "./pages/home/Home";
import VeterinarianProfile from "./pages/veterinarianProfile/VeterinarianProfile";
import SetAppointment from "./pages/setAppointment/SetAppointment";

//VETERINARIAN path
import VeterinarianNavbar from "./pages/VETERINARIAN/components/navbar/Navbar";
import VeterinarianHome from "./pages/VETERINARIAN/pages/home/Home";
import Appointment from "./pages/appointment/Appointment";
import Signin from "./components/signinSignUp/Signin";
import Signup from "./components/signinSignUp/Signup";
import ConfirmationForm from "./components/signinSignUp/ConfirmationForm";
import AdminSidebar from "./pages/ADMIN/components/adminSidebar/AdminSidebar";
import AdminNav from "./pages/ADMIN/components/adminNavbar/AdminNav";

//ADMIN path
import AdminHome from "./pages/ADMIN/home/Home";
import ActiveVeterinarian from "./pages/ADMIN/veterinarian/ActiveVeterinarian";

const Layout = () => {
  const location = useLocation();

  const isHome = location.pathname === "/home/";

  const shouldHideNavbar =
    location.pathname === "/" ||
    location.pathname.startsWith("/view-veterinarian/");
  return (
    <>
      {!shouldHideNavbar && <Navbar isHome={isHome} />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home/" element={<Home />} />
        <Route
          path="/view-veterinarian/:userId"
          element={<VeterinarianProfile />}
        />
        <Route path="/set-appointment/:userId" element={<SetAppointment />} />
        <Route path="/myappointment/" element={<Appointment />} />

        <Route path="/signin/" element={<Signin />} />
        <Route path="/signup/" element={<Signup />} />
        <Route path="/confirm/" element={<ConfirmationForm />} />
      </Routes>
    </>
  );
};

const Veterinarian = () => {
  return (
    <>
      <VeterinarianNavbar />
      <Routes>
        <Route path="/home/:vetId" element={<VeterinarianHome />} />
      </Routes>
    </>
  );
};

const Admin = () => {
  return (
    <>
      <div className="admin-container">
        <AdminSidebar />
        <div className="admin-left">
          <AdminNav />
          <div className="admin-content">
            <Routes>
              <Route path="/home/" element={<AdminHome />} />
              <Route
                path="/active-veterinarian/"
                element={<ActiveVeterinarian />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/veterinarian/*" element={<Veterinarian />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </Router>
  );
};

export default App;
