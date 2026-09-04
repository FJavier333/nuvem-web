import GrainSection from "../../components/GrainSection/GrainSection";
import ParticlesBlob from "../../components/ParticlesBlob/ParticlesBlob";
import { useState } from "react";
import WhatsAppQRModal from "../../components/Contact/WhatsAppQRModal";
import useRevealCascade from "../../hooks/useRevealCascade";
import "./IntroCTA.css";

export default function IntroCTA() {
  const [openQR, setOpenQR] = useState(false);
  const revealRootRef = useRevealCascade();

  return (
    <GrainSection
      ambient="green-hero"
      as="section"
      className="introCta"
      variant="dark"
    >
      {/* FONDO DE PARTÍCULAS */}
      <ParticlesBlob
        className="introCta__particles"
        height="720px"
      />

      <div className="container">
        <div className="introCta__inner" ref={revealRootRef}>

          <span className="introCta__kicker" data-reveal>
            NUVEM · ESTUDIO DIGITAL
          </span>

          <h1 className="introCta__title" data-reveal data-reveal-delay="1">
            DESARROLLO WEB
            <br />
            Y SOFTWARE A MEDIDA
          </h1>

          <p className="introCta__text" data-reveal data-reveal-delay="2">
            Diseñamos y desarrollamos sitios web, aplicaciones y soluciones digitales
            completamente personalizadas. Nada de plantillas. Nada de soluciones express.
            Solo productos digitales pensados para crecer contigo.
          </p>

          <div className="introCta__actions" data-reveal data-reveal-delay="3">
            <button
              type="button"
              className="btnCotiza"
              onClick={() => setOpenQR(true)}
            >
              Contactar
            </button>

            {/*<a href="/#servicios" className="btnCotiza">
              Ver servicios
            </a>*/}
          </div>

          <WhatsAppQRModal
            open={openQR}
            onClose={() => setOpenQR(false)}
            phone="5570713137"
            message="Hola, ¿Nuvem?."
          />

        </div>
      </div>
    </GrainSection>
  );
}
