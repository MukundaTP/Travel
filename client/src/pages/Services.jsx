import React, { useState } from "react";
import {
  Car as Motion,
  Calendar,
  MapPin,
  Coffee,
  Gift,
  Music,
  Camera,
  Wifi,
  Users,
  Navigation,
  Bluetooth,
  Airplay,
  Battery,
  Monitor,
  Radio,
  Bed,
  Video,
  ChefHat,
  BookOpen,
  Star,
  Shield,
  Clock,
  Heart,
  ThumbsUp,
  Map,
  Utensils,
  Hotel,
  PartyPopper,
  Gamepad2 as Gaming,
  Music2 as MusicNote,
  Compass,
} from "lucide-react";
import { Link } from "react-router-dom";
import TabSection from "@/components/TabSection";
import CallToAction from "@/components/CallToAction";

const Services = () => {
  const [activeTab, setActiveTab] = useState("vehicles");

  const vehicleExamples = {
    "4-Wheelers": {
      icon: <Motion className="w-12 h-12 mb-4 text-gray-700" />,
      description: "Perfect for intimate gatherings and business meetings",
      examples: [
        "Executive business travel",
        "Airport transfers with VIP service",
        "Romantic couple getaways",
        "Family road trips with comfort",
        "City tours with personal guide",
      ],
      features: [
        "GPS Navigation",
        "Leather Seats",
        "Climate Control",
        "Entertainment System",
      ],
    },
    "6-Wheelers": {
      icon: <Users className="w-12 h-12 mb-4 text-gray-700" />,
      description: "Ideal for medium-sized groups seeking comfort and style",
      examples: [
        "Corporate team outings",
        "Wine tasting tours",
        "Bachelor/Bachelorette parties",
        "Family reunions",
        "Adventure group trips",
      ],
      features: [
        "Premium Sound System",
        "Extended Luggage Space",
        "USB Charging Ports",
        "Panoramic Windows",
      ],
    },
    "8-Wheelers": {
      icon: <Users className="w-12 h-12 mb-4 text-gray-700" />,
      description: "Perfect for large groups and special occasions",
      examples: [
        "Destination weddings",
        "Corporate retreats",
        "Sports team transportation",
        "Concert group travel",
        "Multi-family vacation trips",
      ],
      features: [
        "Onboard Restroom",
        "Mini Kitchen",
        "Entertainment System",
        "Large Storage Space",
      ],
    },
    "10-Wheelers": {
      icon: <Users className="w-12 h-12 mb-4 text-gray-700" />,
      description: "Designed for large-scale events and group tours",
      examples: [
        "School excursions",
        "Corporate conferences",
        "Tourist groups",
        "Festival transportation",
        "Multi-day tour groups",
      ],
      features: [
        "Multiple LCD Screens",
        "Professional Sound System",
        "Sleeping Bunks",
        "Conference Setup",
      ],
    },
  };

  const specialPackages = [
    {
      title: "Executive Business Travel",
      icon: <Wifi className="w-12 h-12 mb-4 text-gray-700" />,
      description: "Premium travel solutions for business professionals.",
      features: [
        "Private chauffeur service",
        "Mobile office setup",
        "Priority booking",
        "24/7 concierge service",
        "Corporate billing options",
      ],
      price: "Starting from $299/day",
    },
    {
      title: "Family Adventure Package",
      icon: <Gift className="w-12 h-12 mb-4 text-gray-700" />,
      description: "Create lasting memories with your loved ones.",
      features: [
        "Child-friendly amenities",
        "Entertainment packages",
        "Flexible scheduling",
        "Family meal options",
        "Educational stop-overs",
      ],
      price: "Starting from $199/day",
    },
    {
      title: "Luxury Weekend Getaway",
      icon: <Coffee className="w-12 h-12 mb-4 text-gray-700" />,
      description: "Escape in style with our premium weekend packages.",
      features: [
        "Luxury vehicle options",
        "Champagne service",
        "Gourmet catering",
        "Scenic route planning",
        "Hotel booking assistance",
      ],
      price: "Starting from $399/day",
    },
    {
      title: "Special Events Package",
      icon: <Calendar className="w-12 h-12 mb-4 text-gray-700" />,
      description: "Make your special day truly memorable.",
      features: [
        "Event coordination",
        "Decorated vehicles",
        "Photography service",
        "Custom routes",
        "Group coordination",
      ],
      price: "Starting from $499/day",
    },
  ];

  const addOnServices = [
    {
      title: "Professional Photography",
      icon: <Camera className="w-12 h-12 mb-4 text-gray-700" />,
      description: "Capture every moment of your journey.",
      benefits: [
        "Professional photographer",
        "Digital and printed albums",
        "Drone photography",
        "Same-day editing",
        "Social media ready shots",
      ],
    },
    {
      title: "Entertainment Package",
      icon: <Music className="w-12 h-12 mb-4 text-gray-700" />,
      description: "Keep the party going with premium entertainment.",
      benefits: [
        "Karaoke system",
        "Gaming consoles",
        "Premium sound system",
        "Streaming services",
        "Party lighting",
      ],
    },
    {
      title: "Guided Tours",
      icon: <MapPin className="w-12 h-12 mb-4 text-gray-700" />,
      description: "Explore with knowledgeable local experts.",
      benefits: [
        "Certified local guides",
        "Customized itineraries",
        "Historical insights",
        "Hidden gem locations",
        "Interactive experiences",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black pt-[150px] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-4">
            Premium Transport Services
          </h1>
          <p className="text-xl text-center text-blue-100">
            Experience luxury and comfort in every journey
          </p>
        </div>
      </div>

      <TabSection
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        vehicleExamples={vehicleExamples}
        specialPackages={specialPackages}
        addOnServices={addOnServices}
      />
      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center space-x-4 mb-12">
          {["vehicles", "packages", "addons"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? "bg-gray-700 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-blue-50"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Vehicle Categories */}
        {activeTab === "vehicles" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(vehicleExamples).map(([vehicle, data], index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    {data.icon}
                    <span className="text-3xl font-bold text-gray-700">
                      {vehicle}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">{data.description}</p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Perfect For:
                      </h4>
                      <ul className="space-y-2">
                        {data.examples.map((example, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-gray-600"
                          >
                            <span className="w-2 h-2 bg-gray-700 rounded-full mr-2"></span>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Features:
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {data.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-50 text-gray-700 px-3 py-1 rounded-full text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Special Packages */}
        {activeTab === "packages" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {specialPackages.map((pkg, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    {pkg.icon}
                    <span className="text-2xl font-bold text-gray-700">
                      {pkg.title}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">{pkg.description}</p>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Includes:</h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-gray-600"
                        >
                          <span className="w-2 h-2 bg-gray-700 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <span className="text-xl font-semibold text-gray-700">
                      {pkg.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add-on Services */}
        {activeTab === "addons" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {addOnServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105"
              >
                <div className="p-8">
                  <div className="flex flex-col items-center mb-6">
                    {service.icon}
                    <h3 className="text-2xl font-bold text-gray-700 text-center">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-center mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800 text-center">
                      Includes:
                    </h4>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-gray-600"
                        >
                          <span className="w-2 h-2 bg-gray-700 rounded-full mr-2"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <CallToAction />
    </div>
  );
};

export default Services;
