import Image from "next/image";
import Link from "next/link";
import Logo from "../header/Logo";

const SOCIAL = [
  {
    name: "Facebook",
    icon: "/social/facebook.svg",
  },
  {
    name: "Linkedin",
    icon: "/social/linkedin.svg",
  },
  {
    name: "Whatsapp",
    icon: "/social/whatsapp.svg",
  },
];

const FOOTER_NAV = [
  {
    name: "Mentions légales",
    href: "/mentions-legales",
  },
  {
    name: "Politique de confidentialité",
    href: "/politique-de-confidentialite",
  },
  {
    name: "Nous contacter",
    href: "/contact",
  },
  {
    name: "Nous lire",
    href: "/blog",
  },
];

export default function Footer() {
  return (
    <section className="rounded-b-none pb-16 md:py-16 mt-32 md:mt-48 flex flex-col text-customBlue-900 items-center gap-8 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/10 via-blue-400/10 to-blue-200/10 blur-3xl -z-10" />

      <div className="flex flex-col-reverse md:flex-row justify-between w-full gap-12">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 max-w-80">
            <Logo />
            <p className="text-custom-blue-900 opacity-80 font-work-sans text-[16px] tracking-tight">
              Nous serons à la hauteur de l&apos;ambition de votre école et nous
              le resterons
            </p>
          </div>
          <Image
            src="/assets/qualiopi.svg"
            alt="Qualiopi Learni"
            width={200}
            height={119}
          />
        </div>
        <div className="flex flex-col gap-8 md:items-end">
          <nav>
            <ul className="flex flex-col md:flex-row gap-4">
              {FOOTER_NAV.map((item, key) => (
                <li
                  key={key}
                  className="font-work-sans text-[16px] tracking-tight text-custom-blue-900 opacity-80 hover:text-blue-800 hover:opacity-100 transition-all duration-300"
                >
                  <Link href={item.href}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex gap-4">
            {SOCIAL.map((item, key) => (
              <Image
                key={key}
                src={item.icon}
                alt={item.name}
                width={32}
                height={32}
              />
            ))}
          </div>
        </div>
      </div>
      <p className=" font-archivo font-light text-custom-blue-900 opacity-60">
        © Learni 2025
      </p>
    </section>
  );
}
