import { useMemo, useState } from "react";
import "./FAQ.css";
import WhatsAppQRModal from "../../components/Contact/WhatsAppQRModal";

export default function FAQ() {
  const [openQR, setOpenQR] = useState(false);
    const faqs = useMemo(
      () => [
        {
          q: "¿Existen paquetes predefinidos o los proyectos son personalizados?",
          a: "Cada sitio web se desarrolla de forma personalizada, adaptándose a las necesidades, objetivos y alcance específico de cada proyecto. El desarrollo se ajusta a lo que el cliente realmente necesita, ni más ni menos, asegurando una solución adecuada y bien estructurada.",
        },
        {
          q: "¿Cuánto cuesta un proyecto?",
          a: "El costo depende del alcance, la complejidad y los objetivos del proyecto. Cada propuesta se define de forma clara y personalizada antes de iniciar.",
        },
        {
          q: "¿Cuánto tiempo toma el desarrollo?",
          a: "Los tiempos varían según el proyecto. Desde el inicio se establecen plazos realistas y se respetan durante todo el proceso.",
        },
        {
          q: "¿Puedo solicitar cambios durante el proceso?",
          a: "Sí. El proceso contempla instancias de revisión y ajustes para asegurar que el resultado final cumpla con los objetivos definidos.\n\nLas solicitudes de cambios se gestionan dentro del alcance del proyecto. Ajustes adicionales o modificaciones fuera de lo acordado se evalúan y, de ser necesario, pueden implicar un costo adicional previamente informado.",
        },
        {
          q: "¿Ofrecen soporte después de la entrega?",
          a: "Sí. Todos los proyectos incluyen un periodo inicial de soporte posterior a la entrega, durante el cual se atienden ajustes menores, dudas y correcciones necesarias.\n\nUna vez finalizado este periodo, el soporte adicional se ofrece mediante planes de acompañamiento o solicitudes puntuales con costo, según las necesidades del proyecto.",
        },
      ],
      []
    );

    const [openIndexes, setOpenIndexes] = useState([0]); // puedes dejar [] si no quieres ninguna abierta al inicio

    const toggle = (idx) => {
      setOpenIndexes((prev) =>
        prev.includes(idx)
          ? prev.filter((i) => i !== idx)   // cierra esa
          : [...prev, idx]                  // abre esa sin cerrar las demás
      );
    };

    return (
      <section className="faq" id="faq">
        <div className="faq__container">
          <header className="faq__head">
            <h2 className="faq__title">PREGUNTAS FRECUENTES</h2>
          </header>

          <div className="faq__list">
            {faqs.map((item, idx) => {
              const isOpen = openIndexes.includes(idx);

              return (
                <div className={`faq__item ${isOpen ? "is-open" : ""}`} key={idx}>
                  <button
                    type="button"
                    className="faq__question"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq__qText">{item.q}</span>

                    <span
                      className={`faq__icon ${isOpen ? "is-open" : ""}`}
                      aria-hidden="true"
                    />

                  </button>

                  <div className="faq__answerWrap" aria-hidden={!isOpen}>
                    <div className="faq__answer">
                      {item.a.split("\n\n").map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>

                  <div className="faq__divider" />
                </div>
              );
            })}
          </div>
          <div className="faq__cta">
            <button
              type="button"
              className="btnCotiza"
              onClick={() => setOpenQR(true)}
            >
              Otra pregunta
            </button>
          </div>
        </div>

        <WhatsAppQRModal
          open={openQR}
          onClose={() => setOpenQR(false)}
          phone="5570713137"
          message="Hola, tengo una pregunta..."
        />
      </section>
    );
}