import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";

export default function ContactPage() {
    return (
        <main className="relative min-h-screen">
            <div className="relative z-10">
                <Navbar />
                <Contact />
            </div>
        </main>
    );
}
