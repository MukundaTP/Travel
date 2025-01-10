import { IconComponents } from "@tabler/icons-react";
import { motion } from "framer-motion";

const HistoryAndVisionCard = ({ milestone, index, IconComponent }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-gray-800/50 p-6 rounded-2xl backdrop-blur-sm border border-gray-700"
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <IconComponent className="w-8 h-8 text-white" />
        </motion.div>
        <div className="text-white font-bold mb-2">{milestone.year}</div>
        <div className="text-white font-semibold">{milestone.title}</div>
      </motion.div>
    </motion.div>
  );
};

export default HistoryAndVisionCard;
