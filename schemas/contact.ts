import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  numberOfLearners: z
    .number()
    .min(1, "Le nombre d'apprenants doit être au moins 1"),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
