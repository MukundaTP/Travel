import { reasonsToChooseUs } from "@/constants/ReasonsToChooseUs";

// Why Choose Us Component (unchanged)
const WhyChooseUs = () => (
  <section className="why-choose-us py-20 bg-gradient-to-b from-gray-900 via-gray-900 to-black mx-auto">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center text-white">
        Why Choose Us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reasonsToChooseUs.map((reason) => (
          <div
            key={reason.title}
            className="reason p-8 rounded-lg bg-gray-800 transform transition-transform duration-300 hover:scale-105"
          >
            <h3 className="text-2xl font-bold mb-4 text-white">
              {reason.title}
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              {reason.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
