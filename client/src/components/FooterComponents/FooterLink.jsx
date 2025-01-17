// src/components/Footer/components/FooterLink.jsx

import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

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

export default FooterLink;
