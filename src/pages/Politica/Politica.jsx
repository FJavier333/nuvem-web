import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./Politica.css";

const sections = [
  { id: "enfoque", title: "1. Enfoque de trabajo" },
  { id: "proceso", title: "2. Proceso general" },
  { id: "diseno", title: "3. Diseño y personalización" },
  { id: "cambios", title: "4. Cambios y ajustes durante el desarrollo" },
  { id: "soporte", title: "5. Soporte posterior a la entrega" },
  { id: "uso-responsable", title: "6. Uso responsable del servicio" },
  { id: "contenido", title: "7. Contenido proporcionado por el cliente" },
  { id: "confidencialidad", title: "8. Confidencialidad" },
  { id: "comunicacion", title: "9. Comunicación" },
  { id: "actualizaciones", title: "10. Actualizaciones de la política" },
];

export default function Politica() {
  const [active, setActive] = useState(sections[0].id);

  const navRef = useRef(null);
  const modalNavRef = useRef(null);
  const navUserInteractingAt = useRef(0);

  const [tocOpen, setTocOpen] = useState(false);

  // 1) Detecta qué sección está “activa” en el contenido
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // 2) Mantiene visible el item activo dentro del índice (desktop o modal)
  useEffect(() => {
    const panel = tocOpen ? modalNavRef.current : navRef.current;
    if (!panel) return;

    // si el usuario acaba de scrollear el índice manualmente, no peleamos
    if (Date.now() - navUserInteractingAt.current < 700) return;

    const link = panel.querySelector(`a[href="#${active}"]`);
    if (!link) return;

    const pad = 18; // aire arriba/abajo dentro del panel
    const panelRect = panel.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();

    const visibleTop = panelRect.top + pad;
    const visibleBottom = panelRect.bottom - pad;

    const isVisible = linkRect.top >= visibleTop && linkRect.bottom <= visibleBottom;

    if (!isVisible) {
      const offset = panel.clientHeight * 0.25; // deja el activo un poco arriba
      panel.scrollTo({
        top: link.offsetTop - offset,
        behavior: "smooth",
      });
    }
  }, [active, tocOpen]);

  // ✅ Acomoda el índice al hacer click para que el item no quede pegado
  const handleIndexClick = (e) => {
    const a = e.currentTarget;

    // evita “brinco” del focus en algunos navegadores
    a.focus({ preventScroll: true });

    const panel =
      a.closest(".terminos__tocNav") ||
      a.closest(".politica__nav") ||
      navRef.current ||
      modalNavRef.current;

    if (!panel) return;

    const offset = panel.clientHeight * 0.25;

    panel.scrollTo({
      top: a.offsetTop - offset,
      behavior: "smooth",
    });
  };

  // marca interacción del usuario para no pelear con el auto-scroll
  const markNavUserInteraction = () => {
    navUserInteractingAt.current = Date.now();
  };

  // Modal: ESC para cerrar + bloquear scroll del body (solo mientras esté abierto)
  useEffect(() => {
    if (!tocOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setTocOpen(false);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [tocOpen]);

  return (
    <main className="politica" aria-label="Política oficial de Nuvem">
      <div className="politica__container">
        {/* CONTENIDO */}
        <article className="politica__content">
          <header className="politica__head">
            <h1 className="politica__title">POLÍTICA OFICIAL DE NUVEM:</h1>

            <p className="politica__subtitle">
              <em>© nuvemstudio.com - Desarrollo Web y Soluciones Digitales.</em>
            </p>

            <p className="politica__meta">
              Versión 1.0 — Aplicable a todos los servicios de desarrollo web y sistemas
              digitales.
            </p>
            <p className="politica__meta">Última actualización: 23 de enero 2026</p>
          </header>

          {/* 1 */}
          <section id="enfoque" className="politica__section">
            <h2>1. Enfoque de trabajo</h2>
            <p>
              Nuvem es un estudio de desarrollo web que ofrece servicios personalizados,
              adaptados a las necesidades específicas de cada proyecto. No se trabaja con
              paquetes predefinidos ni soluciones genéricas. Cada proyecto se analiza y
              define de forma individual, priorizando claridad, funcionalidad y proyección
              a largo plazo.
            </p>
          </section>

          {/* 2 */}
          <section id="proceso" className="politica__section">
            <h2>2. Proceso general</h2>
            <p>
              Todos los proyectos siguen un proceso estructurado que incluye análisis,
              diseño, desarrollo, revisión y entrega. Este enfoque permite mantener orden,
              comunicación clara y control durante cada etapa del proyecto.
            </p>
            <p>
              El objetivo del proceso es construir soluciones bien pensadas, funcionales y
              alineadas a los objetivos definidos desde el inicio.
            </p>
          </section>

          {/* 3 */}
          <section id="diseno" className="politica__section">
            <h2>3. Diseño y personalización</h2>
            <p>
              Cada proyecto incluye diseño personalizado, adaptado a la identidad y
              necesidades del cliente. El cliente puede aportar referencias o lineamientos
              visuales; en caso de no contar con ellos, Nuvem propone soluciones de diseño
              acordes al proyecto.
            </p>
            <p>
              El diseño se desarrolla con un enfoque funcional y profesional, priorizando
              claridad, coherencia y experiencia de usuario.
            </p>
          </section>

          {/* 4 */}
          <section id="cambios" className="politica__section">
            <h2>4. Cambios y ajustes durante el desarrollo</h2>
            <p>
              Durante el desarrollo existen instancias de revisión destinadas a realizar
              ajustes razonables dentro del alcance acordado. Para mantener un flujo de
              trabajo eficiente, los ajustes deben comunicarse de forma clara y
              consolidada.
            </p>
            <p>
              Las solicitudes que impliquen modificaciones significativas, nuevas ideas o
              cambios fuera del enfoque inicial del proyecto se evalúan de manera
              independiente.
            </p>
          </section>

          {/* 5 */}
          <section id="soporte" className="politica__section">
            <h2>5. Soporte posterior a la entrega</h2>
            <p>
              Tras la entrega del proyecto, Nuvem ofrece un periodo inicial de soporte,
              enfocado en asegurar el correcto funcionamiento de la solución y en aclarar
              dudas sobre su uso.
            </p>
            <p>
              Este soporte está orientado a la estabilidad y comprensión del proyecto, no
              a la incorporación de nuevas funcionalidades o rediseños.
            </p>
          </section>

          {/* 6 */}
          <section id="uso-responsable" className="politica__section">
            <h2>6. Uso responsable del servicio</h2>
            <p>
              El cliente es responsable del uso, administración y operación del sitio web
              o sistema una vez entregado. Nuvem no gestiona la operación diaria del
              negocio ni la administración de contenidos, salvo acuerdo expreso.
            </p>
          </section>

          {/* 7 */}
          <section id="contenido" className="politica__section">
            <h2>7. Contenido proporcionado por el cliente</h2>
            <p>
              El cliente es responsable de proporcionar los textos, imágenes, logotipos e
              información necesarios para el desarrollo del proyecto. La calidad y
              oportunidad de este contenido influye directamente en los tiempos de
              entrega.
            </p>
          </section>

          {/* 8 */}
          <section id="confidencialidad" className="politica__section">
            <h2>8. Confidencialidad</h2>
            <p>
              Toda la información compartida durante el desarrollo del proyecto se maneja
              de forma confidencial y se utiliza exclusivamente para los fines acordados.
            </p>
          </section>

          {/* 9 */}
          <section id="comunicacion" className="politica__section">
            <h2>9. Comunicación</h2>
            <p>
              La comunicación oficial se realiza a través de correo electrónico,
              mensajería directa o reuniones virtuales. Para evitar malentendidos,
              cualquier acuerdo o ajuste relevante debe quedar registrado por escrito.
            </p>
          </section>

          {/* 10 */}
          <section id="actualizaciones" className="politica__section">
            <h2>10. Actualizaciones de la política</h2>
            <p>
              Nuvem podrá actualizar esta Política Oficial cuando sea necesario para
              reflejar mejoras en el proceso de trabajo o ajustes operativos. Las
              actualizaciones aplican a proyectos nuevos o vigentes previo aviso.
            </p>
          </section>
        </article>

        {/* ÍNDICE DERECHO */}
        <aside className="politica__index" aria-label="Índice">
          <nav
            className="politica__nav"
            ref={navRef}
            onWheel={markNavUserInteraction}
            onTouchStart={markNavUserInteraction}
            onMouseDown={markNavUserInteraction}
          >
            {sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onClick={handleIndexClick}
                className={active === sec.id ? "active" : ""}
              >
                {sec.title}
              </a>
            ))}
          </nav>
        </aside>
      </div>

      {createPortal(
        <>
          {!tocOpen && (
            <button
              type="button"
              className="terminos__tocBtn"
              aria-label="Esquema de contenido"
              aria-haspopup="dialog"
              aria-expanded={tocOpen}
              onClick={() => setTocOpen(true)}
            >
              <span className="terminos__tocDots" aria-hidden="true" />
            </button>
          )}

          {tocOpen && (
            <div
              className="terminos__tocModal"
              role="dialog"
              aria-modal="true"
              aria-label="Esquema de contenido"
              onMouseDown={(e) => {
                if (e.target === e.currentTarget) setTocOpen(false);
              }}
            >
              <div
                className="terminos__tocPanel"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className="terminos__tocTop">
                  <p className="terminos__tocTitle">Esquema de contenido</p>

                  <button
                    type="button"
                    className="terminos__tocClose"
                    aria-label="Cerrar"
                    onClick={() => setTocOpen(false)}
                  >
                    ×
                  </button>
                </div>

                <nav
                  className="terminos__tocNav"
                  ref={modalNavRef}
                  onWheel={markNavUserInteraction}
                  onTouchStart={markNavUserInteraction}
                  onMouseDown={markNavUserInteraction}
                >
                  {sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={(e) => {
                        handleIndexClick(e);
                        setTocOpen(false);
                      }}
                      className={active === sec.id ? "active" : ""}
                    >
                      {sec.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          )}
        </>,
        document.body
      )}
    </main>
  );
}