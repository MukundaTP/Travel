import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QuoteIcon } from "lucide-react";

const TestimonialsSlider = () => {
  const testimonials = [
    {
      name: "John Doe",
      role: "Business Traveler",
      avatar: "data:image/jpeg;base64,...", // Your base64 image
      fallback: "JD",
      quote:
        "We had the best family trip, all thanks to their spacious 10-wheeler bus!",
      rating: 5,
    },
    {
      name: "Jane Smith",
      role: "Corporate Event Manager",
      avatar: "data:image/jpeg;base64,...", // Your base64 image
      fallback: "JS",
      quote: "Their 4-wheeler service made our corporate event seamless.",
      rating: 5,
    },
    {
      name: "Robert Brown",
      role: "Adventure Enthusiast",
      avatar: "data:image/jpeg;base64,...", // Your base64 image
      fallback: "RB",
      quote:
        "Absolutely loved the experience! Highly recommend their services.",
      rating: 5,
    },
    {
      name: "Emily Davis",
      role: "Travel Blogger",
      avatar: "data:image/jpeg;base64,...", // Your base64 image
      fallback: "ED",
      quote: "The drivers were so friendly and professional. Fantastic trip!",
      rating: 5,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    customPaging: (i) => (
      <div className="w-3 h-3 mx-1 rounded-full bg-gray-400 hover:bg-white transition-all duration-300" />
    ),
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`text-2xl ${
              index < rating ? "text-yellow-400" : "text-gray-400"
            }`}
          >
            ★
          </motion.span>
        ))}
      </div>
    );
  };

  return (
    <motion.section
      className="relative py-24 inset-0 bg-gradient-to-b from-gray-900  to-gray-700 text-white overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background Elements */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            What Our Customers Say
          </h2>
          <p className="text-gray-100 text-lg max-w-2xl mx-auto">
            Discover why thousands of customers trust us for their
            transportation needs
          </p>
        </motion.div>

        <motion.div variants={cardVariants} className="max-w-4xl mx-auto">
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-4 pb-12">
                <Card className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 p-8 rounded-xl shadow-xl">
                  <CardHeader className="flex flex-col items-center text-center space-y-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="relative"
                    >
                      <Avatar className="w-20 h-20 border-4 border-white/10">
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                        <AvatarFallback className="text-2xl">
                          {testimonial.fallback}
                        </AvatarFallback>
                      </Avatar>
                      <motion.div
                        className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <QuoteIcon className="w-4 h-4 text-white" />
                      </motion.div>
                    </motion.div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-400">{testimonial.role}</p>
                    </div>
                    <StarRating rating={testimonial.rating} />
                  </CardHeader>
                  <CardContent>
                    <motion.p
                      className="text-lg text-gray-300 text-center italic relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      "{testimonial.quote}"
                    </motion.p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Slider>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </motion.section>
  );
};

export default TestimonialsSlider;
