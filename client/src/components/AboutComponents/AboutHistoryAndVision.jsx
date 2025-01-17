import { Award } from "lucide-react";
import { motion } from "framer-motion";
import { milestones } from "@/constants/AboutMileStrones";
import HistoryAndVisionCard from "./HistoryAndVisionCard";

const HistoryAndVision = () => {
  const backgroundShapes = Array(5)
    .fill(null)
    .map((_, i) => ({
      width: Math.random() * 300 + 100,
      height: Math.random() * 300 + 100,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 10 + 10,
    }));

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with gradient and texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black" />
      <div
        className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-5"
        style={{ backgroundSize: "cover", backgroundPosition: "center" }}
      />

      {/* Animated background shapes */}
      {backgroundShapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-500/10 rounded-full"
          style={{
            width: shape.width,
            height: shape.height,
            top: shape.top,
            left: shape.left,
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white"
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
            {milestones.map((milestone, index) => {
              const IconComponent = milestone.icon; // Create a variable to hold the component
              return (
                <HistoryAndVisionCard
                  key={index}
                  milestone={milestone}
                  index={index}
                  IconComponent={IconComponent}
                />
              );
            })}
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
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-blue-400 to-transparent" />
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

export default HistoryAndVision;
