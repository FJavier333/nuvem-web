import "./ComentarioGlide.css";
import GrainSection from "../../components/GrainSection/GrainSection";
import useRevealCascade from "../../hooks/useRevealCascade";

export default function ComentarioGlide() {
  const revealRootRef = useRevealCascade();

  return (
    <GrainSection
      ambient="green-subtle"
      className="comentario"
      variant="dark"
    >
      <section className="comentario" aria-label="Comentario" ref={revealRootRef}>
        <blockquote className="comentario__quote">
          <h2 className="introCta__title" data-reveal>
              ¿Y LA INTELIGENCIA
              <br />
              ARTIFICIAL?
            </h2>

          <p className="comentario__text" data-reveal data-reveal-delay="1">
            “Las herramientas automatizadas de Inteligencia Artificial pueden generar soluciones digitales rápidamente, pero{" "}
            <span className="hand-underline">
              un proyecto profesional requiere criterio, acompañamiento y visión a largo plazo.
            </span> En Nuvem, la IA no reemplaza el criterio profesional, lo complementa.”
          </p>

          <footer className="comentario__footer" data-reveal data-reveal-delay="2">
            <div className="comentario__who">
              <div className="comentario__name">Javier Blas</div>
              <div className="comentario__role">Full Stack Developer</div>
            </div>
          </footer>
        </blockquote>
      </section>
    </GrainSection>
  );
}
