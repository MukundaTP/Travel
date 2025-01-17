import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const TeamHeader = ({ isLoading, teamMembers, setIsAddModalOpen, user }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
    >
      <div className="flex-grow max-w-3xl mx-auto md:mx-0">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Meet Our Team
        </h2>
        <p className="text-gray-600 text-md sm:text-xl">
          Meet the passionate professionals behind our success, dedicated to
          delivering excellence in every journey.
        </p>
      </div>

      {user?.isAdmin && !isLoading && teamMembers.length > 0 && (
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center space-x-2 bg-gray-700 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-gray-600 transition-all duration-200 group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
          <span>Add Member</span>
        </button>
      )}
    </motion.div>
  );
};

export default TeamHeader;
