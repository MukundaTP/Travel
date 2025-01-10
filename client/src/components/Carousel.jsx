import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CarouselComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const carouselData = [
    {
      image:
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhdmVsfGVufDB8fDB8fHww",
      heading: "Explore the World with Us!",
      text: "Book luxurious and comfortable 4-wheelers to 10-wheelers for your dream vacation destinations.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhdmVsfGVufDB8fDB8fHww",
      heading: "Your Journey, Our Priority",
      text: "Choose from our wide range of vehicles for a smooth and scenic road trip experience.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhdmVsfGVufDB8fDB8fHww",
      heading: "Tailored Travel Experiences",
      text: "From personal to group travel, we provide you with the perfect vehicle for every occasion.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhdmVsfGVufDB8fDB8fHww",
      heading: "Perfect for Every Adventure",
      text: "Whether it’s a solo retreat or a family vacation, we have the ideal vehicle for you.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhdmVsfGVufDB8fDB8fHww",
      heading: "Your Perfect Road Companion",
      text: "Enjoy a hassle-free travel experience with our reliable and well-maintained vehicles.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhdmVsfGVufDB8fDB8fHww",
      heading: "Explore Beautiful Destinations",
      text: "Travel in style to some of the most scenic destinations around the world.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhdmVsfGVufDB8fDB8fHww",
      heading: "Adventure Awaits",
      text: "Start your road trip adventure now with our premium fleet of vehicles available for any trip.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhdmVsfGVufDB8fDB8fHww",
      heading: "Seamless Booking, Every Time",
      text: "Book your trip today with ease and enjoy our prompt service and customer support.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection("right");
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [carouselData.length]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction === "right" ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction === "right" ? -1000 : 1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      if (newDirection === "right") {
        return prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1;
      }
      return prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1;
    });
  };

  return (
    <motion.div
      className="relative h-screen overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate("right");
            } else if (swipe > swipeConfidenceThreshold) {
              paginate("left");
            }
          }}
          className="absolute w-full h-full"
        >
          {/* Background Image with Gradient Overlay */}
          <div className="relative w-full h-full">
            <img
              src={carouselData[currentIndex].image}
              alt={`Slide ${currentIndex + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-white px-4"
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-4xl md:text-6xl font-bold text-center mb-6"
            >
              {carouselData[currentIndex].heading}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-lg md:text-xl text-center max-w-2xl"
            >
              {carouselData[currentIndex].text}
            </motion.p>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate("left")}
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate("right")}
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </motion.button>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="flex justify-center gap-2">
          {carouselData.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? "right" : "left");
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CarouselComponent;
