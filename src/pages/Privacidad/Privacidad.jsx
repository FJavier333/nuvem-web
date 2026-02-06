import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./Privacidad.css";

const sections = [
  { id: "responsable", title: "1. Responsable del tratamiento de los datos personales" },
  { id: "datos", title: "2. Datos personales que se recaban" },
  { id: "finalidades", title: "3. Finalidades del tratamiento de los datos" },
  { id: "proteccion", title: "4. Protección y confidencialidad de los datos" },
  { id: "arco", title: "5. Derechos ARCO" },
  { id: "medios", title: "6. Uso de medios de contacto" },
  { id: "cambios", title: "7. Cambios al aviso de privacidad" },
  { id: "consentimiento", title: "8. Consentimiento" },
  { id: "contacto", title: "9. Medio de contacto" },
];

export default function Privacidad() {
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
      a.closest(".privacidad__tocNav") ||
      a.closest(".privacidad__nav") ||
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
    <main className="privacidad" aria-label="Política oficial de Nuvem">
      <div className="privacidad__container">
        {/* CONTENIDO */}
        <article className="privacidad__content">
          <header className="privacidad__head">
            <h1 className="privacidad__title">AVISO DE PRIVACIDAD</h1>

            <p className="privacidad__subtitle">
              <em>© nuvemstudio.com - Desarrollo Web y Soluciones Digitales.</em>
            </p>

            <p className="privacidad__meta">
              Versión 1.0 — Aplicable a todos los servicios de desarrollo web y sistemas
              digitales.
            </p>
            <p className="privacidad__meta">Última actualización: 23 de enero 2026</p>
          </header>

          <p className="privacidad__intro">
            En cumplimiento con lo establecido por la Ley Federal de Protección de Datos
            Personales en Posesión de los Particulares, Nuvem pone a disposición de los
            usuarios el presente Aviso de Privacidad, con el fin de informar sobre el
            tratamiento de los datos personales que se recaban a través de este sitio web.
          </p>

          {/* 1 */}
          <section id="responsable" className="privacidad__section">
            <h2>1. Responsable del tratamiento de los datos personales</h2>
            <p>
              Nuvem es responsable del uso y protección de los datos personales recabados
              a través de este sitio web, y se compromete a tratarlos de forma confidencial
              y conforme a la legislación aplicable.
            </p>
          </section>

          {/* 2 */}
          <section id="datos" className="privacidad__section">
            <h2>2. Datos personales que se recaban</h2>
            <p>
              Los datos personales que Nuvem puede recabar incluyen, de manera enunciativa
              mas no limitativa:
            </p>
            <ul className="privacidad__list">
              <li>Nombre</li>
              <li>Correo electrónico</li>
              <li>Número telefónico</li>
              <li>Información relacionada con el proyecto, negocio o solicitud del cliente</li>
            </ul>
            <p>Nuvem no recaba datos sensibles a través de este sitio web.</p>
          </section>

          {/* 3 */}
          <section id="finalidades" className="privacidad__section">
            <h2>3. Finalidades del tratamiento de los datos</h2>
            <p>Los datos personales recabados serán utilizados exclusivamente para las siguientes finalidades:</p>
            <ul className="privacidad__list">
              <li>Dar atención a solicitudes de contacto, cotización o información.</li>
              <li>Establecer comunicación con el cliente o prospecto.</li>
              <li>Analizar la viabilidad y alcance de proyectos solicitados.</li>
              <li>Dar seguimiento a procesos relacionados con servicios contratados.</li>
            </ul>
            <p>
              Los datos no serán utilizados para fines distintos a los aquí descritos sin el
              consentimiento del titular.
            </p>
          </section>

          {/* 4 */}
          <section id="proteccion" className="privacidad__section">
            <h2>4. Protección y confidencialidad de los datos</h2>
            <p>
              Nuvem se compromete a resguardar los datos personales mediante medidas
              administrativas, técnicas y organizativas razonables, evitando su pérdida,
              uso indebido, acceso no autorizado o divulgación.
            </p>
            <p>
              Los datos personales no serán vendidos, cedidos ni compartidos con terceros,
              salvo en los casos legalmente permitidos o por requerimiento de autoridad
              competente.
            </p>
          </section>

          {/* 5 */}
          <section id="arco" className="privacidad__section">
            <h2>5. Derechos ARCO</h2>
            <p>El titular de los datos personales tiene derecho a:</p>
            <ul className="privacidad__list">
              <li>Acceder a sus datos personales.</li>
              <li>Rectificar sus datos cuando sean inexactos o incompletos.</li>
              <li>Cancelar sus datos cuando considere que no se requieren para las finalidades señaladas.</li>
              <li>Oponerse al tratamiento de sus datos para fines específicos.</li>
            </ul>
            <p>
              Para ejercer estos derechos, el titular podrá enviar una solicitud al correo
              electrónico de contacto indicado en este aviso.
            </p>
          </section>

          {/* 6 */}
          <section id="medios" className="privacidad__section">
            <h2>6. Uso de medios de contacto</h2>
            <p>
              Los datos proporcionados a través de formularios, correo electrónico,
              mensajería o cualquier medio de contacto disponible en este sitio web serán
              utilizados únicamente para la atención de solicitudes relacionadas con los
              servicios ofrecidos por Nuvem.
            </p>
          </section>

          {/* 7 */}
          <section id="cambios" className="privacidad__section">
            <h2>7. Cambios al aviso de privacidad</h2>
            <p>
              Nuvem se reserva el derecho de realizar modificaciones o actualizaciones al
              presente Aviso de Privacidad cuando sea necesario. Dichas modificaciones
              estarán disponibles en este mismo sitio web y entrarán en vigor a partir de
              su publicación.
            </p>
          </section>

          {/* 8 */}
          <section id="consentimiento" className="privacidad__section">
            <h2>8. Consentimiento</h2>
            <p>
              Al proporcionar sus datos personales a través de este sitio web, el titular
              reconoce haber leído y aceptado el presente Aviso de Privacidad.
            </p>
          </section>

          {/* 9 */}
          <section id="contacto" className="privacidad__section">
            <h2>9. Medio de contacto</h2>
            <p>
              Para cualquier duda relacionada con este Aviso de Privacidad o con el
              tratamiento de datos personales, el titular podrá comunicarse a través de
              los medios de contacto disponibles en este sitio web.
            </p>
          </section>
        </article>

        {/* ÍNDICE DERECHO */}
        <aside className="privacidad__index" aria-label="Índice">
          <nav
            className="privacidad__nav"
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