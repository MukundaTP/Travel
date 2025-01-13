import React, { useState } from "react";
import { motion } from "framer-motion";
import { Edit2, Trash2 } from "lucide-react";
import DeleteTeamMemberModal from "../AdminDashboardComponents/DeleteTeamMemberModal";
import EditTeamMemberModal from "../AdminDashboardComponents/EditTeamMember";
import { useSelector } from "react-redux";

const AdminButton = ({ Icon, onClick, label, variant }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    className={`p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-200 hover:bg-white ${
      variant === "delete"
        ? "hover:text-red-600 hover:bg-red-50"
        : "hover:text-blue-600 hover:bg-blue-50"
    }`}
    aria-label={label}
  >
    <Icon className="w-4 h-4 text-gray-700" />
  </motion.button>
);

const TeamMemberCard = ({ member, index, isHovering, setIsHovering }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { user } = useSelector((state) => state?.user);
  return (
    <>
      <div
        className="w-full md:w-1/3 flex-shrink-0 px-6 hover:cursor-pointer"
        onMouseEnter={() => setIsHovering(index)}
        onMouseLeave={() => setIsHovering(null)}
      >
        <motion.div
          whileHover={{ y: -10 }}
          className="text-center group relative"
        >
          {/* Image Container */}
          <div className="relative mb-8 transform transition duration-500 ease-in-out group-hover:scale-105 hover:cursor-pointer">
            <div className="w-64 h-64 mx-auto relative hover:cursor-pointer">
              {/* Admin Controls - Positioned at top right corner */}
              {user?.isAdmin && (
                <div
                  className={`absolute top-8 right-2 z-20 flex items-center gap-2 transition-all duration-300 ${
                    isHovering === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2"
                  }`}
                >
                  <AdminButton
                    Icon={Edit2}
                    onClick={() => setIsEditModalOpen(true)}
                    label="Edit team member"
                    variant="edit"
                  />
                  <AdminButton
                    Icon={Trash2}
                    onClick={() => setIsDeleteModalOpen(true)}
                    label="Delete team member"
                    variant="delete"
                  />
                </div>
              )}
              <img
                src={member.image?.url || "/api/placeholder/400/400"}
                alt={member.name}
                className="w-full h-full object-cover rounded-2xl shadow-xl"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent rounded-2xl transition-opacity duration-300 ${
                  isHovering === index ? "opacity-60" : "opacity-0"
                }`}
              />
            </div>
          </div>

          {/* Content */}
          <div className="relative">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {member.name}
            </h3>
            <p className="text-lg text-gray-600 mb-4">{member.designation}</p>
            {member.description && (
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
                {member.description}
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <EditTeamMemberModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        teamMember={member}
      />
      <DeleteTeamMemberModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        teamMember={member}
      />
    </>
  );
};

export default TeamMemberCard;
