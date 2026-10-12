import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { aiProjects } from "@/lib/content";
import { Navigation } from "@/components/navigation";
import { MobileNav } from "@/components/mobile-nav";
import { Footer } from "@/components/footer";
import { ProjectCaseStudy } from "@/components/project-detail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return aiProjects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = aiProjects.find((p) => p.id === id);

  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} — Case Study`,
    description: project.shortDescription,
  };
}

export default async function AIProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = aiProjects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <MobileNav />
      <ProjectCaseStudy project={project} siblings={aiProjects} />
      <Footer />
    </>
  );
}