import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function AboutPage() {
    return (
        <main className="relative min-h-screen">
            <div className="relative z-10">
                <Navbar />
                <About />
                <Footer />
            </div>
        </main>
    );
}
