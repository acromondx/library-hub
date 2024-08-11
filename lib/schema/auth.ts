import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const changePasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  newPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

// export const customerSignUpSchema = z.object({
//   name: z
//     .string()
//     .min(2, { message: "Name must be at least 2 characters long" }),
//   email: z.string().email({ message: "Invalid email address" }),
//   password: z
//     .string()
//     .min(6, { message: "Password must be at least 6 characters long" }),
//   profilePicture: z.string(),
//   phoneNumber: z.string(),
//   city: z.string(),
//   address: z.string(),
//   geoLocation: geoLocationSchema,
// });

export type SignInSchemaType = z.infer<typeof signInSchema>;
export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
