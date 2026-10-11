import { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { MobileNav } from "@/components/mobile-nav";
import { Footer } from "@/components/footer";
import { AboutPageContent } from "@/components/about-page-content";
import { Certificates } from "@/components/certificates";

export const metadata: Metadata = {
  title: "About Me | Divyanshu Singh",
  description: "Creative Programmer · AI Developer · Designer - Get in touch",
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <MobileNav />
      <main>
        <AboutPageContent />
        <Certificates />
      </main>
      <Footer />
    </>
  );
}