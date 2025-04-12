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

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
