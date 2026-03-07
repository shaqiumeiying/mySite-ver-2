import { notFound } from "next/navigation";
import projects from "@/data/projects.json";
import ProjectDetailContent, { type Project } from "@/components/ProjectDetailContent";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found | Diana",
    };
  }

  return {
    title: `${project.title} | Diana`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailContent project={project as Project} />;
}
