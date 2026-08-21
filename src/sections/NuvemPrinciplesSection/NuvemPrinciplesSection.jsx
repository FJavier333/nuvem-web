import { useRef, useState } from "react";
import useRevealCascade from "../../hooks/useRevealCascade";
import "./NuvemPrinciplesSection.css";

import nothingReusedImage640 from "../../images/nuvem-principles/pilar1.1-640.webp";
import nothingReusedImage960 from "../../images/nuvem-principles/pilar1.1-960.webp";
import nothingReusedImage1280 from "../../images/nuvem-principles/pilar1.1-1280.webp";
import professionalStandardsImage640 from "../../images/nuvem-principles/pilar1-640.webp";
import professionalStandardsImage960 from "../../images/nuvem-principles/pilar1-960.webp";
import professionalStandardsImage1280 from "../../images/nuvem-principles/pilar1-1280.webp";
import personalizedImage640 from "../../images/nuvem-principles/pilar3-640.webp";
import personalizedImage960 from "../../images/nuvem-principles/pilar3-960.webp";
import personalizedImage1280 from "../../images/nuvem-principles/pilar3-1280.webp";
import personalizedImage1600 from "../../images/nuvem-principles/pilar3-1600.webp";
import scalabilityImage640 from "../../images/nuvem-principles/item2-640.webp";
import scalabilityImage960 from "../../images/nuvem-principles/item2-960.webp";
import scalabilityImage1280 from "../../images/nuvem-principles/item2-1280.webp";
import scalabilityImage1600 from "../../images/nuvem-principles/item2-1600.webp";
import businessFocusImage640 from "../../images/nuvem-principles/Nuvem4-640.webp";
import businessFocusImage960 from "../../images/nuvem-principles/Nuvem4-960.webp";
import businessFocusImage1280 from "../../images/nuvem-principles/Nuvem4-1280.webp";
import businessFocusImage1600 from "../../images/nuvem-principles/Nuvem4-1600.webp";

const PORTRAIT_IMAGE_SIZES =
  "(max-width: 420px) 347px, (max-width: 768px) 640px, (max-width: 1100px) 343px, 450px";
const LANDSCAPE_IMAGE_SIZES =
  "(max-width: 768px) 780px, (max-width: 1100px) 705px, 780px";

const PRINCIPLES = [
  {
    id: "nada-reutilizado",
    title: "Nada reutilizado.",
    image: nothingReusedImage1280,
    imageSrcSet: `${nothingReusedImage640} 640w, ${nothingReusedImage960} 960w, ${nothingReusedImage1280} 1280w`,
    imageSizes: PORTRAIT_IMAGE_SIZES,
    imageAlt: "Estación de trabajo con herramientas de desarrollo",
    description:
      "Cada proyecto se desarrolla desde cero. No usamos plantillas, estructuras prefabricadas ni soluciones genéricas descargadas de internet. Tu sitio es único, como tu negocio.",
  },
  {
    id: "estandares-profesionales",
    title: "Estándares profesionales.",
    image: professionalStandardsImage1280,
    imageSrcSet: `${professionalStandardsImage640} 640w, ${professionalStandardsImage960} 960w, ${professionalStandardsImage1280} 1280w`,
    imageSizes: PORTRAIT_IMAGE_SIZES,
    imageAlt: "Código en una computadora portátil",
    description:
      "Trabajamos con herramientas, metodologías y prácticas utilizadas en entornos profesionales. Nada improvisado, nada experimental: solo soluciones estables y bien construidas.",
  },
  {
    id: "personalizado",
    title: "100% personalizado.",
    image: personalizedImage1600,
    imageSrcSet: `${personalizedImage640} 640w, ${personalizedImage960} 960w, ${personalizedImage1280} 1280w, ${personalizedImage1600} 1600w`,
    imageSizes: LANDSCAPE_IMAGE_SIZES,
    imageAlt: "Sitio web personalizado abierto en una computadora portátil",
    description:
      "El sitio se diseña y desarrolla según tus necesidades reales. Ni funciones innecesarias, ni limitaciones artificiales. Exactamente lo que tu proyecto requiere.",
  },
  {
    id: "escalabilidad-real",
    title: "Escalabilidad real.",
    image: scalabilityImage1600,
    imageSrcSet: `${scalabilityImage640} 640w, ${scalabilityImage960} 960w, ${scalabilityImage1280} 1280w, ${scalabilityImage1600} 1600w`,
    imageSizes: LANDSCAPE_IMAGE_SIZES,
    imageAlt: "Espacio de trabajo digital con computadora y teléfono",
    description:
      "Tu sitio no se queda estático. La estructura está pensada para crecer, adaptarse y evolucionar conforme tu negocio lo necesite, sin tener que rehacer todo desde cero.",
  },
  {
    id: "enfoque-empresarial",
    title: "Enfoque empresarial.",
    image: businessFocusImage1600,
    imageSrcSet: `${businessFocusImage640} 640w, ${businessFocusImage960} 960w, ${businessFocusImage1280} 1280w, ${businessFocusImage1600} 1600w`,
    imageSizes: LANDSCAPE_IMAGE_SIZES,
    imageAlt: "Profesional trabajando en una estrategia digital",
    description:
      "Más que un sitio visualmente atractivo, construimos un activo digital. Un espacio pensado para representar tu marca, generar confianza y apoyar tus objetivos comerciales.",
  },
];

const formatIndex = (index) => String(index + 1).padStart(2, "0");

export default function NuvemPrinciplesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStartRef = useRef(null);
  const revealRootRef = useRevealCascade();

  const selectPrevious = () => {
    setActiveIndex((current) => Math.max(0, current - 1));
  };

  const selectNext = () => {
    setActiveIndex((current) =>
      Math.min(PRINCIPLES.length - 1, current + 1)
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectNext();
    }
  };

  const handlePointerDown = (event) => {
    if (event.pointerType === "mouse") return;
    pointerStartRef.current = event.clientX;
  };

  const handlePointerUp = (event) => {
    if (pointerStartRef.current === null || event.pointerType === "mouse") return;

    const distance = event.clientX - pointerStartRef.current;
    pointerStartRef.current = null;

    if (Math.abs(distance) < 48) return;
    if (distance > 0) selectPrevious();
    if (distance < 0) selectNext();
  };

  return (
    <section
      className="nuvemPrinciples"
      ref={revealRootRef}
      aria-labelledby="nuvem-principles-title"
      onKeyDown={handleKeyDown}
    >
      <div className="nuvemPrinciples__container">
        <header className="nuvemPrinciples__header">
          <div className="nuvemPrinciples__headingGrid">
            <h2
              className="nuvemPrinciples__title"
              id="nuvem-principles-title"
              data-reveal
            >
              ¿POR QUÉ ELEGIR NUVEM?
            </h2>

            <p className="nuvemPrinciples__intro" data-reveal data-reveal-delay="1">
              Sin plantillas ni soluciones express. Cada
              proyecto es cuidadosamente planificado y desarrollado con
              estándares profesionales y herramientas adecuadas para empresas 
              que se toman en serio su presencia digital
            </p>
          </div>
        </header>

        <div className="nuvemPrinciples__toolbar" data-reveal data-reveal-delay="2">
          <p className="nuvemPrinciples__descriptor">
            PRINCIPIOS QUE DEFINEN CADA PROYECTO
          </p>

          <div className="nuvemPrinciples__navigation">
            <span className="nuvemPrinciples__counter" aria-live="polite">
              {formatIndex(activeIndex)} / {formatIndex(PRINCIPLES.length - 1)}
            </span>

            <div className="nuvemPrinciples__arrows" aria-label="Controles del carrusel">
              <button
                className="nuvemPrinciples__arrow"
                type="button"
                aria-label="Ver principio anterior"
                disabled={activeIndex === 0}
                onClick={selectPrevious}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15 18 9 12l6-6" />
                </svg>
              </button>

              <button
                className="nuvemPrinciples__arrow"
                type="button"
                aria-label="Ver principio siguiente"
                disabled={activeIndex === PRINCIPLES.length - 1}
                onClick={selectNext}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          className="nuvemPrinciples__viewport"
          data-reveal="media"
          data-reveal-delay="3"
          role="group"
          aria-roledescription="carrusel"
          aria-label="Principios de Nuvem"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            pointerStartRef.current = null;
          }}
        >
          <div
            className="nuvemPrinciples__track"
            style={{ "--nuvem-principles-active": activeIndex }}
          >
            {PRINCIPLES.map((principle, index) => {
              const isActive = index === activeIndex;

              return (
                <article
                  className={`nuvemPrinciples__card${
                    isActive ? " is-active" : ""
                  }`}
                  key={principle.id}
                  aria-current={isActive ? "true" : undefined}
                >
                  <button
                    className="nuvemPrinciples__cardButton"
                    type="button"
                    aria-label={`${formatIndex(index)}. ${principle.title}`}
                    aria-pressed={isActive}
                    onClick={() => setActiveIndex(index)}
                  >
                    <span className="nuvemPrinciples__cardMedia">
                      <img
                        className="nuvemPrinciples__cardImage"
                        src={principle.image}
                        srcSet={principle.imageSrcSet}
                        sizes={principle.imageSizes}
                        alt={principle.imageAlt}
                        loading="lazy"
                        decoding="async"
                        draggable="false"
                      />

                      <span className="nuvemPrinciples__cardNumber">
                        {formatIndex(index)}
                      </span>
                    </span>

                    <span className="nuvemPrinciples__cardBody">
                      <span className="nuvemPrinciples__cardTitle">
                        {principle.title}
                      </span>

                      <span
                        className="nuvemPrinciples__cardDescription"
                        aria-hidden={!isActive}
                      >
                        {principle.description}
                      </span>
                    </span>

                    <span
                      className="nuvemPrinciples__cardMark"
                      aria-hidden="true"
                    />
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
