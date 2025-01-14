import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const DesktopNavigation = ({ navItems, linkVariants }) => {
  return (
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
                isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
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
  );
};

export default DesktopNavigation;
