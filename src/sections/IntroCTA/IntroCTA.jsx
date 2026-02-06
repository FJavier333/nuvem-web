import "./IntroCTA.css";
import ParticlesBlob from "../../components/ParticlesBlob/ParticlesBlob";
import { useState } from "react";
import WhatsAppQRModal from "../../components/Contact/WhatsAppQRModal";

export default function IntroCTA() {
  const [openQR, setOpenQR] = useState(false);
  return (
    <section className="introCta">
      {/* FONDO DE PARTÍCULAS */}
      <ParticlesBlob
        className="introCta__particles"
        height="720px"
      />

      <div className="container">
        <div className="introCta__inner">

          <span className="introCta__kicker">
            NUVEM · ESTUDIO DIGITAL
          </span>

          <h2 className="introCta__title">
            DESARROLLO WEB
            <br />
            PROFESIONAL
          </h2>

          <p className="introCta__text">
            Diseñamos y desarrollamos sitios web profesionales,
            escalables y completamente personalizados.
            Nada de plantillas. Nada de soluciones express.
            Solo productos digitales pensados para crecer contigo.
          </p>

          <div className="introCta__actions">
            {/*
            <button
              type="button"
              className="btnCotiza"
              onClick={() => setOpenQR(true)}
            >
              Contactar
            </button>
            */}

            <a href="/#servicios" className="btn">
              Ver servicios
            </a>
          </div>

          <WhatsAppQRModal
            open={openQR}
            onClose={() => setOpenQR(false)}
            phone="5570713137"
            message="Hola, ¿Nuvem?."
          />

        </div>
      </div>
    </section>
  );
}