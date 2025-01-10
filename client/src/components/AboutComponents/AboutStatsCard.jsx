import { motion } from "framer-motion";

const AboutStatsCard = ({ itemVariants, stat, index }) => {
  return (
    <motion.div
      className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-700/10"
      variants={itemVariants}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="text-4xl font-bold text-gray-700"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        {stat.value}
      </motion.div>
      <div className="text-gray-700 mt-2 font-medium">{stat.label}</div>
    </motion.div>
  );
};

export default AboutStatsCard;
