// src/components/Footer/components/CompanyInfo.jsx

import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import SocialLink from "./SocialLink";

const CompanyInfo = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">TravelAgency</h2>
    <p className="text-gray-400 leading-relaxed">
      Providing premium transportation services with comfort, safety, and style
      since 2012.
    </p>
    <div className="flex space-x-4">
      <SocialLink Icon={Facebook} href="#" />
      <SocialLink Icon={Twitter} href="#" />
      <SocialLink Icon={Instagram} href="#" />
      <SocialLink Icon={Linkedin} href="#" />
    </div>
  </div>
);

export default CompanyInfo;
