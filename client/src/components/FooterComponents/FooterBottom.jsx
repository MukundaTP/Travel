// src/components/Footer/components/FooterBottom.jsx

import { Link } from "react-router-dom";

const FooterBottom = () => (
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
);

export default FooterBottom;
