import { motion } from "framer-motion";
import { Button } from "../ui/button";

const EmptyState = ({ onOpenDrawer }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center min-h-[400px] text-center px-4"
  >
    <h3 className="text-2xl font-bold mb-2">No Reviews Yet</h3>
    <p className="text-gray-600 mb-4">Be the first to share your experience!</p>
    <Button
      onClick={onOpenDrawer} // Use the prop here
      className="bg-gray-700 text-white hover:bg-gray-600 active:scale-95 transition-all duration-150"
    >
      Share Your Experience
    </Button>
  </motion.div>
);

export default EmptyState;
