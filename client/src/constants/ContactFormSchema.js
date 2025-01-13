import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must not exceed 100 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .regex(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
      "Please enter a valid phone number"
    ),
  startLocation: z
    .string()
    .min(2, "Starting location must be at least 2 characters")
    .max(30, "Starting location must not exceed 30 characters"),
  endLocation: z
    .string()
    .min(2, "Destination must be at least 2 characters")
    .max(30, "Destination must not exceed 30 characters"),
  departureDate: z.string().min(1, "Please select a departure date"),
  departureTime: z.string().min(1, "Please select a departure time"),
  travelers: z
    .string()
    .min(1, "Please enter number of travelers")
    .regex(/^\d+$/, "Please enter a valid number"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must not exceed 1000 characters"),
});
