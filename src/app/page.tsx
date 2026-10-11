import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import LabList from "@/components/LabList";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <FeaturedWork />
        <LabList />
        <Footer />
      </div>
    </main>
  );
}
