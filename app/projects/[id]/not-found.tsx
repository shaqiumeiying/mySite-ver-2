import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="mb-4 text-4xl font-bold text-white">Project Not Found</h1>
      <p className="mb-8 text-zinc-400">
        The project you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-[#7affe7] transition-colors hover:text-[#ffc7d7]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}
