// src/components/Footer/components/ServicesSection.jsx

import { services } from "@/constants/FooterLinks";
import FooterServiceLink from "./FooterServiceLink";

const ServicesSection = () => (
  <div>
    <h3 className="text-lg font-semibold mb-6 text-start">Our Services</h3>
    <ul className="space-y-4">
      {services.map((service, index) => (
        <FooterServiceLink key={index} {...service} />
      ))}
    </ul>
  </div>
);

export default ServicesSection;
