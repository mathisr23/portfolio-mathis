import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Reel from "@/components/Reel";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <main>
        <Navbar />
        <Hero />
        <Reel />
        <Footer />
      </main>
    </PageTransition>
  );
}
