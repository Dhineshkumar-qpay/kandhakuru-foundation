import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import VisionMission from "@/components/VisionMission";
import KriyaYogam from "@/components/KriyaYogam";
import Benefits from "@/components/Benefits";
import SpiritualPhilosophy from "@/components/SpiritualPhilosophy";
import Programs from "@/components/Programs";
import Eligibility from "@/components/Eligibility";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <VisionMission />
      <KriyaYogam />
      <Benefits />
      <SpiritualPhilosophy />
      <Programs />
      <Eligibility />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}
