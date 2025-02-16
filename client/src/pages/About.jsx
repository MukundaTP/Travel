import MeetTheTeam from "@/components/AboutComponents/MeetTheTeam";
import WhyChooseUs from "@/components/AboutComponents/WhyChooseUs";
import AboutTheAgency from "@/components/AboutComponents/AboutTheAgency";
import HistoryAndVision from "@/components/AboutComponents/AboutHistoryAndVision";
import { useEffect } from "react";
import MetaData from "@/components/layouts/MetaData";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <MetaData title={"About Us"} />
      <div className="about-page bg-gradient-to-b from-white to-gray-50">
        <AboutTheAgency />
        <HistoryAndVision />
        <MeetTheTeam />
        <WhyChooseUs />
      </div>
    </>
  );
};

export default AboutPage;
