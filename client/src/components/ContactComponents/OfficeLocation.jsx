import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fadeIn, staggerChildren } from "@/constants/ContactVariants";
import { motion } from "framer-motion";
import { MapPin, Clock, Plane } from "lucide-react";

const OfficeLocation = () => {
  return (
    <motion.section
      className="py-20 bg-gray-50"
      variants={staggerChildren}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-12" variants={fadeIn}>
          <h2 className="text-4xl font-bold mb-4">Visit Our Office</h2>
          <p className="text-gray-600 text-lg">
            Come visit us at our main office to discuss your travel plans in
            person
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div className="space-y-8" variants={fadeIn}>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <MapPin className="h-6 w-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    Main Office
                  </h3>
                  <p className="text-gray-600">
                    123 Travel Street
                    <br />
                    Suite 456
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <Clock className="h-6 w-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    Office Hours
                  </h3>
                  <ul className="text-gray-600 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      Saturday: 10:00 AM - 4:00 PM
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Sunday: Closed
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 bg-white shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Plane className="h-6 w-6 text-gray-700" />
                  </div>
                  <CardTitle>Parking Information</CardTitle>
                </div>
                <CardDescription>
                  Free parking is available for customers in the adjacent
                  parking garage.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <MapPin className="h-5 w-5 text-gray-700" />
                    </div>
                    <span className="text-gray-600">
                      Parking Garage Entrance: 125 Travel Street
                    </span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Clock className="h-5 w-5 text-gray-700" />
                    </div>
                    <span className="text-gray-600">Garage Hours: 24/7</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default OfficeLocation;