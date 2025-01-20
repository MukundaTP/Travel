// Navbar.jsx
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Phone,
  Car,
  LogOut,
  User as UserIcon,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "../ui/avatar";

const MobileMenu = ({
  isMobileMenuOpen,
  mobileMenuVariants,
  setIsMobileMenuOpen,
  linkVariants,
  user,
  handleLogout,
  handleAuthClick,
  navItems,
}) => {
  return (
    <>
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
            <motion.div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl px-6 py-6">
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
                    <Car className="h-8 w-8 text-gray-700" />
                    <span className="font-bold text-xl text-gray-800 italic">
                      CTT
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
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        }`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}

                {/* Auth Section - Mobile */}
                <div className="pt-4 border-t border-gray-200">
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 px-3 py-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={user?.avatar?.url}
                            alt={user?.name}
                            loading="lazy"
                          />
                          <AvatarFallback>
                            {user?.name?.charAt(0)?.toUpperCase() || (
                              <UserIcon className="h-4 w-4" />
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900">
                          {user.name}
                        </span>
                      </div>
                      <NavLink
                        to="/profile"
                        className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <UserIcon className="h-5 w-5 mr-2" />
                        Profile
                      </NavLink>
                      {user?.isAdmin && (
                        <NavLink
                          to="/dashboard"
                          className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <LayoutDashboard className="h-5 w-5 mr-2" />
                          Dashboard
                        </NavLink>
                      )}
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center w-full px-3 py-2 text-gray-700 hover:text-blue-600"
                      >
                        <LogOut className="h-5 w-5 mr-2" />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          handleAuthClick("Login");
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Login
                      </Button>
                      <Button
                        className="w-full bg-gray-800 hover:bg-gray-700 text-white"
                        onClick={() => {
                          handleAuthClick("Register");
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Register
                      </Button>
                    </div>
                  )}
                </div>
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

export default MobileMenu;
