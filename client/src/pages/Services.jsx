import React, { useEffect, useState } from "react";
import {
  Calendar,
  MapPin,
  Coffee,
  Gift,
  Music,
  Camera,
  Wifi,
  Car as CarIcon, // For 4-wheelers
  Bus, // For 10-wheelers
  Truck, // For 8-wheelers
  CarTaxiFront as Taxi,
} from "lucide-react";
import TabSection from "@/components/TabSection";

import CallToAction from "@/components/CallToAction";

const Services = () => {
  // Scroll to top when the component is mounted (when the page loads)
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const [activeTab, setActiveTab] = useState("vehicles");
  const vehicleExamples = {
    "4-Wheelers": {
      icon: <CarIcon className="w-12 h-12 mb-4 text-gray-700" />,
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
        "Premium Sound System",
        "Extended Luggage Space",
        "USB Charging Ports",
        "Panoramic Windows",
        "LCD Screens",
      ],
    },
    "6-Wheelers": {
      icon: <Taxi className="w-12 h-12 mb-4 text-gray-700" />,
      description: "Ideal for medium-sized groups seeking comfort and style",
      examples: [
        "Corporate team outings",
        "Wine tasting tours",
        "Bachelor/Bachelorette parties",
        "Family reunions",
        "Adventure group trips",
      ],
      features: [
        "GPS Navigation",
        "Leather Seats",
        "Climate Control",
        "Entertainment System",
        "Premium Sound System",
        "Extended Luggage Space",
        "USB Charging Ports",
        "Panoramic Windows",
        "LCD Screens",
      ],
    },
    "8-Wheelers": {
      icon: <Truck className="w-12 h-12 mb-4 text-gray-700" />,
      description: "Perfect for large groups and special occasions",
      examples: [
        "Destination weddings",
        "Corporate retreats",
        "Sports team transportation",
        "Concert group travel",
        "Multi-family vacation trips",
      ],
      features: [
        "GPS Navigation",
        "Leather Seats",
        "Climate Control",
        "Entertainment System",
        "Premium Sound System",
        "Extended Luggage Space",
        "USB Charging Ports",
        "Panoramic Windows",
        "LCD Screens",
      ],
    },
    "10-Wheelers": {
      icon: <Bus className="w-12 h-12 mb-4 text-gray-700" />,
      description: "Designed for large-scale events and group tours",
      examples: [
        "School excursions",
        "Corporate conferences",
        "Tourist groups",
        "Festival transportation",
        "Multi-day tour groups",
      ],
      features: [
        "GPS Navigation",
        "Leather Seats",
        "Climate Control",
        "Entertainment System",
        "Premium Sound System",
        "Extended Luggage Space",
        "USB Charging Ports",
        "Panoramic Windows",
        "LCD Screens",
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
      <div className="inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black pt-[150px] text-white py-16">
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

      {/* Call to Action */}
      <CallToAction />
    </div>
  );
};

export default Services;
