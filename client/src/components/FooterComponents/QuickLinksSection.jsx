// src/components/Footer/components/QuickLinksSection.jsx

import { quickLinks } from "@/constants/FooterLinks";
import FooterLink from "./FooterLink";

const QuickLinksSection = () => (
  <div>
    <h3 className="text-lg font-semibold mb-6 text-start">Quick Links</h3>
    <ul className="space-y-4">
      {quickLinks.map((link, index) => (
        <FooterLink key={index} {...link} />
      ))}
    </ul>
  </div>
);

export default QuickLinksSection;
