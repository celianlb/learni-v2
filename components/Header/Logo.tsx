import Image from "next/image";
import Link from "next/link";
export default function Logo() {
  return (
    <Link href="/">
      <Image src="/logo-learni.svg" alt="Learni" width={140} height={54} />
    </Link>
  );
}
