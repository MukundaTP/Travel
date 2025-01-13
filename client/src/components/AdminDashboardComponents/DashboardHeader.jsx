import { motion } from "framer-motion";

const DashboardHeader = ({ fadeIn }) => {
  return (
    <motion.div
      variants={fadeIn}
      className="bg-white p-8 rounded-2xl shadow-sm border"
    >
      <motion.h1
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-3xl font-bold text-gray-800"
      >
        Dashboard Overview
      </motion.h1>
      <motion.p
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-500 mt-2"
      >
        Welcome back! Here's what's happening today.
      </motion.p>
    </motion.div>
  );
};

export default DashboardHeader;
