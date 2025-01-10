import { reasonsToChooseUs } from "@/constants/ReasonsToChooseUs";
import WhyChooseUsCard from "./WhyChooseUsCard";

// Why Choose Us Component (unchanged)
const WhyChooseUs = () => (
  <section className="why-choose-us py-20 bg-gradient-to-b from-gray-900 via-gray-900 to-black mx-auto">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center text-white">
        Why Choose Us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reasonsToChooseUs.map((reason) => (
          <WhyChooseUsCard key={reason.title} reason={reason} />
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
