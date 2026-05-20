import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Home from "../components/pages/Home/Home";
import NavBar from "../components/layout/NavBar/NavBar";
import Footer from "../components/layout/Footer/Footer";
import Services from "../components/pages/Services/Services";
import Appointments from "../components/pages/Appointments/Appointments";
import Users from "../components/pages/Users/Users";
import Login from "../components/pages/Login/Login";
import Signup from "../components/pages/Signup/Signup";
import ForgotPassword from "../components/pages/Password/ForgotPassword";
import ResetPassword from "../components/pages/Password/ResetPassword";
import ChangePassword from "../components/pages/Password/ChangePassword";
import ConfirmAppointment from "../components/pages/Confirmation/ConfirmAppointment";
import ProtectedRoute from "../components/routing/ProtectedRoute/ProtectedRoute";

import styles from "./App.module.css";

const PUBLIC_ROUTES = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
];

// Match /confirm/:token (the SMS/WhatsApp/Email deep link) for chrome-hiding.
function isConfirmRoute(pathname) {
  return /^\/confirm\/[^/]+$/.test(pathname);
}

function AppLayout() {
  const location = useLocation();
  const isPublicPage = PUBLIC_ROUTES.includes(location.pathname);
  // Change-password screen also hides the navbar/footer because the user is
  // mid-flow (likely forced-rotation or first login).
  // /confirm/:token is the public SMS/WhatsApp/Email deep-link landing — it
  // also runs chromeless so the page reads as a standalone confirmation.
  const hideChrome =
    isPublicPage ||
    location.pathname === "/change-password" ||
    isConfirmRoute(location.pathname);

  return (
    <div className={styles.app}>
      {!hideChrome && <NavBar />}

      <main className={styles.main}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* Public SMS / WhatsApp / Email reminder landing — token is the auth. */}
          <Route path="/confirm/:token" element={<ConfirmAppointment />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/users" element={<Users />} />
          </Route>
        </Routes>
      </main>

      {!hideChrome && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
