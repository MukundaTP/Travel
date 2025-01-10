const WhyChooseUsCard = ({ reason }) => {
  return (
    <div className="reason p-8 rounded-lg bg-gray-800 transform transition-transform duration-300 hover:scale-105">
      <h3 className="text-2xl font-bold mb-4 text-white">{reason.title}</h3>
      <p className="text-gray-300 text-lg leading-relaxed">
        {reason.description}
      </p>
    </div>
  );
};

export default WhyChooseUsCard;
