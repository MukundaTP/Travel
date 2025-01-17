import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const EnhancednavigationButtons = ({ paginate }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-between p-8 z-20">
      <motion.button
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => paginate("left")}
        className="p-4 rounded-full bg-black/30 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 group"
      >
        <ChevronLeft className="w-8 h-8 text-white group-hover:text-white/90" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => paginate("right")}
        className="p-4 rounded-full bg-black/30 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 group"
      >
        <ChevronRight className="w-8 h-8 text-white group-hover:text-white/90" />
      </motion.button>
    </div>
  );
};

export default EnhancednavigationButtons;
