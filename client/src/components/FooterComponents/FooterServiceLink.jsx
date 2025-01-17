// src/components/Footer/components/FooterServiceLink.jsx

import { ChevronRight } from "lucide-react";

const FooterServiceLink = ({ label, path }) => (
  <li>
    <span className="text-gray-400 hover:text-white transition-colors flex items-center group">
      <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
      {label}
    </span>
  </li>
);

export default FooterServiceLink;
