import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectsGrid from "@/components/ProjectsGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <ProjectsGrid />
        <Footer />
      </div>
    </main>
  );
}
