import {
  ArrowLeft as IconArrowLeft,
  ArrowRight as IconArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAlert } from "react-alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { usePostReviewMutation } from "../../../Redux/reviewsApi";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

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
  image: z
    .custom()
    .refine((file) => file instanceof File, "Please upload an image")
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Max file size is 5MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    ),
});

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = true,
  isDrawerOpen,
  setDrawerOpen,
}) => {
  const [active, setActive] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [createReview] = usePostReviewMutation();
  const alert = useAlert();

  const form = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: "",
      message: "",
      rating: 0,
      image: undefined,
    },
  });

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => index === active;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    form.reset();
    setPreviewUrl(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const onSubmit = async (data) => {
    try {
      let avatarData;

      if (data.image) {
        // Handle image file and convert to base64
        const file = data.image;
        const reader = new FileReader();

        avatarData = await new Promise((resolve, reject) => {
          reader.onload = () => {
            if (reader.readyState === 2) {
              resolve(reader.result); // Resolve with the base64 string
            }
          };
          reader.onerror = () => reject("Failed to read file");
          reader.readAsDataURL(file);
        });
      }

      // Create the review with image data
      const result = await createReview({
        name: data.name,
        message: data.message,
        rating: data.rating,
        image: avatarData,
      }).unwrap();

      // Show success message
      alert.success(result.message);

      // Close drawer and reset form
      handleDrawerClose();
      form.reset();
    } catch (error) {
      // Show error message
      alert.error(error?.data?.err || "Failed to submit review");
      console.error("Error submitting review:", error.message);
    }
  };

  const StarRating = ({
    rating,
    interactive = false,
    onRatingChange = null,
  }) => {
    const [hoveredStar, setHoveredStar] = useState(0);

    return (
      <div className={`flex gap-1 mb-4`}>
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

  return (
    <>
      <div
        className={`${
          testimonials?.length ? "block" : "hidden"
        } mx-auto px-4 md:px-8 lg:px-12 py-20 bg-gradient-to-b from-gray-900 via-gray-900 to-black`}
      >
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

        <div className="relative grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto gap-20">
          <div>
            <div className="relative h-80 w-full">
              <AnimatePresence>
                {testimonials?.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.src}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: Math.floor(Math.random() * 21) - 10,
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0.7,
                      scale: isActive(index) ? 1 : 0.95,
                      z: isActive(index) ? 0 : -100,
                      rotate: isActive(index)
                        ? 0
                        : Math.floor(Math.random() * 21) - 10,
                      zIndex: isActive(index)
                        ? 999
                        : testimonials.length + 2 - index,
                      y: isActive(index) ? [0, -80, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: Math.floor(Math.random() * 21) - 10,
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 origin-bottom"
                  >
                    <img
                      src={testimonial?.src}
                      alt={testimonial?.name}
                      className="h-full w-[80%] rounded-3xl"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-between flex-col py-4">
            <motion.div
              key={active}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <h3 className="text-2xl font-bold text-white">
                {testimonials[active]?.name}
              </h3>
              <p className="text-sm text-white opacity-60">
                {testimonials[active]?.designation}
              </p>
              <motion.p className="text-lg text-white mt-8">
                {testimonials[active]?.message}
              </motion.p>
              <StarRating rating={testimonials[active]?.rating} />
            </motion.div>

            <div className="flex gap-4 pt-12 md:pt-0">
              <Button
                onClick={handlePrev}
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <IconArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleNext}
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <IconArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-24"
        >
          <Button
            onClick={setDrawerOpen} // Use the prop here
            className="bg-white text-gray-700 hover:bg-gray-100"
          >
            Share Your Experience
          </Button>
        </motion.div>
      </div>

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

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Upload Photo</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <Input
                            type="file"
                            accept={ACCEPTED_IMAGE_TYPES.join(",")}
                            onChange={handleImageChange}
                            className="cursor-pointer"
                            {...field}
                          />
                          {previewUrl && (
                            <div className="relative w-full h-40">
                              <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                          )}
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
    </>
  );
};

export default AnimatedTestimonials;
