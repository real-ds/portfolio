import { Navigation } from "@/components/navigation";
import { MobileNav } from "@/components/mobile-nav";
import { Hero } from "@/components/hero";
import { HeroToAboutTransition } from "@/components/hero-to-about-transition";
import { About } from "@/components/about";
import { DesignPlanningTheory } from "@/components/design-planning-theory";
import { AIProjects, SDEProjects } from "@/components/project-list";
import { MoreWorks } from "@/components/more-works";
import { TechnologyRibbon } from "@/components/ui/technology-ribbon";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <MobileNav />
      <main>
        <Hero />
        <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
          <TechnologyRibbon label="TECHNOLOGIES I WORK WITH" />
        </section>
        <HeroToAboutTransition />
        <About />
        <DesignPlanningTheory />
        <AIProjects />
        <SDEProjects />
        <MoreWorks />
        <CTA />
      </main>
      <Footer />
    </>
  );
}