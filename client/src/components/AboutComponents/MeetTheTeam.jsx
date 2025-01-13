import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Users } from "lucide-react";
import { useGetAllTeamMembersQuery } from "../../../Redux/adminAuth";
import TeamMemberCard from "./TeamMemberCard";
import AddTeamMemberModal from "../AdminDashboardComponents/AddTeamMemberModal";

const MeetTheTeam = () => {
  const [isHovering, setIsHovering] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const {
    data: teamMembers = [],
    isLoading,
    isError,
    error,
  } = useGetAllTeamMembersQuery(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    refetchOnReconnect: true,
  });

  const extendedTeamMembers =
    teamMembers.length > 0
      ? [...teamMembers, ...teamMembers, ...teamMembers]
      : [];

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-700 font-medium">Loading team members...</p>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-gray-700" />
          </div>
          <p className="text-gray-700 font-medium">
            {error?.data?.message || "Failed to load team members"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (teamMembers.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-gray-700" />
          </div>
          <p className="text-gray-700 font-medium">No team members yet</p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add First Team Member</span>
          </button>
        </div>
      );
    }

    return (
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10" />

        {/* Marquee Container */}
        <div
          className={`flex ${
            teamMembers.length >= 4 && !isPaused ? "animate-marquee" : ""
          } transition-all duration-300`}
          style={{
            width: `${teamMembers.length * 33.33}%`,
          }}
        >
          {extendedTeamMembers.map((member, index) => (
            <TeamMemberCard
              key={`${member._id}-${index}`}
              member={member}
              index={index}
              isHovering={isHovering}
              setIsHovering={setIsHovering}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-gray-100 opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
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

          {!isLoading && teamMembers.length > 0 && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center justify-center space-x-2 bg-gray-700 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-gray-600 transition-all duration-200 group"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
              <span>Add Member</span>
            </button>
          )}
        </motion.div>

        {/* Main Content */}
        {renderContent()}
      </div>

      {/* CSS for Marquee Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          transition: transform 0.3s ease;
        }
      `}</style>

      {/* Add Team Member Modal */}
      <AddTeamMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </section>
  );
};

export default MeetTheTeam;
