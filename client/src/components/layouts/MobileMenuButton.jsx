import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const MobileMenuButton = ({ setIsMobileMenuOpen, isMobileMenuOpen }) => {
  return (
    <div className="block md:hidden">
      {" "}
      {/* Changed to block to ensure visibility on mobile */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Menu className="h-6 w-6" aria-hidden="true" /> // This is the hamburger icon
        )}
      </motion.button>
    </div>
  );
};

export default MobileMenuButton;
