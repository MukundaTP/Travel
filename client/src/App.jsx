import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa"; // Import arrow icon
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import TravelNavbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UpdatePassword from "./pages/UpdatePassword";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ContactQueries from "./pages/Admin/ContactQueries";
import Reviews from "./pages/Admin/Reviews";
import Users from "./pages/Admin/Users";
import AdminLayout from "./pages/Admin/AdminLayout";
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
    <BrowserRouter>
      <TravelNavbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/services" element={<Services />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/update-password" element={<UpdatePassword />}></Route>
        <Route path="/reset/password/:token" element={<ResetPassword />} />{" "}
        <Route path="/profile" element={<Profile />} />{" "}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<AdminDashboard />} />{" "}
          <Route path="/queries" element={<ContactQueries />} />{" "}
          <Route path="/reviews" element={<Reviews />} />{" "}
          <Route path="/users" element={<Users />} />{" "}
        </Route>
        <Route path="*" element={<NotFound />}></Route>
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
    </BrowserRouter>
  );
};

export default App;
