import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import LandingPage from "./pages/landingPage/LandingPage";
import Home from "./pages/home/Home";
import VeterinarianProfile from "./pages/veterinarianProfile/VeterinarianProfile";
import SetAppointment from "./pages/setAppointment/SetAppointment";

//ADMIN path
import VeterinarianNavbar from "./pages/VETERINARIAN/components/navbar/Navbar";
import VeterinarianHome from "./pages/VETERINARIAN/pages/home/Home";

const Layout = () => {
  const location = useLocation();
  const shouldHideNavbar =
    location.pathname === "/" || location.pathname.startsWith("/veterinarian/");
  return (
    <>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home/" element={<Home />} />
        <Route path="/veterinarian/:userId" element={<VeterinarianProfile />} />
        <Route path="/set-appointment/" element={<SetAppointment />} />
      </Routes>
    </>
  );
};

const Veterinarian = () => {
  return (
    <>
      <VeterinarianNavbar />
      <Routes>
        <Route path="/home/" element={<VeterinarianHome />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<Veterinarian />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </Router>
  );
};

export default App;
