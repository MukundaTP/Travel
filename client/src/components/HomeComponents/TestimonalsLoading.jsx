import { motion } from "framer-motion";
import { RefreshCcw } from "lucide-react";

const TestimonalsLoading = () => {
  return (
    <div className="fixed bottom-4 right-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-lg rounded-full px-4 py-2 text-sm text-gray-600 flex items-center gap-2"
      >
        <RefreshCcw className="h-4 w-4 animate-spin" />
        Updating...
      </motion.div>
    </div>
  );
};

export default TestimonalsLoading;
