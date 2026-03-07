import archiveData from "@/data/archive.json";
import projectsData from "@/data/projects.json";
import HeroSection from "@/components/HeroSection";
import ParticleBackground from "@/components/ParticleBackground";
import TechInterlude from "@/components/TechInterlude";
import ModelViewer from "@/components/ModelViewer";
import Navbar from "@/components/Navbar";
import ProjectArchive from "@/components/ProjectArchive";
import ProjectsBento, { type Project } from "@/components/ProjectsBento";
import type { ArchiveEntry } from "@/components/ProjectArchive";

const projects = projectsData as Project[];
const archive = archiveData as ArchiveEntry[];

export default function Home() {
  return (
    <div className="relative min-h-screen text-zinc-100">
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar />
        <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-24 px-4 pb-20 pt-24 sm:px-6 lg:px-8">
          <HeroSection />
          <ModelViewer />
          {/* <TechInterlude /> */}
          <ProjectsBento projects={projects} />
          <ProjectArchive archive={archive} />
        </main>
      </div>
    </div>
  );
}
