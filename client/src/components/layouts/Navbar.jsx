// Navbar.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { LogoutUser } from "../../../Redux/UserSlice";
import { useLogoutMutation } from "../../../Redux/authApi";
import { useAlert } from "react-alert";
import AdminAuthPopup from "./AdminAuthPopup";
import UserMenu from "./UserMenu";
import AuthButtons from "./AuthButtons";
import MobileMenu from "./MobileMenu";
import DesktopNavigation from "./DesktopNavigation";
import {
  linkVariants,
  mobileMenuVariants,
  navbarVariants,
  navItems,
} from "@/constants/MobileVariants";
import NavbarLogo from "./NavbarLogo";
import MobileMenuButton from "./MobileMenuButton";

// Main Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const [authType, setAuthType] = useState("");
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state?.user);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      const data = await logout().unwrap();
      alert.success(data?.message);
      dispatch(LogoutUser());
      navigate("/login");
    } catch (e) {
      alert.error(e?.data?.err);
    }
  };

  const handleAuthClick = (type) => {
    setAuthType(type);
    setIsAuthPopupOpen(true);
  };

  const handleAuthSuccess = () => {
    navigate(`/${authType.toLowerCase()}`);
  };

  return (
    <>
      <motion.nav
        variants={navbarVariants}
        initial="initial"
        animate="animate"
        className={`fixed top-0 left-0 right-0 z-[2000] ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-white"
        } transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <NavbarLogo />

            {/* Desktop Navigation */}
            <DesktopNavigation
              navItems={navItems}
              linkVariants={linkVariants}
            />

            {/* Auth Section - Desktop */}
            <div className="hidden md:block">
              {user ? (
                <UserMenu
                  user={user}
                  handleLogout={handleLogout}
                  navigate={navigate}
                />
              ) : (
                <AuthButtons handleAuthClick={handleAuthClick} />
              )}
            </div>

            {/* Mobile menu button */}
            <MobileMenuButton
              setIsMobileMenuOpen={setIsMobileMenuOpen}
              isMobileMenuOpen={isMobileMenuOpen}
            />
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}

      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        mobileMenuVariants={mobileMenuVariants}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        linkVariants={linkVariants}
        user={user}
        handleLogout={handleLogout}
        handleAuthClick={handleAuthClick}
        navItems={navItems}
      />
      {console.log(isMobileMenuOpen)}

      {/* Admin Authentication Popup */}
      <AdminAuthPopup
        isOpen={isAuthPopupOpen}
        onClose={() => setIsAuthPopupOpen(false)}
        onSuccess={handleAuthSuccess}
        authType={authType}
      />
    </>
  );
};

export default Navbar;
