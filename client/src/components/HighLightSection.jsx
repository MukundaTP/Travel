import React from "react";
import { Car, Wallet, UserCircle, ArrowRight } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="group relative bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

      {/* Content */}
      <div className="relative z-10">
        <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-gray-700">
            <Icon size={28} className="group-hover:animate-pulse" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-700 mb-4 group-hover:text-gray-600 transition-colors duration-300">
          {title}
        </h3>

        <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

        <div className="flex items-center justify-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-sm font-semibold mr-2">Learn More</span>
          <ArrowRight size={16} className="animate-bounce-x" />
        </div>
      </div>
    </div>
  );
};

const HighlightSection = () => {
  const features = [
    {
      title: "Luxurious Comfort",
      description:
        "Experience premium comfort in our meticulously maintained fleet of vehicles, perfect for any occasion from business trips to family adventures.",
      icon: Car,
    },
    {
      title: "Smart Pricing",
      description:
        "Enjoy transparent, competitive rates with our flexible packages designed to provide maximum value without compromising on quality.",
      icon: Wallet,
    },
    {
      title: "Professional Drivers",
      description:
        "Travel with confidence alongside our certified, professional drivers who prioritize your safety and comfort throughout the journey.",
      icon: UserCircle,
    },
  ];

  return (
    <section className="py-20 bg-[#edf6f9]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-700 mb-4">
            Why Choose Our Service?
          </h2>
          <p className="text-gray-600 text-lg">
            Discover the perfect blend of comfort, affordability, and
            professional service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightSection;
