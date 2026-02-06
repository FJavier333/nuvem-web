import "./ComentarioGlide.css";
import profilePic from "../../images/profile-pic.jpg";
import GrainSection from "../../components/GrainSection/GrainSection";

export default function ComentarioGlide() {
  return (
    <GrainSection className="comentario" variant="dark">
      <section className="comentario" aria-label="Comentario">
        <blockquote className="comentario__quote">
          <h2 className="introCta__title">
              ¿Y LA INTELIGENCIA
              <br />
              ARTIFICIAL?
            </h2>

          <p className="comentario__text">
            “Las herramientas automatizadas de Inteligencia Artificial pueden generar sitios rápidamente, pero{" "}
            <span className="hand-underline">
              un proyecto profesional requiere criterio, acompañamiento y visión a largo plazo.
            </span> En Nuvem, la IA no reemplaza el criterio profesional, lo complementa.”
          </p>

          <footer className="comentario__footer">
            <span className="comentario__avatarWrap" aria-hidden="true">
              <img className="comentario__avatar" src={profilePic} alt="Foto de Javier Blas" />
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