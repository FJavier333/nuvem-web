import "./FinalCTA.css";
import hero10 from "../../assets/hero11.mp4";
import { useState } from "react";
import WhatsAppQRModal from "../../components/Contact/WhatsAppQRModal";

export default function FinalCTA() {
  const [openQR, setOpenQR] = useState(false);
  return (
    <section className="finalCta" aria-label="Final Call to Action">
      <div className="finalCta__media">
        <video
          className="finalCta__video"
          src={hero10}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="finalCta__overlay" aria-hidden="true"></div>
      </div>

      <div className="container finalCta__content">
        <div className="finalCta__panel">
          <h2 className="finalCta__title">HABLEMOS DE TU PROYECTO</h2>

          <p className="finalCta__desc">
            Si buscas un sitio web profesional, bien estructurado y desarrollado con criterio,
            en Nuvem podemos ayudarte a construir una solución alineada a tus objetivos.
          </p>

          <div className="finalCta__actions">
            <button
              type="button"
              className="btn btn--white"
              onClick={() => setOpenQR(true)}
            >
              Cotizar
            </button>
          </div>
        </div>
      </div>

      <WhatsAppQRModal
        open={openQR}
        onClose={() => setOpenQR(false)}
        phone="5570713137"
        message="Hola, me gustaría cotizar un sitio web."
      />
    </section>
  );
}