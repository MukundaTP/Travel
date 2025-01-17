import CompanyInfo from "./FooterComponents/CompanyInfo";
import ContactSection from "./FooterComponents/ContactSection";
import FooterBottom from "./FooterComponents/FooterBottom";
import QuickLinksSection from "./FooterComponents/QuickLinksSection";
import ServicesSection from "./FooterComponents/ServicesSection";
import NewsletterSection from "./NewsLetter";

const Footer = () => {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info - Full width on small screens */}
            <div className="sm:col-span-2 lg:col-span-1">
              <CompanyInfo />
            </div>

            {/* Quick Links */}
            <div className="flex flex-col">
              <QuickLinksSection />
            </div>

            {/* Services */}
            <div className="flex flex-col">
              <ServicesSection />
            </div>

            {/* Contact Section - Full width on small screens */}
            <div className="sm:col-span-2 lg:col-span-1">
              <ContactSection />
            </div>
          </div>
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;
