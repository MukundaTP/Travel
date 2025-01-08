import React from "react";

const AboutPage = () => {
  return (
    <div className="about-page bg-gray-50 text-gray-800">
      <AboutTheAgency />
      <HistoryAndVision />
      <MeetTheTeam />
      <WhyChooseUs />
    </div>
  );
};

// About the Agency Component
const AboutTheAgency = () => (
  <section className="about-the-agency py-10 px-5 text-center bg-white shadow-md">
    <h2 className="text-2xl font-bold mb-4">About the Agency</h2>
    <p className="text-lg leading-relaxed">
      With years of experience in the travel industry, we specialize in
      providing reliable and comfortable transport solutions for all your travel
      needs. Our commitment to professionalism and family values ensures every
      journey is a pleasant one.
    </p>
  </section>
);

// History and Vision Component
const HistoryAndVision = () => (
  <section className="history-vision py-10 px-5 text-center bg-gray-100 shadow-md">
    <h2 className="text-2xl font-bold mb-4">History and Vision</h2>
    <p className="text-lg leading-relaxed mb-4">
      Started with a single 4-wheeler, now proudly offering vehicles up to
      10-wheelers. From humble beginnings, we’ve grown into a trusted travel
      partner for many.
    </p>
    <p className="text-xl font-semibold italic">
      "To become the go-to travel solution for individuals and groups across the
      region."
    </p>
  </section>
);

// Meet the Team Component
const MeetTheTeam = () => (
  <section className="meet-the-team py-10 px-5 bg-white shadow-md">
    <h2 className="text-2xl font-bold mb-4 text-center">Meet the Team</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {teamMembers.map((member) => (
        <div key={member.name} className="team-member text-center">
          <img
            src={member.photo}
            alt={member.name}
            className="w-32 h-32 mx-auto rounded-full mb-4"
          />
          <h3 className="text-xl font-semibold">{member.name}</h3>
          <p className="text-gray-600">{member.role}</p>
        </div>
      ))}
    </div>
  </section>
);

const teamMembers = [
  {
    name: "John Doe",
    role: "Owner",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Jane Smith",
    role: "Operations Manager",
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Mike Johnson",
    role: "Head Driver",
    photo: "https://via.placeholder.com/150",
  },
];

// Why Choose Us Component
const WhyChooseUs = () => (
  <section className="why-choose-us py-10 px-5 bg-gray-100 shadow-md">
    <h2 className="text-2xl font-bold mb-4 text-center">Why Choose Us</h2>
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {reasonsToChooseUs.map((reason) => (
        <li
          key={reason.title}
          className="reason text-center p-5 border rounded-md bg-white shadow-sm"
        >
          <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
          <p className="text-gray-600">{reason.description}</p>
        </li>
      ))}
    </ul>
  </section>
);

const reasonsToChooseUs = [
  {
    title: "Safety First",
    description:
      "We prioritize your safety by ensuring all vehicles are well-maintained and drivers are highly experienced.",
  },
  {
    title: "Tailored Travel Packages",
    description:
      "Customize your travel plans with our flexible packages suited for personal or group needs.",
  },
  {
    title: "24/7 Customer Support",
    description:
      "Our dedicated support team is always available to assist you at any time.",
  },
];

export default AboutPage;
