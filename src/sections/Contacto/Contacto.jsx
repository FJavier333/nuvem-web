import "./Contacto.css";
import GrainSection from "../../components/GrainSection/GrainSection";
import { useState } from "react";
import WhatsAppQRModal from "../../components/Contact/WhatsAppQRModal";
import useRevealCascade from "../../hooks/useRevealCascade";

export default function Contacto() {
  const [openQR, setOpenQR] = useState(false);
  const revealRootRef = useRevealCascade();

  return (
    <GrainSection
      ambient="green-balanced"
      className="contacto"
      variant="dark"
    >
      <section id="contacto" aria-label="Contacto" ref={revealRootRef}>
        <div className="container">
          <header className="contacto__head">
            <h2 className="contacto__title" data-reveal>
              CONTACTO
              <br />
              Y COTIZACIÓN
            </h2>

            <p className="contacto__desc" data-reveal data-reveal-delay="1">
              Escríbenos directamente para cotizar tu proyecto o resolver cualquier
              duda. Atención rápida y personalizada.
            </p>
          </header>

          <div
            className="contacto__simple"
            aria-label="Contacto directo"
            data-reveal
            data-reveal-delay="2"
          >
            <button
              type="button"
              className="btnCotiza"
              onClick={() => setOpenQR(true)}
            >
              Escríbenos
            </button>

            <a
              href="mailto:blacfjba3@gmail.com"
              className="btn-text btn-text--dark"
              onClick={() => {
                setTimeout(() => {
                  window.open(
                    "https://mail.google.com/mail/?view=cm&fs=1&to=blacfjba3@gmail.com",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }, 300);
              }}
            >
              o contáctanos por correo
            </a>
          </div>
        </div>
        <WhatsAppQRModal
          open={openQR}
          onClose={() => setOpenQR(false)}
          phone="5570713137"
          message="Hola, me gustaría cotizar un sitio web."
        />
      </section>
    </GrainSection>
  );
}
