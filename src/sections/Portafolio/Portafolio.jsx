import "./Portafolio.css";
import { useMemo, useState } from "react";
import ModalGlass from "../../components/ModalGlass/ModalGlass";
import GrainSection from "../../components/GrainSection/GrainSection";
import useRevealCascade from "../../hooks/useRevealCascade";

import mockupUaemex from "../../images/mockup_uaemex2.png";
import mockupIcomp from "../../images/mockup_icomp.png";

export default function Portafolio() {
  const [activeId, setActiveId] = useState(null);
  const revealRootRef = useRevealCascade({
    selector: "[data-reveal], [data-portfolio-reveal]",
  });

  const projects = useMemo(
    () => [
      {
        id: 2,
        image: mockupIcomp,
        alt: "Mockup del sitio web corporativo de iComp",
        number: "01",
        homeTitle: "SITIO CORPORATIVO DE TICs",
        summary:
          "Presencia digital diseñada para comunicar servicios tecnológicos, experiencia y confianza con claridad.",
        title: "Sitio web corporativo para empresa de tecnologías de la información",
        paragraphs: [
          "Sitio web desarrollado para una empresa del sector de Tecnologías de la Información, dedicada a la compra y venta de equipos de cómputo, mantenimiento preventivo y correctivo, seguridad electrónica, instalación de redes y servicios relacionados.",
          "El sitio tiene como objetivo presentar de manera clara y profesional la información de la empresa, su historia, sus servicios y los trabajos realizados, fortaleciendo su presencia digital y su imagen corporativa. La estructura y el diseño están pensados para comunicar confianza, experiencia y orden, facilitando que clientes potenciales conozcan la empresa y su oferta de servicios.",
        ],
      },
      {
        id: 1,
        image: mockupUaemex,
        alt: "Mockup del sistema de gestión universitaria UAEMEX",
        number: "02",
        homeTitle: "GESTIÓN UNIVERSITARIA DE ESPACIOS",
        summary:
          "Plataforma para centralizar horarios, reservas y disponibilidad de salas y laboratorios.",
        title: "Sistema de gestión de carga horaria universitaria",
        paragraphs: [
          "Sistema web desarrollado para una universidad, orientado a optimizar y organizar la gestión de la carga horaria de salas de cómputo y laboratorios. La solución centraliza la administración de horarios, apartados y disponibilidad de espacios, permitiendo un control claro y estructurado de los recursos académicos.",
          "El sistema automatiza procesos que tradicionalmente se realizaban de forma manual, reduciendo errores, mejorando el acceso a la información y facilitando la toma de decisiones. Está diseñado para ofrecer orden, claridad y escalabilidad, adaptándose a las necesidades operativas de la institución y a su crecimiento a futuro.",
        ],
      },
    ],
    []
  );

  const activeProject = projects.find((p) => p.id === activeId);

  return (
    <GrainSection
      ambient="green-left"
      className="portafolio"
      variant="dark"
    >
      <section
        ref={revealRootRef}
        className="portafolio__section"
        id="portafolio"
        aria-label="Portafolio"
      >
        <div className="container">
          <header className="portafolio__head">
            <h2 className="portafolio__title" data-reveal>
              PORTAFOLIO
              <br />
              DE PROYECTOS
            </h2>

            <p className="portafolio__desc" data-reveal data-reveal-delay="1">
              Algunos proyectos desarrollados con enfoque profesional, atención al detalle
              y una visión clara a largo plazo. Cada uno responde a necesidades específicas
              y ha sido construido con criterio, estructura y cuidado en cada etapa del
              proceso.
            </p>
          </header>

          <div className="portafolio__grid" role="list">
            {projects.map((p) => (
              <article
                className="portafolio__item"
                data-portfolio-reveal
                role="listitem"
                key={p.id}
              >
                <div className="portafolio__media">
                  <img
                    className="portafolio__img"
                    src={p.image}
                    alt={p.alt}
                    loading="lazy"
                    draggable="false"
                  />
                </div>

                <div className="portafolio__content">
                  <span className="portafolio__number" aria-hidden="true">
                    {p.number}
                  </span>

                  <h3 className="portafolio__projectTitle">{p.homeTitle}</h3>
                  <p className="portafolio__summary">{p.summary}</p>

                  <div className="portafolio__action">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => setActiveId(p.id)}
                    >
                      +Info
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <ModalGlass
          open={!!activeProject}
          title={activeProject?.title}
          onClose={() => setActiveId(null)}
        >
          {activeProject?.paragraphs?.map((txt, i) => (
            <p key={i}>{txt}</p>
          ))}
        </ModalGlass>
      </section>
    </GrainSection>
  );
}
