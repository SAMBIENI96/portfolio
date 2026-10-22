import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Layers from "@/components/Layers";
import Statement from "@/components/Statement";
import Projects from "@/components/Projects";
import Method from "@/components/Method";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Layers />
        <Statement />
        <Projects />
        <Method />
        <Skills />
        <Experience />
      </main>
      <Contact />
    </>
  );
}
