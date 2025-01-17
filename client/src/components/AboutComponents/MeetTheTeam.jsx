import { useState } from "react";
import { useGetAllTeamMembersQuery } from "../../../Redux/adminAuth";
import TeamMemberCard from "./TeamMemberCard";
import AddTeamMemberModal from "../AdminDashboardComponents/AddTeamMemberModal";
import { useSelector } from "react-redux";
import LoadingTeamMembers from "./LoadingTeamMembers";
import TeamMembersError from "./TeamMembersError";
import EmptyTeamMembersState from "./EmptyTeamMembersState";
import TeamHeader from "./TeamHeader";

const MeetTheTeam = () => {
  const [isHovering, setIsHovering] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { user } = useSelector((state) => state?.user);

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

  const renderContent = () => {
    if (isLoading) {
      return <LoadingTeamMembers />;
    }

    if (isError) {
      return <TeamMembersError error={error} />;
    }

    if (teamMembers.length === 0) {
      return (
        <EmptyTeamMembersState
          user={user}
          setIsAddModalOpen={setIsAddModalOpen}
        />
      );
    }

    // Determine the rendering approach based on number of team members
    if (teamMembers.length <= 3) {
      return (
        <div className="flex justify-center space-x-6">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={member._id}
              member={member}
              index={index}
              isHovering={isHovering}
              setIsHovering={setIsHovering}
              className="w-1/3"
            />
          ))}
        </div>
      );
    }

    // For more than 3 members, use the marquee effect
    const extendedTeamMembers = [
      ...teamMembers,
      ...teamMembers,
      ...teamMembers,
    ];

    return (
      <div className="relative overflow-hidden">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10" />

        {/* Marquee Container */}
        <div
          className="flex animate-marquee"
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
        <TeamHeader
          isLoading={isLoading}
          setIsAddModalOpen={setIsAddModalOpen}
          teamMembers={teamMembers}
          user={user}
        />

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
