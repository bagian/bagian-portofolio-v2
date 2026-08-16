import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, getProjectBySlug } from "@/constant/projects";
import ProjectDetail from "./ProjectDetail";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = () =>
  PROJECTS.map((project) => ({ slug: project.slug }));

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  return {
    title: `${project.client} | Bagian Corps Case Study`,
    description: project.EN.description,
    openGraph: {
      title: `${project.client} | ${project.EN.title}`,
      description: project.EN.description,
      url: `https://www.bagian.web.id/work/${project.slug}`,
      images: ["/images/og/og-bagian-web.png"],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
