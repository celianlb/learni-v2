"use client";

import { sendContactForm } from "@/actions/contact";
import CardSection from "@/components/section/card-section";
import Button from "@/components/UI/button";
import Input from "@/components/UI/Input/Input";
import { contactFormSchema, type ContactFormData } from "@/schemas/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ContactFormFormation() {
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const result = await sendContactForm(data, params.slug as string);
      setSubmitStatus({
        success: result.success,
        message: result.success
          ? "Votre demande a été envoyée avec succès !"
          : "Une erreur est survenue lors de l'envoi du formulaire.",
      });
      if (result.success) {
        reset();
      }
    } catch {
      setSubmitStatus({
        success: false,
        message: "Une erreur est survenue lors de l'envoi du formulaire.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CardSection className="p-4 lg:p-8!">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl text-custom-blue-900 font-manrope font-semibold">
          Vous souhaitez suivre cette formation ?
        </h2>
        <p className="text-gray-600 font-work-sans text-[16px] tracking-tight">
          Contactez-nous ! Un expert vous recontactera dans les plus brefs
          délais.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                {...register("firstName")}
                type="text"
                placeholder="Prénom *"
                error={errors.firstName?.message}
              />
            </div>

            <div>
              <Input
                {...register("lastName")}
                type="text"
                placeholder="Nom *"
                error={errors.lastName?.message}
              />
            </div>
          </div>

          <div>
            <Input
              {...register("email")}
              type="email"
              placeholder="Email *"
              error={errors.email?.message}
            />
          </div>

          <div>
            <Input
              {...register("phone")}
              type="tel"
              placeholder="Téléphone *"
              error={errors.phone?.message}
            />
          </div>

          <div>
            <Input
              {...register("numberOfLearners", { valueAsNumber: true })}
              type="number"
              min="1"
              placeholder="Nombre d'apprenants *"
              error={errors.numberOfLearners?.message}
            />
          </div>

          <div>
            <textarea
              {...register("message")}
              rows={4}
              placeholder="Message (facultatif)"
              className="border-[0.5px] font-archivo text-sm border-customBlue-600 border-opacity-20 rounded-[12px] p-4 shadow-[inset_0px_0px_2px_1px_rgba(160,177,211,0.20)] w-full focus:shadow-none focus:border-opacity-100 focus:outline-none"
            />
            {errors.message && (
              <p className="mt-1 font-archivo text-sm text-red-600">
                {errors.message.message}
              </p>
            )}
          </div>

          {submitStatus.message && (
            <div
              className={`p-4 rounded-md ${
                submitStatus.success
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {submitStatus.message}
            </div>
          )}
          <div className="relative z-20">
            <Button
              type="submit"
              disabled={isSubmitting}
              className=""
              variant="secondary"
            >
              {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
            </Button>
          </div>
        </form>
      </div>
    </CardSection>
  );
}
