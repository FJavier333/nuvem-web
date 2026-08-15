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
            Nuvem · Estudio digital
          </span>

          <h2 className="introCta__title">
            Webs con intención,<br />sin ruido.
          </h2>

          <p className="introCta__text">
            Convertimos ideas complejas en experiencias digitales claras,
            cuidadas y preparadas para crecer. Cada decisión tiene una razón:
            comunicar mejor, generar confianza y facilitar el siguiente paso.
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
