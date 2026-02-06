import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./Terminos.css";

const sections = [
  { id: "aceptacion", title: "1. Aceptación de los términos" },
  { id: "alcance-servicio", title: "2. Alcance del servicio" },
  { id: "obligaciones-cliente", title: "3. Obligaciones del cliente" },
  { id: "obligaciones-nuvem", title: "4. Obligaciones de Nuvem" },
  { id: "propiedad-intelectual", title: "5. Propiedad intelectual" },
  { id: "uso-indebido", title: "6. Uso indebido, reventa y explotación no autorizada" },
  { id: "diseno-revisiones", title: "7. Diseño personalizado y revisiones" },
  { id: "pagos", title: "8. Pagos y condiciones" },
  { id: "dominio-hosting", title: "9. Dominio, hosting y servicios de terceros" },
  { id: "soporte-garantia", title: "10. Soporte y garantía" },
  { id: "mantenimiento-posterior", title: "11. Mantenimiento posterior" },
  { id: "uso-contenido", title: "12. Uso de contenido" },
  { id: "confidencialidad", title: "13. Confidencialidad" },
  { id: "retrasos-suspensiones", title: "14. Retrasos, pausas y suspensiones" },
  { id: "cancelaciones-reembolsos", title: "15. Cancelaciones y reembolsos" },
  { id: "limitacion-responsabilidad", title: "16. Limitación de responsabilidad" },
  { id: "modificaciones-terminos", title: "17. Modificaciones a los términos" },
  { id: "jurisdiccion", title: "18. Jurisdicción" },
];

export default function Terminos() {
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

  // 2) Mantiene visible el item activo dentro del índice (desktop o modal, según esté abierto)
  useEffect(() => {
    const panel = tocOpen ? modalNavRef.current : navRef.current;
    if (!panel) return;

    if (Date.now() - navUserInteractingAt.current < 700) return;

    const link = panel.querySelector(`a[href="#${active}"]`);
    if (!link) return;

    const pad = 18;
    const panelRect = panel.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();

    const visibleTop = panelRect.top + pad;
    const visibleBottom = panelRect.bottom - pad;

    const isVisible = linkRect.top >= visibleTop && linkRect.bottom <= visibleBottom;

    if (!isVisible) {
      const offset = panel.clientHeight * 0.25;
      panel.scrollTo({
        top: link.offsetTop - offset,
        behavior: "smooth",
      });
    }
  }, [active, tocOpen]);

  // ✅ Acomoda el índice al hacer click para que el item no quede pegado
  const handleIndexClick = (e) => {
    const a = e.currentTarget;

    a.focus({ preventScroll: true });

    const panel =
      a.closest(".terminos__tocNav") ||
      a.closest(".terminos__nav") ||
      navRef.current ||
      modalNavRef.current;

    if (!panel) return;

    const offset = panel.clientHeight * 0.25;

    panel.scrollTo({
      top: a.offsetTop - offset,
      behavior: "smooth",
    });
  };

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
    <main className="terminos" aria-label="Términos oficial de Nuvem">
      <div className="terminos__container">
        {/* CONTENIDO */}
        <article className="terminos__content">
          <header className="terminos__head">
            <h1 className="terminos__title">TÉRMINOS Y CONDICIONES</h1>

            <p className="terminos__subtitle">
              <em>© nuvemstudio.com - Desarrollo Web y Soluciones Digitales.</em>
            </p>

            <p className="terminos__meta">Versión 1.0 - Documento Oficial</p>
            <p className="terminos__meta">Última actualización: 23 de enero 2026</p>
          </header>

          {/* 1 */}
          <section id="aceptacion" className="terminos__section">
            <h2>1. Aceptación de los términos</h2>
            <p>
              Al contratar los servicios de Nuvem, el cliente acepta íntegramente el presente
              documento de Términos y Condiciones, la Política Oficial y el alcance específico
              del proyecto establecido en la cotización o contrato correspondiente.
            </p>
          </section>

          {/* 2 */}
          <section id="alcance-servicio" className="terminos__section">
            <h2>2. Alcance del servicio</h2>
            <p>
              Nuvem desarrollará el sitio web, sistema o solución digital conforme al servicio
              contratado o a la cotización personalizada aceptada por el cliente.
            </p>
            <p>Únicamente se desarrollarán las funcionalidades especificadas por escrito.</p>
            <p>
              Cualquier solicitud adicional no contemplada será considerada trabajo fuera del alcance
              y se cotizará como servicio adicional.
            </p>
          </section>

          {/* 3 */}
          <section id="obligaciones-cliente" className="terminos__section">
            <h2>3. Obligaciones del cliente</h2>
            <p>El cliente se compromete a:</p>
            <ul className="terminos__list">
              <li>Proporcionar información, accesos, textos, imágenes, logotipos y material relevante para el desarrollo del proyecto.</li>
              <li>Entregar el contenido en tiempos razonables para evitar retrasos.</li>
              <li>Revisar y aprobar avances conforme al flujo de trabajo establecido.</li>
              <li>Efectuar los pagos acordados en tiempo y forma.</li>
            </ul>
            <p>
              El incumplimiento de cualquiera de estos puntos podrá ocasionar retrasos en la fecha de entrega
              del sitio o la suspensión del proyecto sin responsabilidad para Nuvem.
            </p>
          </section>

          {/* 4 */}
          <section id="obligaciones-nuvem" className="terminos__section">
            <h2>4. Obligaciones de Nuvem</h2>
            <p>Nuvem se compromete a:</p>
            <ul className="terminos__list">
              <li>Desarrollar el proyecto de acuerdo con lo contratado y el alcance definido.</li>
              <li>Garantizar un diseño personalizado conforme a las necesidades del proyecto.</li>
              <li>Mantener comunicación clara y profesional durante el proceso.</li>
              <li>Corregir errores técnicos durante el periodo de soporte incluido.</li>
            </ul>
            <p>
              Nuvem actuará con transparencia y criterio profesional, informando de manera clara
              los costos reales del proyecto y evitando cargos innecesarios o prácticas que aprovechen el desconocimiento del cliente.
            </p>
          </section>

          {/* 5 */}
          <section id="propiedad-intelectual" className="terminos__section">
            <h2>5. Propiedad intelectual</h2>

            <p>El cliente es propietario de:</p>
            <ul className="terminos__list">
              <li>Su dominio.</li>
              <li>Su marca y logotipos.</li>
              <li>Su contenido (textos, imágenes, productos, etc.).</li>
              <li>El diseño final visible del sitio o sistema.</li>
            </ul>

            <p>Nuvem conserva la propiedad de:</p>
            <ul className="terminos__list">
              <li>Código fuente interno reutilizable.</li>
              <li>Componentes, módulos, estructuras técnicas y configuraciones internas.</li>
              <li>Herramientas, automatizaciones y soluciones desarrolladas como propiedad intelectual.</li>
            </ul>

            <p>
              El cliente recibe un sistema completamente funcional, pero no adquiere derechos para revender,
              redistribuir o reutilizar el código para proyectos externos sin autorización previa o acuerdo adicional.
            </p>
          </section>

          {/* 6 */}
          <section id="uso-indebido" className="terminos__section">
            <h2>6. Uso indebido, reventa y explotación no autorizada</h2>
            <p>
              El cliente no podrá revender, sublicenciar, ceder, comercializar ni explotar con terceros, total o
              parcialmente, el sitio web, sistema, código, estructura, automatizaciones o cualquier solución
              desarrollada por Nuvem, sin autorización previa y expresa por escrito.
            </p>
            <p>
              Cualquier uso con fines comerciales, reventa, redistribución o lucro con terceros sin dicha autorización
              constituirá un incumplimiento grave de los presentes Términos y Condiciones.
            </p>

            <p>En caso de incumplimiento, Nuvem se reserva el derecho de:</p>
            <ul className="terminos__list">
              <li>Exigir el cese inmediato del uso indebido.</li>
              <li>Reclamar la indemnización correspondiente por daños y perjuicios.</li>
              <li>Suspender el soporte, mantenimiento o cualquier servicio activo relacionado.</li>
              <li>Iniciar las acciones legales necesarias para la protección de su propiedad intelectual.</li>
            </ul>

            <p>
              Esta restricción no aplica al uso normal del sitio por parte del cliente para sus propios fines
              comerciales, operativos o institucionales.
            </p>
          </section>

          {/* 7 */}
          <section id="diseno-revisiones" className="terminos__section">
            <h2>7. Diseño personalizado y revisiones</h2>
            <p>
              Todos los proyectos desarrollados por Nuvem incluyen diseño personalizado, adaptado a las necesidades
              y objetivos específicos de cada cliente.
            </p>
            <p>
              El proceso contempla instancias de revisión previamente acordadas, durante las cuales el cliente podrá
              solicitar ajustes razonables dentro del alcance definido del proyecto. Cada instancia de revisión
              corresponde a un conjunto de modificaciones enviadas de forma consolidada, con el fin de mantener un
              proceso ordenado y eficiente.
            </p>
            <p>
              Las solicitudes de cambios adicionales, ajustes fuera del alcance acordado o rediseños sustanciales no
              contemplados inicialmente podrán implicar un costo adicional, el cual será informado y aprobado previamente
              por el cliente.
            </p>
          </section>

          {/* 8 */}
          <section id="pagos" className="terminos__section">
            <h2>8. Pagos y condiciones</h2>
            <p>Las modalidades de pago son:</p>
            <ul className="terminos__list">
              <li>Pago del 100% al inicio, o</li>
              <li>Esquema 50/50: 50% para iniciar y 50% al finalizar.</li>
            </ul>
            <p>No se iniciará ningún proyecto sin anticipo.</p>
            <p>No se entregará el sitio, sistema o archivos sin la liquidación total del pago.</p>
            <p>Todos los pagos por desarrollo son no reembolsables una vez iniciada la fase de trabajo.</p>
          </section>

          {/* 9 */}
          <section id="dominio-hosting" className="terminos__section">
            <h2>9. Dominio, hosting y servicios de terceros</h2>
            <ul className="terminos__list">
              <li>El dominio se adquiere siempre con los datos y métodos de pago del cliente.</li>
              <li>Nuvem gestiona la configuración técnica necesaria.</li>
              <li>
                Servicios externos como hosting, APIs, widgets o pasarelas de pago pueden generar cargos independientes
                no incluidos en el desarrollo.
              </li>
              <li>Nuvem no se responsabiliza por fallos, interrupciones o cambios derivados de proveedores externos.</li>
            </ul>
          </section>

          {/* 10 */}
          <section id="soporte-garantia" className="terminos__section">
            <h2>10. Soporte y garantía</h2>
            <p>
              Todos los proyectos desarrollados por Nuvem incluyen un periodo de soporte de 30 días naturales posteriores
              a la entrega, destinado a garantizar el correcto funcionamiento del sitio conforme a lo acordado.
            </p>
            <p>Durante este periodo, el soporte cubre exclusivamente:</p>
            <ul className="terminos__list">
              <li>Corrección de errores técnicos derivados del desarrollo.</li>
              <li>Aclaraciones relacionadas con el funcionamiento del sitio.</li>
            </ul>
            <p>
              El soporte no incluye cambios de diseño, nuevas funcionalidades, rediseños, modificaciones fuera del alcance
              ni carga de contenido adicional.
            </p>
            <p>
              Una vez finalizado el periodo de soporte incluido, cualquier requerimiento adicional se atenderá mediante
              planes de soporte, servicios adicionales o solicitudes puntuales con costo, previa aprobación del cliente.
            </p>
          </section>

          {/* 11 */}
          <section id="mantenimiento-posterior" className="terminos__section">
            <h2>11. Mantenimiento posterior</h2>
            <p>El cliente podrá contratar planes de mantenimiento mensual o anual.</p>
            <p>Cualquier funcionalidad nueva será cotizada como trabajo adicional.</p>
          </section>

          {/* 12 */}
          <section id="uso-contenido" className="terminos__section">
            <h2>12. Uso de contenido</h2>
            <p>El cliente garantiza que posee los derechos de uso del contenido proporcionado.</p>
            <p>
              Nuvem no se responsabiliza por reclamaciones derivadas del uso de material que infrinja derechos de autor.
            </p>
          </section>

          {/* 13 */}
          <section id="confidencialidad" className="terminos__section">
            <h2>13. Confidencialidad</h2>
            <p>Toda la información proporcionada por el cliente será manejada de forma confidencial.</p>
            <p>Nuvem no divulgará información sensible salvo autorización expresa o requerimiento legal.</p>
          </section>

          {/* 14 */}
          <section id="retrasos-suspensiones" className="terminos__section">
            <h2>14. Retrasos, pausas y suspensiones</h2>
            <p>Nuvem podrá pausar o reprogramar el proyecto si el cliente:</p>
            <ul className="terminos__list">
              <li>No entrega contenido.</li>
              <li>No responde revisiones o aprobaciones.</li>
              <li>Incumple con pagos.</li>
              <li>Solicita cambios fuera del alcance de forma reiterada.</li>
            </ul>
            <p>
              En caso de suspensión prolongada, Nuvem podrá solicitar un ajuste de precio o dar por terminado el proyecto
              conservando el anticipo.
            </p>
          </section>

          {/* 15 */}
          <section id="cancelaciones-reembolsos" className="terminos__section">
            <h2>15. Cancelaciones y reembolsos</h2>
            <ul className="terminos__list">
              <li>El anticipo no es reembolsable en ninguna circunstancia.</li>
              <li>
                Si el cliente ha cubierto el total del servicio, se evaluará el porcentaje de avance para determinar un
                posible reembolso parcial.
              </li>
              <li>
                Nuvem podrá cancelar el proyecto en caso de abuso, falta de cooperación o incumplimiento del cliente.
              </li>
            </ul>
          </section>

          {/* 16 */}
          <section id="limitacion-responsabilidad" className="terminos__section">
            <h2>16. Limitación de responsabilidad</h2>
            <p>Nuvem no será responsable por:</p>
            <ul className="terminos__list">
              <li>Pérdida de ventas, ingresos o datos.</li>
              <li>Fallos de hosting, APIs o servicios externos.</li>
              <li>Uso indebido del sistema por parte del cliente.</li>
              <li>Cambios realizados por el cliente o terceros.</li>
            </ul>
            <p>
              La responsabilidad de Nuvem se limita exclusivamente a la corrección de errores técnicos dentro del periodo
              de soporte.
            </p>
          </section>

          {/* 17 */}
          <section id="modificaciones-terminos" className="terminos__section">
            <h2>17. Modificaciones a los términos</h2>
            <p>Nuvem se reserva el derecho de modificar, actualizar o ajustar en cualquier momento los presentes Términos y Condiciones,
            con el fin de reflejar cambios en sus servicios, procesos internos, criterios operativos o disposiciones legales aplicables.</p>
            <p>Cualquier modificación será publicada a través de los medios oficiales de Nuvem y entrará en vigor a partir de su publicación.
            Dichos cambios serán aplicables únicamente a proyectos nuevos o a proyectos vigentes, siempre que el cliente sea informado de manera previa y expresa.</p>
            <p>El uso continuo de los servicios de Nuvem, posterior a la notificación de dichas modificaciones, implicará la aceptación de los términos actualizados.</p>
          </section>

          {/* 18 */}
          <section id="jurisdiccion" className="terminos__section">
            <h2>18. Jurisdicción</h2>
            <p>Estos Términos y Condiciones se rigen bajo las leyes de los Estados Unidos Mexicanos.</p>
            <p>Cualquier controversia será atendida conforme a la legislación vigente.</p>
          </section>
        </article>

        {/* ÍNDICE DERECHO (DESKTOP intacto) */}
        <aside className="terminos__index" aria-label="Índice">
          <nav
            className="terminos__nav"
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

      {/* ✅ BOTÓN TOC (solo se verá en responsive por CSS) */}
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