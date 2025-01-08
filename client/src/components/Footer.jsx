import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
} from "lucide-react";
import NewsletterSection from "./NewsLetter";

const Footer = () => {
  const quickLinks = [
    { label: "About Us", path: "/about" },
    { label: "Our Services", path: "/services" },
    { label: "Vehicle Fleet", path: "/fleet" },
    { label: "Booking", path: "/booking" },
    { label: "Contact", path: "/contact" },
  ];

  const services = [
    { label: "Airport Transfers", path: "/services/airport" },
    { label: "Corporate Travel", path: "/services/corporate" },
    { label: "Wedding Transport", path: "/services/wedding" },
    { label: "City Tours", path: "/services/tours" },
    { label: "Group Travel", path: "/services/group" },
  ];

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Newsletter Section */}

        <NewsletterSection />

        {/* Main Footer Grid */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold ">TravelAgency</h2>
              <p className="text-gray-400 leading-relaxed">
                Providing premium transportation services with comfort, safety,
                and style since 2010.
              </p>
              <div className="flex space-x-4">
                <SocialLink Icon={Facebook} href="#" />
                <SocialLink Icon={Twitter} href="#" />
                <SocialLink Icon={Instagram} href="#" />
                <SocialLink Icon={Linkedin} href="#" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-start">
                Quick Links
              </h3>
              <ul className="space-y-4">
                {quickLinks.map((link, index) => (
                  <FooterLink key={index} {...link} />
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-start">
                Our Services
              </h3>
              <ul className="space-y-4">
                {services.map((service, index) => (
                  <FooterLink key={index} {...service} />
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-start">Contact Us</h3>
              <ul className="space-y-4 text-gray-400">
                <ContactInfo
                  Icon={Phone}
                  text="+91 9998887779"
                  href="tel:+15551234567"
                />
                <ContactInfo
                  Icon={Mail}
                  text="rohithmanjunath@hotmail.com"
                  href="mailto:rohithmanjunath@hotmail.com"
                />
                <ContactInfo
                  Icon={MapPin}
                  text="123 Transport Street, City, Country"
                />
                <ContactInfo Icon={Clock} text="24/7 Available" />
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} TravelAgency. All rights reserved.
              </p>
              <div className="flex items-center gap-6 mt-4 md:mt-0">
                <Link
                  to="/privacy"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ Icon, href }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors"
  >
    <Icon className="w-5 h-5" />
  </motion.a>
);

const FooterLink = ({ label, path }) => (
  <li>
    <Link
      to={path}
      className="text-gray-400 hover:text-white transition-colors flex items-center group"
    >
      <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
      {label}
    </Link>
  </li>
);

const ContactInfo = ({ Icon, text, href }) => (
  <li>
    {href ? (
      <a
        href={href}
        className="flex items-center gap-3 hover:text-white transition-colors"
      >
        <Icon className="w-5 h-5 text-white" />
        {text}
      </a>
    ) : (
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-white" />
        {text}
      </div>
    )}
  </li>
);

export default Footer;
