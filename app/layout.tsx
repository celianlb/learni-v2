import Footer from "@/components/footer";
import Header from "@/components/header/Header";
import type { Metadata } from "next";
import { Manrope, Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Learni - Formations professionnelles et développement de compétences",
    template: "%s | Learni",
  },
  description:
    "Learni propose des formations professionnelles de qualité pour développer vos compétences et faire évoluer votre carrière. Découvrez nos formations en présentiel et distanciel.",
  keywords: [
    "formations",
    "formation professionnelle",
    "apprentissage",
    "développement de compétences",
    "formation continue",
  ],
  authors: [{ name: "Learni" }],
  creator: "Learni",
  publisher: "Learni",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://learni.fr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://learni.fr",
    title:
      "Learni - Formations professionnelles et développement de compétences",
    description:
      "Learni propose des formations professionnelles de qualité pour développer vos compétences et faire évoluer votre carrière.",
    siteName: "Learni",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learni - Formations professionnelles",
    description:
      "Développez vos compétences avec nos formations professionnelles de qualité.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${workSans.variable} ${manrope.variable} antialiased px-10 md:px-24 2xl:px-[15%] overflow-x-hidden`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
