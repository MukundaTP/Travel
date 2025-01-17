import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PhoneCall, MapPin } from "lucide-react";
import { otherServices } from "@/constants/OtherServices";
import { cardVariants } from "@/constants/BusinessServices";

const ServicesGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {otherServices.map((service) => (
        <motion.div key={service.id} variants={cardVariants} whileHover="hover">
          <Card className="relative overflow-hidden bg-white border-gray-200 shadow-lg">
            {/* Service Badge */}
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-gray-700 text-white">
                {service.badge}
              </Badge>
            </div>

            {/* Icon Header */}
            <CardHeader className="bg-gray-700 p-6 text-center">
              <div className="mx-auto bg-gray-600 p-4 rounded-full mb-4">
                {/* Using the Icon component from the data */}
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {service.title}
              </h3>
              <p className="text-gray-200">{service.subtitle}</p>
            </CardHeader>

            <CardContent className="p-6">
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ScrollArea className="h-48 rounded-md border p-4">
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center space-x-3 text-gray-700"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <svg
                        className="w-5 h-5 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </ScrollArea>

              {/* Address Section */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start space-x-2 text-gray-700">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div className="space-y-1">
                    <p>{service.address.line1}</p>
                    <p>{service.address.line2}</p>
                    <p>{service.address.line3}</p>
                    <p>{service.address.line4}</p>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-6 bg-gray-50">
              <div className="w-full space-y-4">
                <Button
                  className="w-full bg-gray-700 hover:bg-gray-800 text-white"
                  size="lg"
                >
                  <PhoneCall className="w-4 h-4 mr-2" />
                  Contact Us
                </Button>
                <div className="text-sm text-gray-600 text-center">
                  +91 9916593999, 8105889639
                </div>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ServicesGrid;
