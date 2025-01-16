import { useEffect, useState } from "react";

import TabSection from "@/components/TabSection";

import CallToAction from "@/components/CallToAction";
import {
  addOnServices,
  specialPackages,
  vehicleExamples,
} from "@/constants/ServicesData";
import ServicesHero from "@/components/ServicesComponents/ServicesHero";
import MetaData from "@/components/layouts/MetaData";
import BusinessServices from "@/components/ServicesComponents/BusinessServices";

const Services = () => {
  // Scroll to top when the component is mounted (when the page loads)
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const [activeTab, setActiveTab] = useState("vehicles");

  return (
    <>
      <MetaData title={"Services"} />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <ServicesHero />
        <TabSection
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          vehicleExamples={vehicleExamples}
          specialPackages={specialPackages}
          addOnServices={addOnServices}
        />
        <BusinessServices />
        <CallToAction />
      </div>
    </>
  );
};

export default Services;
