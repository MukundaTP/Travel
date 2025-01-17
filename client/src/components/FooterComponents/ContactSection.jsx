import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ContactInfo from "./ContactInfo";

const ContactSection = () => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-start">Contact Us</h3>
    <ul className="space-y-4 text-gray-400">
      <ContactInfo
        Icon={Phone}
        text="+91 9916593999"
        href="tel:+919916593999"
      />
      <ContactInfo
        Icon={Phone}
        text="+91 8105889639"
        href="tel:+918105889639"
      />
      <ContactInfo
        Icon={Mail}
        text="mukundamysore85@gmail.com"
        href="mailto:mukundamysore85@gmail.com"
      />
      <ContactInfo
        Icon={MapPin}
        text="6/B 3rd main 7th cross Vinayakanagara(paduvarhalli) Near basaveshwara Choultry Mysore-570012"
      />
      <ContactInfo Icon={Clock} text="24/7 Available" />
    </ul>
  </div>
);

export default ContactSection;
