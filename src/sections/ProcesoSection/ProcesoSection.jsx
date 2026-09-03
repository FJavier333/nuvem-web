import { Link } from "react-router-dom";

import GrainSection from "../../components/GrainSection/GrainSection";
import useRevealCascade from "../../hooks/useRevealCascade";
import "./ProcesoSection.css";

const STEPS = [
  {
    number: "01",
    title: "CUÉNTANOS TU PROYECTO",
    text: "Entendemos qué necesitas, tus objetivos y qué quieres lograr.",
  },
  {
    number: "02",
    title: "DEFINIMOS LA SOLUCIÓN",
    text: "Definimos el alcance, las funcionalidades, la estructura y la dirección del proyecto. Podemos trabajar a partir de tus referencias o proponer una solución alineada con tus necesidades y objetivos.",
  },
  {
    number: "03",
    title: "DISEÑAMOS Y DESARROLLAMOS",
    text: "Construimos el proyecto y compartimos avances para mantener claridad durante el proceso.",
  },
  {
    number: "04",
    title: "REVISAMOS Y AJUSTAMOS",
    text: "Validamos el resultado contigo y realizamos los ajustes contemplados dentro del alcance acordado.",
  },
  {
    number: "05",
    title: "IMPLEMENTAMOS Y ENTREGAMOS",
    text: "Ponemos el proyecto en funcionamiento, entregamos los accesos correspondientes y dejamos abierta la posibilidad de soporte, mantenimiento o evolución.",
  },
];

export default function ProcesoSection() {
  const revealRootRef = useRevealCascade({
    selector: "[data-reveal], [data-process-reveal]",
  });

  return (
    <GrainSection
      ambient="green"
      className="procesoSection"
      variant="dark"
    >
      <section
        ref={revealRootRef}
        id="proceso"
        className="procesoSection__section"
        aria-labelledby="proceso-section-title"
      >
        <div className="container">
          <div className="procesoSection__layout">
            <header className="procesoSection__intro">
              <span className="procesoSection__eyebrow" data-reveal>
                NUESTRO PROCESO
              </span>

              <h2
                className="procesoSection__title"
                id="proceso-section-title"
              >
                <span
                  className="homeSectionTitle__reveal"
                  data-reveal
                  data-reveal-delay="1"
                >
                  DE LA PRIMERA
                  <br />
                  CONVERSACIÓN
                  <br />
                  A LA ENTREGA.
                </span>
              </h2>

              <p className="procesoSection__lead" data-reveal data-reveal-delay="2">
                Un proceso claro y acompañado para convertir tus objetivos en un
                proyecto listo para funcionar.
              </p>
            </header>

            <div className="procesoSection__content">
              <ol className="procesoSection__list">
                {STEPS.map((step) => (
                  <li
                    className="procesoSection__step"
                    data-process-reveal
                    key={step.number}
                  >
                    <span className="procesoSection__number">{step.number}</span>
                    <h3 className="procesoSection__stepTitle">{step.title}</h3>
                    <p className="procesoSection__stepText">{step.text}</p>
                  </li>
                ))}
              </ol>

              <div className="procesoSection__cta" data-process-reveal>
                <Link className="btn" to="/como-trabajamos">
                  <span>Conoce cómo trabajamos</span>
                  <span className="procesoSection__ctaArrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </GrainSection>
  );
}
