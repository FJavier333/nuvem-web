import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useRevealCascade from "../../hooks/useRevealCascade";
import "./Privacidad.css";

const sections = [
  { id: "responsable", title: "1. Identidad del responsable" },
  { id: "datos", title: "2. Datos personales que podemos tratar" },
  { id: "finalidades", title: "3. Finalidades del tratamiento" },
  { id: "portafolio", title: "4. Portafolio y testimonios" },
  { id: "sitio", title: "5. Sitio web y servicios externos" },
  { id: "clientes", title: "6. Datos tratados por cuenta de clientes" },
  { id: "conservacion", title: "7. Conservación y eliminación" },
  { id: "seguridad", title: "8. Seguridad y confidencialidad" },
  { id: "arco", title: "9. Derechos ARCO" },
  { id: "revocacion", title: "10. Revocación y limitación" },
  { id: "cambios", title: "11. Cambios al Aviso de Privacidad" },
  { id: "contacto", title: "12. Contacto" },
];

export default function Privacidad() {
  const [active, setActive] = useState(sections[0].id);
  const revealRootRef = useRevealCascade();

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
    <main
      className="privacidad"
      aria-label="Aviso de Privacidad de Nuvem"
      ref={revealRootRef}
    >
      <div className="privacidad__container">
        {/* CONTENIDO */}
        <article className="privacidad__content">
          <header className="privacidad__head">
            <h1 className="privacidad__title" data-reveal>
              AVISO DE PRIVACIDAD
            </h1>

            <p className="privacidad__subtitle" data-reveal data-reveal-delay="1">
              <em>Nuvem — Estudio de desarrollo digital</em>
            </p>

            <p className="privacidad__meta" data-reveal data-reveal-delay="2">
              <strong>Versión:</strong> 1.0
            </p>
            <p className="privacidad__meta" data-reveal data-reveal-delay="3">
              <strong>Fecha de entrada en vigor:</strong> 02 de Septiembre de 2026
            </p>
          </header>

          {/* 1 */}
          <section id="responsable" className="privacidad__section">
            <div className="privacidad__sectionReveal" data-reveal>
              <h2>1. Identidad del responsable</h2>
              <p>
                <strong>Francisco Javier Blas Aceves</strong>, quien opera bajo la marca{" "}
                <strong>Nuvem</strong>, es responsable del tratamiento de los datos personales
                descritos en este Aviso de Privacidad.
              </p>
              <p>
                Para efectos del presente Aviso, se utilizará el nombre <strong>“Nuvem”</strong>{" "}
                para hacer referencia a la operación realizada bajo dicha marca.
              </p>
              <p>
                <strong>Domicilio:</strong>
                <br />
                Ciudad Nicolás Romero, Estado de México, México.
              </p>
              <p>
                <strong>Correo de privacidad y derechos ARCO:</strong>
                <br />
                <a href="mailto:blacfjba3@gmail.com">blacfjba3@gmail.com</a>
              </p>
              <p>Las solicitudes relacionadas con datos personales son atendidas directamente por el responsable.</p>
            </div>
          </section>

          {/* 2 */}
          <section id="datos" className="privacidad__section">
            <div className="privacidad__sectionReveal" data-reveal data-reveal-delay="1">
              <h2>2. Datos personales que podemos tratar</h2>
              <p>
                Dependiendo de la forma en que una persona se relacione con Nuvem y de las
                necesidades de cada proyecto, podemos tratar:
              </p>
              <ul className="privacidad__list">
                <li>nombre;</li>
                <li>número telefónico o asociado a WhatsApp;</li>
                <li>correo electrónico;</li>
                <li>nombre del negocio o empresa, cuando corresponda;</li>
                <li>información proporcionada al solicitar información o una cotización;</li>
                <li>descripción, necesidades y requerimientos de un proyecto;</li>
                <li>comunicaciones, revisiones y validaciones relacionadas con el servicio;</li>
                <li>
                  archivos proporcionados para el proyecto, como logotipos, fotografías,
                  textos, documentos y otros recursos;
                </li>
                <li>comprobantes, referencias u otra información necesaria para administrar pagos;</li>
                <li>información necesaria para atender solicitudes relacionadas con datos personales.</li>
              </ul>
              <p>
                Cuando sea estrictamente necesario para desarrollar, implementar, mantener,
                migrar o dar soporte a un proyecto, Nuvem también puede recibir accesos o
                credenciales de servicios, plataformas o infraestructura del cliente.
              </p>
              <p>
                Nuvem procura solicitar únicamente la información razonablemente necesaria
                para cada finalidad.
              </p>

              <h3>Accesos y credenciales</h3>
              <p>Cuando un proyecto requiera accesos técnicos:</p>
              <ul className="privacidad__list">
                <li>se solicitarán únicamente los necesarios;</li>
                <li>se utilizarán exclusivamente para las actividades autorizadas;</li>
                <li>
                  se preferirán cuentas individuales, roles, invitaciones, accesos temporales
                  o permisos delegados cuando sea posible;
                </li>
                <li>
                  se evitará solicitar contraseñas principales cuando exista una alternativa
                  razonable;
                </li>
                <li>
                  no se conservarán accesos únicamente porque pudieran resultar útiles
                  posteriormente.
                </li>
              </ul>
              <p>
                Cuando un acceso deje de ser necesario, Nuvem dejará de utilizarlo y eliminará
                las credenciales que hubiera conservado para el proyecto cuando corresponda.
                Si existe soporte o mantenimiento posterior que requiera dicho acceso, podrá
                mantenerse mientras subsistan esa necesidad y autorización.
              </p>
              <p>
                Siempre que sea razonablemente posible, las cuentas principales de dominio,
                alojamiento, infraestructura y servicios externos permanecerán bajo control
                del cliente.
              </p>

              <h3>Datos financieros o patrimoniales</h3>
              <p>
                Nuvem puede recibir comprobantes o referencias relacionadas con pagos por sus
                servicios y limitará su tratamiento a lo necesario para comprobar o administrar
                dichos pagos.
              </p>
              <p>
                Nuvem no solicita contraseñas bancarias, NIP, CVV ni claves de acceso a
                servicios financieros.
              </p>
              <p>
                Cuando el tratamiento de datos financieros o patrimoniales requiera
                consentimiento expreso conforme a la legislación aplicable, éste será
                solicitado por el medio correspondiente.
              </p>

              <h3>Datos personales sensibles</h3>
              <p>
                Nuvem no solicita datos personales sensibles como parte ordinaria de sus
                procesos de contacto, cotización o contratación.
              </p>
              <p>
                Si una persona proporciona voluntariamente información sensible que no resulte
                necesaria, Nuvem procurará no utilizarla y adoptará las medidas razonables que
                correspondan para limitar su tratamiento. Cuando resulte necesario tratar datos
                sensibles, se solicitará el consentimiento correspondiente conforme a la
                legislación aplicable.
              </p>
            </div>
          </section>

          {/* 3 */}
          <section id="finalidades" className="privacidad__section">
            <div className="privacidad__sectionReveal" data-reveal data-reveal-delay="2">
              <h2>3. Finalidades del tratamiento</h2>
              <p>Nuvem puede utilizar los datos personales para:</p>
              <ul className="privacidad__list">
                <li>responder solicitudes de contacto, información o cotización;</li>
                <li>comunicarse con personas interesadas, clientes o representantes;</li>
                <li>dar seguimiento razonable a solicitudes, cotizaciones y proyectos;</li>
                <li>comprender las necesidades y requerimientos de un proyecto;</li>
                <li>analizar su viabilidad técnica y operativa;</li>
                <li>preparar y administrar propuestas, cotizaciones y acuerdos;</li>
                <li>
                  desarrollar, implementar, entregar, mantener, migrar o dar soporte a los
                  servicios contratados;
                </li>
                <li>administrar archivos, recursos y accesos necesarios para el proyecto;</li>
                <li>gestionar revisiones, validaciones, incidencias y soporte;</li>
                <li>comprobar y administrar pagos;</li>
                <li>mantener la documentación necesaria de la relación comercial o contractual;</li>
                <li>atender solicitudes relacionadas con datos personales;</li>
                <li>cumplir obligaciones legales o requerimientos de autoridad competente;</li>
                <li>ejercer o defender derechos relacionados con una contratación o proyecto.</li>
              </ul>
              <p>
                Los datos obtenidos a través de solicitudes, cotizaciones o proyectos{" "}
                <strong>no se utilizan automáticamente para campañas publicitarias posteriores</strong>.
              </p>
              <p>
                Si Nuvem incorpora en el futuro finalidades adicionales que requieran
                consentimiento, se informará y solicitará la autorización correspondiente antes
                de realizar dicho tratamiento.
              </p>
            </div>
          </section>

          {/* 4 */}
          <section id="portafolio" className="privacidad__section">
            <div className="privacidad__sectionReveal" data-reveal data-reveal-delay="3">
              <h2>4. Portafolio y testimonios</h2>
              <p>
                La contratación de Nuvem <strong>no autoriza automáticamente</strong> la
                publicación de un proyecto en nuestro portafolio.
              </p>
              <p>
                Cuando Nuvem desee mostrar de manera identificable un proyecto, cliente, marca,
                logotipo, captura, fotografía o testimonio, solicitará una autorización adecuada
                para los elementos que se pretendan utilizar.
              </p>
              <p>La autorización de un elemento no implica necesariamente la autorización de otros.</p>
              <p>
                Nuvem no publicará deliberadamente credenciales, información confidencial ni
                datos personales de terceros simplemente porque exista autorización para mostrar
                un proyecto.
              </p>
              <p>
                Cuando una captura o demostración pueda exponer información de terceros, se
                utilizarán, cuando corresponda, datos ficticios, anonimizados o material preparado
                específicamente para demostración.
              </p>
              <p>
                Negarse a participar en el portafolio o proporcionar un testimonio no afectará el
                precio, calidad, soporte ni prestación del servicio contratado.
              </p>
            </div>
          </section>

          {/* 5 */}
          <section id="sitio" className="privacidad__section">
            <div className="privacidad__sectionReveal" data-reveal data-reveal-delay="4">
              <h2>5. Sitio web y servicios externos</h2>
              <p>
                El sitio web de Nuvem se encuentra alojado en <strong>Vercel</strong> y
                determinados recursos de video son proporcionados mediante{" "}
                <strong>Vercel Blob</strong>.
              </p>
              <p>
                Como parte del funcionamiento normal de Internet y de la infraestructura
                utilizada para entregar el sitio, estos servicios pueden procesar información
                técnica como dirección IP, fecha y hora de una solicitud, recurso solicitado e
                información básica del navegador o dispositivo.
              </p>
              <p>Actualmente:</p>
              <ul className="privacidad__list">
                <li>Vercel Web Analytics se encuentra desactivado;</li>
                <li>Speed Insights no está implementado;</li>
                <li>no existen integraciones adicionales de Vercel instaladas;</li>
                <li>el sitio no utiliza formularios para recibir datos personales;</li>
                <li>no utiliza píxeles publicitarios;</li>
                <li>no utiliza CAPTCHA;</li>
                <li>no utiliza un CRM o base de datos conectada al sitio para almacenar contactos;</li>
                <li>Nuvem no utiliza actualmente cookies propias con fines analíticos o publicitarios.</li>
              </ul>
              <p>
                Para comunicación con clientes y personas interesadas, Nuvem utiliza actualmente{" "}
                <strong>Gmail</strong> y <strong>WhatsApp</strong>. Cuando una persona utiliza
                estos servicios, sus proveedores también pueden tratar información de acuerdo con
                sus propias políticas y condiciones.
              </p>
              <p>
                Las conversaciones y contactos pueden permanecer en Gmail y WhatsApp mientras
                resulte razonablemente necesario para dar seguimiento a la interacción, mantener
                evidencia de la relación o cumplir obligaciones aplicables.
              </p>
              <p>Nuvem <strong>no vende datos personales</strong>.</p>
              <p>
                Si en el futuro se incorporan formularios, analítica, cookies, píxeles, CRM u otras
                tecnologías que modifiquen de manera relevante el tratamiento de datos personales,
                este Aviso será revisado y actualizado cuando corresponda.
              </p>
            </div>
          </section>

          {/* 6 */}
          <section id="clientes" className="privacidad__section">
            <div className="privacidad__sectionReveal" data-reveal>
              <h2>6. Datos tratados por cuenta de clientes</h2>
              <p>
                En determinados proyectos, Nuvem puede necesitar acceso a datos personales
                contenidos en sistemas, aplicaciones, plataformas, archivos o bases de datos
                pertenecientes a un cliente.
              </p>
              <p>
                Estos datos <strong>no se convierten en datos propios de Nuvem</strong> por el
                hecho de que Nuvem desarrolle, implemente o dé soporte al proyecto.
              </p>
              <p>Cuando Nuvem trate datos personales por cuenta de un cliente:</p>
              <ul className="privacidad__list">
                <li>limitará su acceso a lo necesario para el servicio;</li>
                <li>los utilizará únicamente para las actividades acordadas;</li>
                <li>no adquirirá derechos de propiedad sobre ellos;</li>
                <li>no los reutilizará para finalidades propias;</li>
                <li>no los utilizará para marketing ni los comercializará;</li>
                <li>mantendrá su confidencialidad;</li>
                <li>aplicará medidas razonables de seguridad.</li>
              </ul>
              <p>
                Cuando por la naturaleza del proyecto resulte necesario establecer condiciones
                específicas para dicho tratamiento, éstas podrán documentarse mediante el
                contrato, propuesta, acuerdo o anexo correspondiente.
              </p>
            </div>
          </section>

          {/* 7 */}
          <section id="conservacion" className="privacidad__section">
            <div className="privacidad__sectionReveal" data-reveal data-reveal-delay="1">
              <h2>7. Conservación y eliminación</h2>
              <p>
                Nuvem conserva la información únicamente durante el tiempo razonablemente
                necesario atendiendo a la finalidad para la que fue obtenida, la relación con la
                persona o cliente y las obligaciones aplicables.
              </p>
              <p>Por ello, los periodos pueden variar según se trate de:</p>
              <ul className="privacidad__list">
                <li>consultas o conversaciones;</li>
                <li>cotizaciones y propuestas;</li>
                <li>documentación de proyectos;</li>
                <li>archivos proporcionados por clientes;</li>
                <li>comprobantes de pago;</li>
                <li>accesos y credenciales;</li>
                <li>solicitudes relacionadas con privacidad;</li>
                <li>autorizaciones de portafolio o testimonios.</li>
              </ul>
              <p>
                Nuvem procurará no conservar copias innecesarias de archivos o credenciales
                cuando hayan dejado de ser necesarias para el proyecto, soporte, mantenimiento,
                cumplimiento de obligaciones o defensa de derechos.
              </p>
              <p>Cuando proceda legalmente, los datos podrán quedar sujetos a un periodo de bloqueo antes de su eliminación.</p>
            </div>
          </section>

          {/* 8 */}
          <section id="seguridad" className="privacidad__section">
            <div className="privacidad__sectionReveal" data-reveal data-reveal-delay="2">
              <h2>8. Seguridad y confidencialidad</h2>
              <p>
                Nuvem adopta medidas administrativas, técnicas y físicas razonables y
                proporcionales a la naturaleza de los datos, las finalidades de su tratamiento y
                los riesgos previsibles.
              </p>
              <p>
                Estas medidas buscan proteger los datos personales contra daño, pérdida,
                alteración, destrucción, uso, acceso o tratamiento no autorizado.
              </p>
              <p>
                El acceso a información personal se limita a las personas o proveedores que
                razonablemente lo necesiten para cumplir las finalidades correspondientes.
              </p>
              <p>
                Ningún sistema informático puede considerarse completamente invulnerable, por lo
                que estas medidas no constituyen una garantía absoluta de que nunca pueda
                producirse un incidente de seguridad.
              </p>
              <p>Ante un incidente relacionado con datos personales, Nuvem procurará:</p>
              <ol className="privacidad__list">
                <li>contener el incidente;</li>
                <li>determinar qué ocurrió y qué información puede estar afectada;</li>
                <li>documentar las actuaciones realizadas;</li>
                <li>corregir la causa cuando dependa de Nuvem;</li>
                <li>realizar las comunicaciones que resulten legalmente necesarias.</li>
              </ol>
              <p>
                Cuando una vulneración afecte de forma significativa los derechos patrimoniales
                o morales de las personas titulares, Nuvem realizará las comunicaciones que
                correspondan conforme a la legislación aplicable.
              </p>
            </div>
          </section>

          {/* 9 */}
          <section id="arco" className="privacidad__section">
            <div className="privacidad__sectionReveal" data-reveal data-reveal-delay="3">
              <h2>9. Derechos ARCO</h2>
              <p>La persona titular de los datos, o su representante legal, puede ejercer sus derechos de:</p>
              <p>
                <strong>Acceso:</strong> conocer los datos personales que Nuvem conserva y las
                condiciones generales de su tratamiento.
              </p>
              <p>
                <strong>Rectificación:</strong> solicitar la corrección de datos inexactos,
                incompletos o desactualizados.
              </p>
              <p>
                <strong>Cancelación:</strong> solicitar la cancelación de datos cuando resulte
                legalmente procedente.
              </p>
              <p>
                <strong>Oposición:</strong> solicitar el cese de un tratamiento en los supuestos
                reconocidos por la legislación aplicable.
              </p>
              <h3>¿Cómo ejercerlos?</h3>
              <p>
                La solicitud deberá enviarse a:
              </p>
              <p>
                <strong>Correo:</strong>{" "}
                <a href="mailto:blacfjba3@gmail.com">blacfjba3@gmail.com</a>
                <br />
                <strong>Asunto sugerido:</strong> Solicitud ARCO
              </p>
              <p>La solicitud deberá contener:</p>
              <ol className="privacidad__list">
                <li>nombre de la persona titular y un medio para recibir notificaciones;</li>
                <li>
                  información o documentación suficiente para acreditar su identidad y, cuando
                  corresponda, la identidad y representación de quien actúe en su nombre;
                </li>
                <li>descripción clara de los datos personales relacionados con la solicitud;</li>
                <li>derecho ARCO que desea ejercer o aquello que solicita;</li>
                <li>cualquier elemento que facilite la localización de los datos.</li>
              </ol>
              <p>
                En solicitudes de rectificación deberán indicarse las modificaciones solicitadas
                y proporcionarse la documentación que las sustente.
              </p>
              <p>
                Nuvem comunicará la determinación adoptada en un plazo máximo de{" "}
                <strong>20 días hábiles</strong> contados desde la recepción de la solicitud. Si
                resulta procedente, ésta se hará efectiva dentro de los{" "}
                <strong>15 días hábiles siguientes</strong> a la comunicación de la respuesta.
              </p>
              <p>
                Estos plazos podrán ampliarse una sola vez por un periodo igual cuando las
                circunstancias del caso lo justifiquen.
              </p>
              <p>
                El ejercicio de los derechos ARCO es gratuito, salvo los costos de reproducción,
                envío o entrega que legalmente puedan corresponder.
              </p>
            </div>
          </section>

          {/* 10 */}
          <section id="revocacion" className="privacidad__section">
            <div className="privacidad__sectionReveal" data-reveal data-reveal-delay="4">
              <h2>10. Revocación y limitación</h2>
              <p>
                Cuando corresponda, una persona puede solicitar la revocación de su consentimiento
                o la limitación del uso o divulgación de sus datos personales.
              </p>
              <p>La solicitud puede enviarse a:</p>
              <p>
                <strong>Correo:</strong>{" "}
                <a href="mailto:blacfjba3@gmail.com">blacfjba3@gmail.com</a>
                <br />
                <strong>Asunto sugerido:</strong> Revocación o limitación de datos personales
              </p>
              <p>
                Deberá indicar los datos o tratamiento involucrados y proporcionar la información
                necesaria para identificar a la persona solicitante y atender su petición.
              </p>
              <p>
                La revocación no tendrá efectos retroactivos y no implicará necesariamente la
                eliminación inmediata de información que deba conservarse para cumplir
                obligaciones, atender responsabilidades o ejercer y defender derechos.
              </p>
            </div>
          </section>

          {/* 11 */}
          <section id="cambios" className="privacidad__section">
            <div className="privacidad__sectionReveal" data-reveal>
              <h2>11. Cambios al Aviso de Privacidad</h2>
              <p>
                Nuvem puede actualizar este Aviso cuando cambien su operación, proveedores,
                tecnologías, finalidades del tratamiento o las disposiciones aplicables.
              </p>
              <p>
                La versión vigente estará disponible en esta misma página e indicará su número y
                fecha de entrada en vigor.
              </p>
              <p>
                Cuando un cambio implique una nueva finalidad o tratamiento que requiera
                consentimiento, Nuvem solicitará la autorización correspondiente antes de
                realizarlo cuando así resulte aplicable.
              </p>
            </div>
          </section>

          {/* 12 */}
          <section id="contacto" className="privacidad__section">
            <div className="privacidad__sectionReveal" data-reveal data-reveal-delay="1">
              <h2>12. Contacto</h2>
              <p>
                Para cualquier consulta relacionada con este Aviso de Privacidad, el tratamiento
                de datos personales, derechos ARCO, revocación o limitación, puede utilizarse el
                siguiente medio:
              </p>
              <p>
                <strong>Responsable:</strong> Francisco Javier Blas Aceves, quien opera bajo la
                marca Nuvem
                <br />
                <strong>Correo electrónico:</strong>{" "}
                <a href="mailto:blacfjba3@gmail.com">blacfjba3@gmail.com</a>
                <br />
                <strong>Domicilio:</strong> Ciudad Nicolás Romero, Estado de México, México.
              </p>
              <p>
                <strong>Versión 1.0 — Entrada en vigor: 02 de Septiembre de 2026</strong>
              </p>
            </div>
          </section>
        </article>

        {/* ÍNDICE DERECHO */}
        <aside
          className="privacidad__index"
          aria-label="Índice"
          data-reveal
          data-reveal-delay="1"
        >
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
