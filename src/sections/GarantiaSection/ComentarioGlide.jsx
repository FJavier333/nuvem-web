import "./ComentarioGlide.css";
import profilePic44 from "../../images/profile-responsive/profile-pic-44w.webp?no-inline";
import profilePic88 from "../../images/profile-responsive/profile-pic-88w.webp?no-inline";
import profilePic132 from "../../images/profile-responsive/profile-pic-132w.webp?no-inline";
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
            “Las herramientas automatizadas de Inteligencia Artificial pueden generar sitios rápidamente, pero{" "}
            <span className="hand-underline">
              un proyecto profesional requiere criterio, acompañamiento y visión a largo plazo.
            </span> En Nuvem, la IA no reemplaza el criterio profesional, lo complementa.”
          </p>

          <footer className="comentario__footer" data-reveal data-reveal-delay="2">
            <span className="comentario__avatarWrap" aria-hidden="true">
              <img
                className="comentario__avatar"
                src={profilePic132}
                srcSet={`${profilePic44} 44w, ${profilePic88} 88w, ${profilePic132} 132w`}
                sizes="44px"
                alt="Foto de Javier Blas"
                loading="lazy"
                decoding="async"
              />
            </span>

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
