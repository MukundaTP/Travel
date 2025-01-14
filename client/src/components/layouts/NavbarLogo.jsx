import { motion } from "framer-motion";
import { Car } from "lucide-react";
import { NavLink } from "react-router-dom";

const NavbarLogo = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex-shrink-0"
    >
      <NavLink to="/" className="flex items-center gap-2 no-underline">
        <Car className="h-8 w-8 text-gray-700" />
        <span className="font-bold text-xl text-gray-800 italic">CTT</span>
      </NavLink>
    </motion.div>
  );
};

export default NavbarLogo;
