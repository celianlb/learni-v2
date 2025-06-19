import Image from "next/image";

export type Testimonial = {
  school: string;
  logoUrl: string;
  quote: string;
  name: string;
  job: string;
};

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <div
      className="flex bg-custom-blue-700
     rounded-3xl shadow-[inset_0_0_10px_0_rgba(255,255,255,0.1)] flex-col gap-8 text-white p-8 md:p-8"
    >
      <Image
        src={testimonial.logoUrl}
        alt={testimonial.school}
        width={800}
        height={800}
        className="w-16 h-fit"
      />
      <p className=" font-work-sans font-normal text-[16px] leading-tight tracking-tight opacity-80 text-white">
        {testimonial.quote}
      </p>
      <p className=" font-work-sans font-medium opacity-90 text-[16px] tracking-tight text-white">
        {testimonial.name} - {testimonial.job}
      </p>
    </div>
  );
}
