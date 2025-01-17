const ContactInfo = ({ Icon, text, href }) => (
  <li className="flex items-start gap-3">
    <div className="flex-shrink-0 mt-1">
      <Icon className="w-5 h-5 text-white" />
    </div>
    {href ? (
      <a href={href} className="hover:text-white transition-colors break-words">
        {text}
      </a>
    ) : (
      <div className="break-words">{text}</div>
    )}
  </li>
);

export default ContactInfo;
