import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Building,
  Shield,
  Clock,
  Trophy,
  Award,
  History,
  Rocket,
  Target,
  TrendingUp,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page bg-gradient-to-b from-white to-gray-50">
      <AboutTheAgency />
      <HistoryAndVision />
      <MeetTheTeam />
      <WhyChooseUs />
    </div>
  );
};

const AboutTheAgency = () => {
  const highlights = [
    {
      title: "Our Legacy",
      icon: <Building className="w-8 h-8 text-gray-700" />,
      content:
        "Founded in 2010, our agency has grown from a small local operator to a regional transport leader. We've served over 50,000 satisfied customers and maintain a fleet of 100+ vehicles ranging from luxury cars to comfortable buses.",
    },
    {
      title: "Our Promise",
      icon: <Shield className="w-8 h-8 text-gray-700" />,
      content:
        "We guarantee timely, safe, and comfortable transportation for all our clients. Our services are backed by comprehensive insurance coverage and 24/7 roadside assistance to ensure peace of mind throughout your journey.",
    },
    {
      title: "Available Services",
      icon: <Clock className="w-8 h-8 text-gray-700" />,
      list: [
        "Airport Transfers",
        "Corporate Transportation",
        "Wedding & Event Transport",
        "Long-Distance Travel",
        "Group Tours & Excursions",
      ],
    },
    {
      title: "Achievements",
      icon: <Trophy className="w-8 h-8 text-gray-700" />,
      list: [
        "Best Transport Agency 2023",
        "5-Star Safety Rating",
        "Environmental Sustainability Award",
        "Customer Excellence Certificate",
        "Regional Service Provider of the Year",
      ],
    },
  ];

  const stats = [
    { value: "15K+", label: "Happy Clients" },
    { value: "150+", label: "Cities Covered" },
    { value: "500+", label: "Luxury Vehicles" },
    { value: "98%", label: "Satisfaction Rate" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="min-h-screen bg-white py-20">
      <motion.div
        className=" mx-auto "
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-16 relative py-20 bg-gray-900"
          variants={itemVariants}
        >
          {/* Background Elements */}
          <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black"></div>

          <div className="relative z-10 max-w-4xl mx-auto ">
            <motion.h2
              className="text-5xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              About Our Agency
            </motion.h2>

            <motion.p
              className="text-xl leading-relaxed text-gray-300 mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              With years of experience in the travel industry, we specialize in
              providing reliable and comfortable transport solutions for all
              your needs. Our commitment to professionalism and family values
              ensures every journey is a memorable one.
            </motion.p>
          </div>

          {/* Optional Decorative Elements */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Highlights */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mt-12 max-w-7xl mx-auto"
          variants={containerVariants}
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700/10"
            >
              <h3 className="text-2xl font-semibold mb-6 text-gray-700 flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="p-2 bg-gray-700/5 rounded-xl"
                >
                  {item.icon}
                </motion.div>
                {item.title}
              </h3>
              {item.content ? (
                <p className="text-gray-700 leading-relaxed">{item.content}</p>
              ) : (
                <ul className="text-gray-700 space-y-3">
                  {item.list.map((listItem, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-center gap-2 group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <span className="w-2 h-2 bg-gray-700 rounded-full group-hover:scale-125 transition-transform" />
                      {listItem}
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-7xl mx-auto"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-700/10"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="text-4xl font-bold text-gray-700"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-700 mt-2 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-gray-700/5 rounded-full"
              style={{
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const HistoryAndVision = () => {
  const milestones = [
    { year: "2010", title: "The Beginning", icon: History },
    { year: "2015", title: "Regional Expansion", icon: TrendingUp },
    { year: "2020", title: "Innovation Era", icon: Rocket },
    { year: "2024", title: "Future Vision", icon: Target },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with gradient and texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-5"></div>

      {/* Animated background shapes */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-500/10 rounded-full"
          style={{
            width: Math.random() * 300 + 100,
            height: Math.random() * 300 + 100,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto  relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-16"
        >
          {/* Header Section */}
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-6 text-white"
            >
              Our History & Vision
            </motion.h2>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="w-24 h-1 bg-white mx-auto rounded-full"
            />
          </div>

          {/* Timeline Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
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
                    <milestone.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div className="text-white font-bold mb-2">
                    {milestone.year}
                  </div>
                  <div className="text-white font-semibold">
                    {milestone.title}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Journey Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Our Journey
              </h3>
              <p className="text-xl leading-relaxed text-blue-100">
                Our journey began over a decade ago with a single vehicle and a
                vision to redefine travel experiences. Through dedication and
                customer focus, we've grown into a leading transport provider
                serving multiple cities and diverse client needs.
              </p>
            </motion.div>

            {/* Vision Quote */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-blue-400 to-transparent"></div>
              <div className="pl-8">
                <Award className="w-12 h-12 text-white mb-6" />
                <p className="text-2xl font-semibold italic text-blue-100 leading-relaxed">
                  "To become the premier travel solution provider, connecting
                  people and places with comfort, safety, and style."
                </p>
              </div>
            </motion.div>
          </div>

          {/* Future Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-xl text-blue-100 leading-relaxed">
              Today, we continue to innovate and expand, guided by our
              commitment to excellent service and sustainable practices. Our
              vision extends beyond transportation – we aim to create memorable
              journeys and lasting relationships with every client we serve.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const MeetTheTeam = () => {
  const [isHovering, setIsHovering] = useState(null);

  const teamMembers = [
    {
      name: "John Doe",
      role: "CEO & Founder",
      description:
        "With over 15 years of experience in transportation, John leads our team with vision and dedication.",
    },
    {
      name: "Jane Smith",
      role: "Operations Manager",
      description:
        "Jane ensures smooth operations and exceptional service delivery across all our transport solutions.",
    },
    {
      name: "Mike Johnson",
      role: "Head Driver",
      description:
        "Mike brings 20 years of professional driving experience and leads our expert team of drivers.",
    },
    {
      name: "Sarah Wilson",
      role: "Customer Relations",
      description:
        "Sarah's dedication to customer satisfaction has helped build lasting relationships with our clients.",
    },
    {
      name: "Robert Brown",
      role: "Fleet Manager",
      description:
        "Robert oversees our vehicle fleet, ensuring safety and reliability in every journey.",
    },
  ];

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

const SocialButton = ({ Icon }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
  >
    <Icon className="w-5 h-5 text-gray-700" />
  </motion.button>
);
// Why Choose Us Component (unchanged)
const WhyChooseUs = () => (
  <section className="why-choose-us py-20 bg-gradient-to-b from-gray-900 via-gray-900 to-black mx-auto">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center text-white">
        Why Choose Us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reasonsToChooseUs.map((reason) => (
          <div
            key={reason.title}
            className="reason p-8 rounded-lg bg-gray-800 transform transition-transform duration-300 hover:scale-105"
          >
            <h3 className="text-2xl font-bold mb-4 text-white">
              {reason.title}
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              {reason.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const reasonsToChooseUs = [
  {
    title: "Safety First",
    description:
      "We prioritize your safety by ensuring all vehicles are well-maintained and drivers are highly experienced.",
  },
  {
    title: "Tailored Travel Packages",
    description:
      "Customize your travel plans with our flexible packages suited for personal or group needs.",
  },
  {
    title: "24/7 Customer Support",
    description:
      "Our dedicated support team is always available to assist you at any time.",
  },
];

export default AboutPage;
