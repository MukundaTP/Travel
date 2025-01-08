import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MapPin, Phone, Car } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/contact", label: "Contact" },
  ];

  const navbarVariants = {
    initial: {
      y: -100,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const linkVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
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
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <NavLink to="/" className="flex items-center gap-2 no-underline">
                <Car className="h-8 w-8 text-gray-700" />
                <span className="font-bold text-xl text-gray-800 italic ">
                  TravelEase
                </span>
              </NavLink>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navItems.map((item) => (
                <motion.div
                  key={item.path}
                  variants={linkVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `no-underline relative px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "text-blue-600"
                          : "text-gray-700 hover:text-blue-600"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                            initial={false}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-25"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl px-6 py-6"
              variants={mobileMenuVariants}
            >
              <div className="flex items-center justify-between mb-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink
                    to="/"
                    className="flex items-center gap-2 no-underline"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Car className="h-8 w-8 text-gray-700 " />
                    <span className="font-bold text-xl text-gray-800 italic">
                      TravelEase
                    </span>
                  </NavLink>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-md p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <motion.div
                    key={item.path}
                    variants={linkVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `no-underline block px-3 py-2 text-base font-medium rounded-md ${
                          isActive
                            ? "text-blue-600 bg-blue-50 "
                            : "text-gray-700 hover:text-blue-600 hover:bg-gray-50 "
                        }`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              {/* Contact info in mobile menu */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col space-y-4">
                  <a
                    href="tel:+1234567890"
                    className="flex items-center text-gray-600 hover:text-blue-600"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    <span>+1 234 567 890</span>
                  </a>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>123 Travel Street, City</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
