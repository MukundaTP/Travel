import { useEffect } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePostContactQueryMutation } from "../../Redux/contactApi";
import { useAlert } from "react-alert";
import { contactFormSchema } from "@/constants/ContactFormSchema";
import ContactHero from "@/components/ContactComponents/ContactHero";
import ContactInfo from "@/components/ContactComponents/ContactInfo";
import OfficeMapLocation from "@/components/ContactComponents/OfficeMapLocation";
import ContactForm from "@/components/ContactComponents/ContactForm";
import OfficeLocation from "@/components/ContactComponents/OfficeLocation";
import MetaData from "@/components/layouts/MetaData";

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [postContactQuery, { isLoading }] = usePostContactQueryMutation();
  const alert = useAlert();
  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      startLocation: "",
      endLocation: "",
      departureDate: "",
      departureTime: "",
      travelers: "",
      message: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      const result = await postContactQuery({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        startLocation: data.startLocation,
        endLocation: data.endLocation,
        departureDate: data.departureDate,
        departureTime: data.departureTime,
        travelers: data.travelers,
        message: data.message,
      }).unwrap();

      // Show success message
      alert.success(result.message);

      // Reset form
      form.reset();
    } catch (error) {
      // Show error message
      alert.error(error?.data?.err || "Failed to submit query");
      console.error("Error submitting form:", error);
    }
  };
  return (
    <>
      <MetaData title={"Contact Us"} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <ContactHero />
        <ContactInfo />

        {/* Contact Form Section */}
        <motion.section
          className="py-20 bg-gradient-to-b from-gray-900 via-gray-900 to-black"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ContactForm
                form={form}
                isLoading={isLoading}
                onSubmit={onSubmit}
              />

              <OfficeMapLocation />
            </div>
          </div>
        </motion.section>

        {/* Office Location Section */}

        <OfficeLocation />
      </div>
    </>
  );
};

export default ContactPage;
