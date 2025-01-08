import React, { useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define the validation schema
const reviewSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be less than 50 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(500, { message: "Message must be less than 500 characters" }),
  rating: z
    .number()
    .min(1, { message: "Please select a rating" })
    .max(5, { message: "Rating must be between 1 and 5" }),
});

const TestimonialsSlider = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: "",
      message: "",
      rating: 0,
    },
  });

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => {
    setDrawerOpen(false);
    form.reset();
  };

  const testimonials = [
    {
      name: "John Doe",
      role: "Business Traveler",
      avatar: "/api/placeholder/150/150",
      fallback: "JD",
      quote:
        "We had the best family trip, all thanks to their spacious 10-wheeler bus!",
      rating: 5,
    },
    // ... other testimonials
  ];

  // Rest of the existing configuration objects...
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

  const StarRating = ({
    rating,
    interactive = false,
    onRatingChange = null,
  }) => {
    const [hoveredStar, setHoveredStar] = useState(0);

    return (
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`text-2xl ${
              index < (interactive ? hoveredStar || rating : rating)
                ? "text-yellow-400"
                : "text-gray-400"
            } ${interactive ? "cursor-pointer" : ""}`}
            onMouseEnter={() => interactive && setHoveredStar(index + 1)}
            onMouseLeave={() => interactive && setHoveredStar(0)}
            onClick={() => interactive && onRatingChange?.(index + 1)}
          >
            ★
          </motion.span>
        ))}
      </div>
    );
  };

  const onSubmit = (data) => {
    console.log("Submitted review:", data);
    handleDrawerClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted review:", formData);
    handleDrawerClose();
  };

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <motion.section
      className="relative py-24 inset-0 bg-gradient-to-b from-gray-900 to-gray-700 text-white overflow-hidden"
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
                        <Quote className="w-4 h-4 text-white" />
                      </motion.div>
                    </motion.div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white">
                        {testimonial.name}
                      </h3>
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

        {/* Review Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <Button
            onClick={handleDrawerOpen}
            className="bg-white text-gray-700 hover:bg-gray-100 font-semibold py-4 px-8 rounded-full shadow-lg transform transition hover:scale-105"
          >
            Share Your Experience
          </Button>
        </motion.div>
      </div>

      {/* Review Form Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DrawerHeader>
                <DrawerTitle>Share Your Experience</DrawerTitle>
                <DrawerDescription>
                  Please tell us about your experience with our service.
                </DrawerDescription>
              </DrawerHeader>

              <div className="px-4 py-2 space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your experience"
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <div className="flex justify-center">
                          <StarRating
                            rating={field.value}
                            interactive={true}
                            onRatingChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DrawerFooter>
                <Button type="submit">Submit Review</Button>
                <DrawerClose asChild>
                  <Button variant="outline" onClick={handleDrawerClose}>
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </DrawerContent>
      </Drawer>
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
