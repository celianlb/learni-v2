import AcademicCap from "../svg/academic-cap";
import Beaker from "../svg/beaker";
import UserGroup from "../svg/user-group";
import CustomLink from "../ui/CustomLink";

const links = [
  { label: "Les formations", href: "/formations", icon: AcademicCap },
  { label: "Devenir formateur", href: "/devenir-formateur", icon: UserGroup },
  {
    label: "Concevoir ma formation",
    href: "/concevoir-ma-formation",
    icon: Beaker,
  },
];

export default function Nav({
  variant = "desktop",
}: {
  variant?: "desktop" | "mobile";
}) {
  return (
    <nav
      className={
        variant === "mobile"
          ? "flex flex-col gap-8 text-lg items-start"
          : "flex md:gap-4 lg:gap-8"
      }
    >
      {links.map((link) => (
        <CustomLink key={link.href} href={link.href} icon={link.icon}>
          {link.label}
        </CustomLink>
      ))}
    </nav>
  );
}
