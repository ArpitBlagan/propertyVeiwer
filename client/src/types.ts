import validator from "validator";
import z from "zod";

export const signup = z.object({
  name: z.string(),
  email: z.string().email("please enter valid email"),
  password: z.string().min(6, "password should be 6 characters long"),
});
export type register = z.infer<typeof signup>;

export const signin = z.object({
  email: z.string(),
  password: z.string().min(6, "password should be 6 characters long"),
});
export type login = z.infer<typeof signin>;

export const addProperty = z.object({
  location: z.string(),
  price: z.string(),
  description: z.string(),
  file: z
    .instanceof(FileList)
    .refine((file) => file?.length == 1, "Image is required."),
});
export type property = z.infer<typeof addProperty>;

export const contactSchema = z.object({
  phonenumber: z.string().refine(validator.isMobilePhone),
  message: z.string(),
});
export type contact = z.infer<typeof contactSchema>;
