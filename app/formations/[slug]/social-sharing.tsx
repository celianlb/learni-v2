"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

interface SocialSharingProps {
  title: string;
  description?: string;
}

export default function SocialSharing({
  title,
  description,
}: SocialSharingProps) {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://learni.fr";
  const url = `${baseUrl}${pathname}`;

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      `${title} - ${description || ""} ${url}`
    )}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-customBlue-800 font-medium">Partagez en 2 clics !</p>
      <div className="flex gap-6">
        {Object.entries(shareLinks).map(([platform, link]) => (
          <a
            key={platform}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            aria-label={`Partager sur ${platform}`}
          >
            <Image
              src={`/svg/${platform}.svg`}
              alt={`Partager sur ${platform}`}
              width={24}
              height={24}
              className="text-customBlue-900"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
