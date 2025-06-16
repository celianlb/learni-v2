"use server";

import { contactFormSchema, type ContactFormData } from "@/schemas/contact";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

type ValidationResult = {
  success: boolean;
  data?: ContactFormData;
  error?: Array<{ path: string; message: string }> | string;
};

export async function validateContactForm(
  data: unknown
): Promise<ValidationResult> {
  try {
    const validatedData = contactFormSchema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map((err: z.ZodIssue) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      };
    }
    return {
      success: false,
      error: "Une erreur est survenue lors de la validation du formulaire",
    };
  }
}

export async function sendContactForm(data: unknown, formationTitle: string) {
  try {
    const validationResult = await validateContactForm(data);
    if (!validationResult.success || !validationResult.data) {
      return validationResult;
    }

    const { firstName, lastName, email, phone, numberOfLearners, message } =
      validationResult.data;

    const { data: emailData, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [process.env.CONTACT_EMAIL || ""],
      subject: `Demande d'information - Formation ${formationTitle}`,
      html: `
        <h2>Nouvelle demande d'information pour la formation : ${formationTitle}</h2>
        <p><strong>Nom :</strong> ${lastName}</p>
        <p><strong>Prénom :</strong> ${firstName}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Nombre d'apprenants :</strong> ${numberOfLearners}</p>
        ${message ? `<p><strong>Message :</strong> ${message}</p>` : ""}
      `,
    });

    if (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      return {
        success: false,
        error: "Une erreur est survenue lors de l'envoi de l'email",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de l'envoi du formulaire:", error);
    return {
      success: false,
      error: "Une erreur est survenue lors de l'envoi du formulaire",
    };
  }
}
