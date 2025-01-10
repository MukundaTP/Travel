import { motion } from "framer-motion";
import { useState } from "react";
import TeamMemberCard from "./TeamMemberCard";
import { teamMembers } from "@/constants/TeamMembers";

const MeetTheTeam = () => {
  const [isHovering, setIsHovering] = useState(null);

  const extendedTeamMembers = [...teamMembers, ...teamMembers, ...teamMembers];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-gray-100 opacity-20"></div>

      <div className="max-w-6xl mx-auto  relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          <p className="text-gray-600 text-xl mx-auto">
            Meet the passionate professionals behind our success, dedicated to
            delivering excellence in every journey.
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <div
            className="flex animate-marquee transition-transform duration-[4000ms] ease-in-out"
            style={{ width: `${teamMembers.length * 33.33}%` }}
          >
            {extendedTeamMembers.map((member, index) => (
              <TeamMemberCard
                key={`${member.name}-${index}`}
                member={member}
                index={index}
                isHovering={isHovering}
                setIsHovering={setIsHovering}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee linear infinite;
          animation-duration: 20s;
        }
      `}</style>
    </section>
  );
};

export default MeetTheTeam;
