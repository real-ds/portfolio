import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sdeProjects } from "@/lib/content";
import { Navigation } from "@/components/navigation";
import { MobileNav } from "@/components/mobile-nav";
import { Footer } from "@/components/footer";
import { ProjectCaseStudy } from "@/components/project-detail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return sdeProjects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = sdeProjects.find((p) => p.id === id);

  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} — Case Study`,
    description: project.shortDescription,
  };
}

export default async function SDEProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = sdeProjects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <MobileNav />
      <ProjectCaseStudy project={project} siblings={sdeProjects} />
      <Footer />
    </>
  );
}