import Image from "next/image";
import Card from "../ui/Card/Card";

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
    <Card
      backgroundType="blue"
      borderType="white"
      className="flex flex-col gap-8 text-white p-8 md:p-8"
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
      <p className=" font-work-sans font-normal text-[16px] tracking-tight text-white">
        {testimonial.name} - {testimonial.job}
      </p>
    </Card>
  );
}
