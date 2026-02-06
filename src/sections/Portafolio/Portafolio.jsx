import "./Portafolio.css";
import { useEffect, useMemo, useRef, useState } from "react";
import ModalGlass from "../../components/ModalGlass/ModalGlass";
import GrainSection from "../../components/GrainSection/GrainSection";

import website1 from "../../images/a.png";
import website2 from "../../images/b.png";

// previews extra (mismo folder)
import website1c from "../../images/c2.png";
import website1d from "../../images/d.png";
import website1e from "../../images/e.png";

import website2f from "../../images/f.png";
import website2g from "../../images/g.png";
import website2h from "../../images/h.png";

export default function Portafolio() {
  const [activeId, setActiveId] = useState(null);

  // qué imagen está mostrando cada card
  const [frameById, setFrameById] = useState({});
  // controla el fade por card (clase .is-fading)
  const [fadingById, setFadingById] = useState({});

  // timers por card
  const timersRef = useRef({});
  // estado “corriendo” por card
  const runningRef = useRef({});

  const projects = useMemo(
    () => [
      {
        id: 1,
        image: website1,
        preview: [website1c, website1d, website1e],
        alt: "Website project preview 1",
        title: "Sistema de gestión de carga horaria universitaria",
        paragraphs: [
          "Sistema web desarrollado para una universidad, orientado a optimizar y organizar la gestión de la carga horaria de salas de cómputo y laboratorios. La solución centraliza la administración de horarios, apartados y disponibilidad de espacios, permitiendo un control claro y estructurado de los recursos académicos.",
          "El sistema automatiza procesos que tradicionalmente se realizaban de forma manual, reduciendo errores, mejorando el acceso a la información y facilitando la toma de decisiones. Está diseñado para ofrecer orden, claridad y escalabilidad, adaptándose a las necesidades operativas de la institución y a su crecimiento a futuro.",
        ],
      },
      {
        id: 2,
        image: website2,
        preview: [website2f, website2g, website2h],
        alt: "Website project preview 2",
        title: "Sitio web corporativo para empresa de tecnologías de la información",
        paragraphs: [
          "Sitio web desarrollado para una empresa del sector de Tecnologías de la Información, dedicada a la compra y venta de equipos de cómputo, mantenimiento preventivo y correctivo, seguridad electrónica, instalación de redes y servicios relacionados.",
          "El sitio tiene como objetivo presentar de manera clara y profesional la información de la empresa, su historia, sus servicios y los trabajos realizados, fortaleciendo su presencia digital y su imagen corporativa. La estructura y el diseño están pensados para comunicar confianza, experiencia y orden, facilitando que clientes potenciales conozcan la empresa y su oferta de servicios.",
        ],
      },
    ],
    []
  );

  const activeProject = projects.find((p) => p.id === activeId);

  // ✅ preload de previews para evitar parpadeo en el primer hover
  useEffect(() => {
    projects.forEach((p) => {
      p.preview.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    });
  }, [projects]);

  // ✅ cleanup de timers al desmontar
  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach((t) => {
        if (t) clearTimeout(t);
      });
    };
  }, []);

  const clearTimer = (id) => {
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
      timersRef.current[id] = null;
    }
  };

  const stopPreview = (id, baseImage) => {
    clearTimer(id);
    runningRef.current[id] = false;

    setFadingById((prev) => ({ ...prev, [id]: false }));
    setFrameById((prev) => ({ ...prev, [id]: baseImage }));
  };

  const startPreviewOnce = (project) => {
    const { id, image: baseImage, preview } = project;

    if (runningRef.current[id]) return;

    runningRef.current[id] = true;

    // base -> c -> d -> e (o f->g->h) y al final vuelve a base y se detiene
    const frames = [baseImage, ...preview];

    const stepMs = 1300;      // más aire entre imágenes
    const fadeMs = 650;       // coincide con CSS
    const preSwapDelay = 420; // swap cuando ya está suave

    let idx = 0;

    const tick = () => {
      if (!runningRef.current[id]) return;

      // fade out
      setFadingById((prev) => ({ ...prev, [id]: true }));

      timersRef.current[id] = setTimeout(() => {
        // swap
        setFrameById((prev) => ({ ...prev, [id]: frames[idx] }));

        // fade in
        setFadingById((prev) => ({ ...prev, [id]: false }));

        idx += 1;

        if (idx < frames.length) {
          // espera 1s entre frames (incluye el fade)
          timersRef.current[id] = setTimeout(tick, Math.max(stepMs - fadeMs, 0));
          return;
        }

        // terminó: vuelve a base y se detiene
        stopPreview(id, baseImage);
      }, preSwapDelay);
    };

    tick();
  };

  return (
    <GrainSection className="portafolio" variant="dark">
      <section id="portafolio" aria-label="Portafolio">
        <div className="container">
          <header className="portafolio__head">
            <h2 className="portafolio__title">
              PORTAFOLIO
              <br />
              DE PROYECTOS
            </h2>

            <p className="portafolio__desc">
              Algunos proyectos desarrollados con enfoque profesional, atención al detalle
              y una visión clara a largo plazo. Cada uno responde a necesidades específicas
              y ha sido construido con criterio, estructura y cuidado en cada etapa del
              proceso.
            </p>
          </header>

          <div className="portafolio__grid" role="list">
            {projects.map((p) => (
              <article className="portafolio__item" role="listitem" key={p.id}>
                <div
                  className="portafolio__media"
                  onMouseEnter={() => startPreviewOnce(p)}
                  onMouseLeave={() => stopPreview(p.id, p.image)}
                >
                  <img
                    className={`portafolio__img ${fadingById[p.id] ? "is-fading" : ""}`}
                    src={frameById[p.id] || p.image}
                    alt={p.alt}
                    loading="lazy"
                    draggable="false"
                  />
                </div>

                <div className="portafolio__action">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setActiveId(p.id)}
                  >
                    Conocer
                  </button>
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