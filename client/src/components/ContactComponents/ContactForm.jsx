import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Send, MapPin, Users, Clock } from "lucide-react";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import moment from "moment";
import { Calendar as CalendarIcon } from "lucide-react";

const CustomTimePicker = ({ value, onChange, className }) => {
  return (
    <TimePicker
      showSecond={false}
      defaultValue={value ? moment(value, "HH:mm") : null}
      className={`w-full rounded-md h-12 ${className}`}
      onChange={(time) => onChange(time ? time.format("HH:mm") : "")}
      format="h:mm A"
      use12Hours
      inputReadOnly
      placeholder="Select time"
    />
  );
};

const ContactForm = ({ form, isLoading, onSubmit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-4xl mx-auto overflow-hidden border-0 shadow-2xl bg-white/90 backdrop-blur-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 z-0" />

        <CardHeader className="relative z-10 space-y-1 pb-8 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Contact Us
          </CardTitle>
          <CardDescription className="text-gray-500 text-lg">
            Let us know about your travel plans
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10 px-6 sm:px-8 pb-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John"
                            {...field}
                            className="h-12 bg-white/50 border-gray-200 focus:border-gray-400 focus:ring-gray-400 transition-all duration-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Doe"
                            {...field}
                            className="h-12 bg-white/50 border-gray-200 focus:border-gray-400 focus:ring-gray-400 transition-all duration-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            {...field}
                            className="h-12 bg-white/50 border-gray-200 focus:border-gray-400 focus:ring-gray-400 transition-all duration-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Your phone number"
                            {...field}
                            className="h-12 bg-white/50 border-gray-200 focus:border-gray-400 focus:ring-gray-400 transition-all duration-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Travel Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="startLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 flex items-center gap-2">
                          <MapPin className="h-4 w-4" /> From
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Starting location"
                            {...field}
                            className="h-12 bg-white/50 border-gray-200 focus:border-gray-400 focus:ring-gray-400 transition-all duration-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 flex items-center gap-2">
                          <MapPin className="h-4 w-4" /> To
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Destination"
                            {...field}
                            className="h-12 bg-white/50 border-gray-200 focus:border-gray-400 focus:ring-gray-400 transition-all duration-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="departureDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" /> Departure Date
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            min={new Date().toISOString().split("T")[0]} // Prevents past dates
                            className="h-12 bg-white/50 border-gray-200 focus:border-gray-400 focus:ring-gray-400 transition-all duration-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="departureTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 flex items-center gap-2">
                          <Clock className="h-4 w-4" /> Departure Time
                        </FormLabel>
                        <FormControl>
                          <CustomTimePicker
                            {...field}
                            className="bg-white/50 border-gray-200 focus:border-gray-400 focus:ring-gray-400 transition-all duration-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="travelers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 flex items-center gap-2">
                          <Users className="h-4 w-4" /> Group Size
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            placeholder="Number of travelers"
                            {...field}
                            className="h-12 bg-white/50 border-gray-200 focus:border-gray-400 focus:ring-gray-400 transition-all duration-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Your Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us more about your travel plans..."
                          className="min-h-[120px] bg-white/50 border-gray-200 focus:border-gray-400 focus:ring-gray-400 transition-all duration-300 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </div>
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <style jsx global>{`
        .rc-time-picker-panel {
          z-index: 50;
        }
        .rc-time-picker-input {
          height: 48px;
          background: rgba(255, 255, 255, 0.5);
          border-color: #e5e7eb;
          font-size: 0.875rem;
          padding: 0.5rem 1rem;
          cursor: pointer;
        }
        .rc-time-picker-input:focus {
          border-color: #9ca3af;
          ring: 2px;
          ring-color: #9ca3af;
        }
      `}</style>
    </motion.div>
  );
};

export default ContactForm;
