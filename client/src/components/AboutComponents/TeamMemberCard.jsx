import { motion } from "framer-motion";
import { Linkedin, Mail, Twitter } from "lucide-react";

const TeamMemberCard = ({ member, index, isHovering, setIsHovering }) => (
  <div
    className="w-full md:w-1/3 flex-shrink-0 "
    onMouseEnter={() => setIsHovering(index)}
    onMouseLeave={() => setIsHovering(null)}
  >
    <motion.div
      whileHover={{ y: -10 }}
      className="team-member text-center group"
    >
      <div className="relative mb-8 transform transition duration-500 ease-in-out group-hover:scale-105">
        <div className="w-64 h-64 mx-auto relative">
          <img
            src="/api/placeholder/400/400"
            alt={member.name}
            className="w-full h-full object-cover rounded-2xl shadow-xl"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent rounded-2xl transition-opacity duration-300 ${
              isHovering === index ? "opacity-80" : "opacity-0"
            }`}
          />
          <div
            className={`absolute bottom-0 left-0 right-0 p-6 flex justify-center space-x-4 transition-all duration-300 ${
              isHovering === index
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <SocialButton Icon={Linkedin} />
            <SocialButton Icon={Twitter} />
            <SocialButton Icon={Mail} />
          </div>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{member.name}</h3>
      <p className="text-lg text-gray-600 mb-4">{member.role}</p>
      <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
        {member.description}
      </p>
    </motion.div>
  </div>
);

export default TeamMemberCard;

const SocialButton = ({ Icon }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
  >
    <Icon className="w-5 h-5 text-gray-700" />
  </motion.button>
);
