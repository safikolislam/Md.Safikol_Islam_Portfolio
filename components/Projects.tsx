import { Reveal, SectionHeading } from "./Reveal";
import ProjectsCarousel from "./ProjectsCarousel";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <SectionHeading
        eyebrow="Projects"
        title="Selected work"
        sub="Full-stack applications with role-based dashboards, payments and real-world workflows. Swipe, drag or use the arrows."
      />
      <Reveal>
        <ProjectsCarousel />
      </Reveal>
    </section>
  );
}
