import {z} from "zod"

const signupSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Email" })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(30, { message: "Email must not be more than 225 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password must not be more than 20 characters" }),
});

const loginSchema = z.object({
    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .email({message : "Invalid Email Address"})
      .min(3, { message: "Email must be at least 3 characters" })
      .max(30, { message: "Email must not be more than 225 characters" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(7, { message: "Password must be at least 6 characters" })
      .max(20, { message: "Password must not be more than 20 characters" }),
  });

export {signupSchema , loginSchema};