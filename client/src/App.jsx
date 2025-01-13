import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa"; // Import arrow icon
import React, { useState, useEffect, Suspense } from "react";
import ProtectedRoute from "./components/layouts/ProtectedRoute";
import PageLoader from "./components/layouts/PageLoader";
import { HelmetProvider } from "react-helmet-async";
import SEO from "./components/SEO";
const Home = React.lazy(() => import("./pages/Home"));
const TravelNavbar = React.lazy(() => import("./components/layouts/Navbar"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Services = React.lazy(() => import("./pages/Services"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Footer = React.lazy(() => import("./components/Footer"));
const Register = React.lazy(() => import("./pages/Register"));
const Login = React.lazy(() => import("./pages/Login"));
const UpdatePassword = React.lazy(() => import("./pages/UpdatePassword"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));
const Profile = React.lazy(() => import("./pages/Profile"));
const AdminDashboard = React.lazy(() => import("./pages/Admin/AdminDashboard"));
const ContactQueries = React.lazy(() => import("./pages/Admin/ContactQueries"));
const Reviews = React.lazy(() => import("./pages/Admin/Reviews"));
const Users = React.lazy(() => import("./pages/Admin/Users"));
const AdminLayout = React.lazy(() => import("./pages/Admin/AdminLayout"));
// import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  const [isVisible, setIsVisible] = useState(false);

  const checkScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);

    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <>
      <HelmetProvider>
        <SEO />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <TravelNavbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/update-password" element={<UpdatePassword />} />
              <Route
                path="/reset/password/:token"
                element={<ResetPassword />}
              />
              <Route path="/profile" element={<Profile />} />
              <Route element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route path="/dashboard" element={<AdminDashboard />} />
                  <Route path="/queries" element={<ContactQueries />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/users" element={<Users />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />

            {/* Scroll-to-top button */}
            {isVisible && (
              <div
                onClick={scrollToTop}
                className="fixed bottom-10 right-10 cursor-pointer animate-bounce z-50"
              >
                <FaArrowUp className="w-10 h-10 text-white bg-gray-900 p-2 rounded-full" />
              </div>
            )}
          </Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </>
  );
};

export default App;
