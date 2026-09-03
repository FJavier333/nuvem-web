import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useRevealCascade from "../../hooks/useRevealCascade";
import "./Terminos.css";

const sections = [
  { id: "objeto", title: "1. Objeto y aplicación" },
  { id: "propuesta", title: "2. Propuesta y aceptación" },
  { id: "alcance", title: "3. Alcance del proyecto" },
  { id: "responsabilidades-cliente", title: "4. Responsabilidades del cliente" },
  { id: "responsabilidades-nuvem", title: "5. Responsabilidades de Nuvem" },
  { id: "calendario", title: "6. Calendario y retrasos" },
  { id: "diseno-revisiones", title: "7. Diseño, avances y revisiones" },
  { id: "entrega-implementacion", title: "8. Entrega e implementación" },
  { id: "pagos", title: "9. Pagos" },
  { id: "cancelacion-terminacion", title: "10. Cancelación y terminación anticipada" },
  { id: "propiedad-intelectual", title: "11. Propiedad intelectual" },
  { id: "terceros", title: "12. Software y servicios de terceros" },
  { id: "dominio-infraestructura", title: "13. Dominio, infraestructura y cuentas" },
  { id: "informacion-confidencialidad", title: "14. Información, credenciales y confidencialidad" },
  { id: "seguridad", title: "15. Seguridad" },
  { id: "soporte-inicial", title: "16. Soporte inicial y corrección de defectos" },
  { id: "mantenimiento-respaldos", title: "17. Mantenimiento, evolución y respaldos" },
  { id: "uso-proyecto", title: "18. Uso del proyecto" },
  { id: "responsabilidad", title: "19. Responsabilidad" },
  { id: "cambios-terminos", title: "20. Cambios a estos Términos" },
  { id: "legislacion-diferencias", title: "21. Legislación y solución de diferencias" },
  { id: "contacto", title: "22. Contacto" },
];

export default function Terminos() {
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
    <main
      className="terminos"
      aria-label="Términos y Condiciones de Nuvem"
      ref={revealRootRef}
    >
      <div className="terminos__container">
        {/* CONTENIDO */}
        <article className="terminos__content">
          <header className="terminos__head">
            <h1 className="terminos__title" data-reveal>
              TÉRMINOS Y CONDICIONES
            </h1>

            <p className="terminos__subtitle" data-reveal data-reveal-delay="1">
              <em>Nuvem — Estudio de desarrollo digital</em>
            </p>

            <p className="terminos__meta" data-reveal data-reveal-delay="2">
              Versión: 1.0
            </p>
            <p className="terminos__meta" data-reveal data-reveal-delay="3">
              Fecha de entrada en vigor: 02 de Septiembre de 2026
            </p>
          </header>

          {/* 1 */}
          <section id="objeto" className="terminos__section">
            <div className="terminos__sectionReveal" data-reveal>
              <h2>1. Objeto y aplicación</h2>
              <p>
                Los presentes Términos y Condiciones regulan la contratación de servicios de
                diseño, desarrollo, implementación, mantenimiento y demás trabajos digitales
                realizados por Francisco Javier Blas Aceves, quien opera bajo la marca Nuvem, en
                adelante, “Nuvem”.
              </p>
              <p>
                Los servicios pueden comprender, según cada contratación, sitios web, aplicaciones
                web, software a medida, sistemas, herramientas administrativas, automatizaciones,
                integraciones, catálogos digitales y otros proyectos definidos conforme a las
                necesidades del cliente.
              </p>
              <p>
                Cada proyecto estará sujeto al alcance, precio, forma de pago, calendario,
                entregables y demás condiciones particulares establecidos en la cotización,
                propuesta, contrato o acuerdo correspondiente.
              </p>
              <p>Estos Términos complementan dichas condiciones particulares y no limitan derechos que legalmente correspondan al cliente.</p>
            </div>
          </section>

          {/* 2 */}
          <section id="propuesta" className="terminos__section">
            <div className="terminos__sectionReveal" data-reveal data-reveal-delay="1">
              <h2>2. Propuesta y aceptación</h2>
              <p>
                Antes de iniciar un proyecto, Nuvem proporcionará al cliente una cotización,
                propuesta, contrato u otro documento equivalente que describa las condiciones
                específicas aplicables.
              </p>
              <p>
                La contratación podrá aceptarse mediante firma, correo electrónico, mensajería u
                otro medio que permita identificar razonablemente la aceptación del cliente.
              </p>
              <p>
                Cuando exista un pago inicial, Nuvem podrá comenzar el trabajo una vez recibido
                dicho pago y aceptadas las condiciones correspondientes.
              </p>
              <p>Nuvem procurará conservar evidencia de la propuesta presentada y de su aceptación.</p>
              <p>
                En caso de existir condiciones específicas acordadas posteriormente por ambas
                partes para un proyecto, éstas prevalecerán sobre las condiciones generales
                únicamente respecto de aquello que regulen expresamente.
              </p>
            </div>
          </section>

          {/* 3 */}
          <section id="alcance" className="terminos__section">
            <div className="terminos__sectionReveal" data-reveal data-reveal-delay="2">
              <h2>3. Alcance del proyecto</h2>
              <p>Nuvem desarrollará el trabajo descrito en la propuesta aceptada.</p>
              <p>Según el proyecto, el alcance puede establecer:</p>
              <ul className="terminos__list">
                <li>funcionalidades;</li>
                <li>diseño o interfaz;</li>
                <li>entregables;</li>
                <li>integraciones;</li>
                <li>configuraciones;</li>
                <li>implementación;</li>
                <li>documentación;</li>
                <li>carga o migración de información;</li>
                <li>exclusiones;</li>
                <li>dependencias;</li>
                <li>calendario;</li>
                <li>revisiones;</li>
                <li>criterios de entrega.</li>
              </ul>
              <p>
                Una referencia general al objetivo del proyecto no implica que estén incluidas
                funcionalidades, entregables o servicios que no hayan sido acordados.
              </p>
              <p>
                Si durante el desarrollo el cliente solicita una modificación o trabajo adicional
                fuera del alcance, Nuvem informará, cuando corresponda, su efecto sobre precio,
                calendario o entregables antes de realizarlo.
              </p>
              <p>El trabajo adicional deberá ser aprobado por el cliente.</p>
            </div>
          </section>

          {/* 4 */}
          <section id="responsabilidades-cliente" className="terminos__section">
            <div className="terminos__sectionReveal" data-reveal data-reveal-delay="3">
              <h2>4. Responsabilidades del cliente</h2>
              <p>
                Para permitir el desarrollo adecuado del proyecto, el cliente deberá proporcionar
                oportunamente la información, contenidos, materiales, accesos, requerimientos y
                demás recursos necesarios.
              </p>
              <p>
                El cliente será responsable de que los materiales e información que proporcione
                puedan utilizarse legítimamente para el proyecto y de contar con los derechos o
                autorizaciones que correspondan.
              </p>
              <p>También deberá:</p>
              <ul className="terminos__list">
                <li>revisar avances y entregables dentro de los tiempos acordados;</li>
                <li>comunicar observaciones de manera suficientemente clara;</li>
                <li>realizar los pagos correspondientes;</li>
                <li>proteger los accesos que se encuentren bajo su control;</li>
                <li>informar cambios que puedan afectar el proyecto;</li>
                <li>utilizar el resultado conforme a la legislación y condiciones aplicables.</li>
              </ul>
              <p>
                Los retrasos, omisiones o cambios atribuibles al cliente pueden modificar el
                calendario originalmente previsto.
              </p>
            </div>
          </section>

          {/* 5 */}
          <section id="responsabilidades-nuvem" className="terminos__section">
            <div className="terminos__sectionReveal" data-reveal data-reveal-delay="4">
              <h2>5. Responsabilidades de Nuvem</h2>
              <p>Nuvem se compromete a:</p>
              <ul className="terminos__list">
                <li>desarrollar el proyecto conforme al alcance aceptado;</li>
                <li>aplicar criterio técnico y profesional;</li>
                <li>mantener comunicación durante el proceso;</li>
                <li>informar cuando una solicitud pueda alterar significativamente el alcance, precio o calendario;</li>
                <li>proteger razonablemente la información y accesos bajo su control;</li>
                <li>corregir los defectos técnicos atribuibles al desarrollo realizado por Nuvem conforme a estos Términos;</li>
                <li>informar antes de realizar trabajos adicionales que impliquen cargos no contemplados.</li>
              </ul>
              <p>
                Cuando el proyecto incluya diseño, éste se desarrollará conforme a los objetivos,
                requerimientos y referencias acordados.
              </p>
              <p>
                Nuvem no garantiza resultados comerciales específicos, como un determinado nivel
                de ventas, ingresos, posicionamiento, conversiones, tráfico o adopción, ya que éstos
                dependen de factores adicionales al desarrollo contratado.
              </p>
            </div>
          </section>

          {/* 6 */}
          <section id="calendario" className="terminos__section">
            <div className="terminos__sectionReveal" data-reveal>
              <h2>6. Calendario y retrasos</h2>
              <p>Los tiempos estimados o acordados para cada proyecto podrán depender de:</p>
              <ul className="terminos__list">
                <li>entrega de información y materiales;</li>
                <li>revisiones y aprobaciones del cliente;</li>
                <li>cumplimiento de pagos;</li>
                <li>continuidad del alcance;</li>
                <li>disponibilidad de servicios externos;</li>
                <li>circunstancias fuera del control razonable de las partes.</li>
              </ul>
              <p>
                Si una dependencia del cliente impide continuar, Nuvem podrá pausar o reprogramar
                el proyecto previa comunicación.
              </p>
              <p>
                Cuando una pausa prolongada afecte razonablemente la disponibilidad, costos o
                condiciones originales del proyecto, Nuvem informará al cliente cualquier ajuste
                necesario antes de reanudar el trabajo.
              </p>
              <p>Una pausa no implica automáticamente la cancelación del proyecto.</p>
            </div>
          </section>

          {/* 7 */}
          <section id="diseno-revisiones" className="terminos__section">
            <div className="terminos__sectionReveal" data-reveal data-reveal-delay="1">
              <h2>7. Diseño, avances y revisiones</h2>
              <p>
                Cuando el cliente proporcione referencias visuales, colores, lineamientos o
                requerimientos de diseño, éstos serán considerados durante el desarrollo.
              </p>
              <p>
                Si el cliente no cuenta con una definición previa suficiente, Nuvem podrá proponer
                un enfoque funcional, visual y estructural acorde con las necesidades del proyecto.
              </p>
              <p>Las revisiones deberán mantenerse dentro del alcance acordado.</p>
              <p>
                Las nuevas funcionalidades, cambios sustanciales de dirección, rediseños o
                solicitudes que excedan dicho alcance podrán considerarse trabajo adicional y
                cotizarse por separado.
              </p>
            </div>
          </section>

          {/* 8 */}
          <section id="entrega-implementacion" className="terminos__section">
            <div className="terminos__sectionReveal" data-reveal data-reveal-delay="2">
              <h2>8. Entrega e implementación</h2>
              <p>
                La forma de entrega dependerá de la naturaleza del proyecto y podrá comprender
                archivos, código, accesos, publicación, configuración, instalación, despliegue,
                documentación o puesta en funcionamiento.
              </p>
              <p>
                El cliente deberá revisar los entregables y comunicar cualquier diferencia
                razonable respecto del alcance acordado.
              </p>
              <p>
                Una solicitud de nueva funcionalidad, cambio de preferencia o trabajo adicional no
                se considerará por sí misma un defecto del entregable original.
              </p>
              <p>
                Cuando corresponda, la publicación o puesta en funcionamiento se realizará una vez
                cumplidas las condiciones de entrega y pago acordadas.
              </p>
              <p>Al finalizar, Nuvem proporcionará los accesos y elementos correspondientes al alcance contratado.</p>
            </div>
          </section>

          {/* 9 */}
          <section id="pagos" className="terminos__section">
            <div className="terminos__sectionReveal" data-reveal data-reveal-delay="3">
              <h2>9. Pagos</h2>
              <p>La modalidad de pago se establecerá individualmente en cada propuesta y podrá consistir, entre otras posibilidades, en:</p>
              <ul className="terminos__list">
                <li>pago total anticipado;</li>
                <li>anticipo y liquidación;</li>
                <li>esquema dividido;</li>
                <li>pagos por etapas o hitos;</li>
                <li>pagos periódicos.</li>
              </ul>
              <p>Nuvem iniciará el trabajo una vez recibido el pago inicial que corresponda.</p>
              <p>La entrega final podrá condicionarse a la liquidación de los importes acordados.</p>
              <p>
                Los costos de dominio, hosting, infraestructura, licencias, APIs, plataformas u
                otros servicios externos no se consideran incluidos salvo que la propuesta indique
                expresamente lo contrario.
              </p>
              <p>El retraso de un pago podrá provocar la pausa del proyecto previa comunicación al cliente.</p>
              <p>Nuvem no realizará cobros adicionales no acordados previamente.</p>
            </div>
          </section>

          {/* 10 */}
          <section id="cancelacion-terminacion" className="terminos__section">
            <div className="terminos__sectionReveal" data-reveal data-reveal-delay="4">
              <h2>10. Cancelación y terminación anticipada</h2>
              <p>
                Un proyecto podrá terminar por acuerdo entre las partes, decisión del cliente,
                incumplimiento sustancial, imposibilidad razonable de continuar u otra causa
                establecida específicamente para el proyecto.
              </p>
              <p>
                Cuando exista un incumplimiento que pueda corregirse razonablemente, se procurará
                comunicarlo y permitir su corrección antes de terminar la relación.
              </p>
              <p>
                Si el cliente decide cancelar un proyecto ya iniciado, se considerarán el trabajo
                efectivamente realizado, los costos externos o no recuperables y los pagos
                correspondientes a las etapas ejecutadas.
              </p>
              <p>
                Los pagos no se consideran automáticamente no reembolsables. Cuando exista una
                cantidad pagada que exceda razonablemente el trabajo realizado y los costos
                asumidos, se determinará la devolución que corresponda.
              </p>
              <p>
                Si Nuvem no puede continuar un proyecto por una causa atribuible a Nuvem, tampoco
                se considerará automáticamente adquirido el importe total pendiente del proyecto.
              </p>
              <p>
                Una vez cubierto el trabajo realizado, el cliente podrá recibir los entregables
                correspondientes que puedan separarse y utilizarse razonablemente.
              </p>
              <p>El cliente podrá continuar el proyecto con otro proveedor. Nuvem no impedirá artificialmente dicha continuidad.</p>
              <p>
                Si se requiere trabajo adicional para migración, documentación, capacitación o
                transición hacia otro proveedor, podrá cotizarse por separado.
              </p>
            </div>
          </section>

          {/* 11 */}
          <section id="propiedad-intelectual" className="terminos__section">
            <div className="terminos__sectionReveal" data-reveal>
              <h2>11. Propiedad intelectual</h2>
              <h3>Recursos del cliente</h3>
              <p>
                El cliente conserva la titularidad de sus marcas, logotipos, fotografías, textos,
                datos, documentos, software y demás materiales que proporcione.
              </p>
              <p>Su entrega a Nuvem únicamente autoriza su utilización en la medida necesaria para desarrollar el proyecto.</p>

              <h3>Recursos propios y reutilizables de Nuvem</h3>
              <p>
                Nuvem conserva la propiedad de los recursos técnicos desarrollados previamente o
                de manera independiente que pueda integrar en distintos proyectos, incluyendo
                estructuras, componentes, utilidades, configuraciones, herramientas, métodos y
                código reutilizable.
              </p>
              <p>
                La utilización de estos recursos dentro de un proyecto no transfiere al cliente su
                propiedad ni permite extraerlos para venderlos, sublicenciarlos o comercializarlos
                independientemente como propios.
              </p>
              <p>Sin embargo, su integración no impedirá al cliente utilizar normalmente el proyecto entregado.</p>

              <h3>Desarrollo realizado específicamente para el proyecto</h3>
              <p>
                Una vez cumplidas las obligaciones de pago, el cliente podrá utilizar de manera
                indefinida el desarrollo realizado específicamente para su proyecto, operarlo,
                explotarlo para la finalidad contratada, modificarlo y permitir que otros
                profesionales lo mantengan o evolucionen.
              </p>
              <p>Esto permite al cliente continuar trabajando con Nuvem o con otro proveedor.</p>
              <p>
                Estos derechos no convierten en propiedad del cliente los recursos preexistentes de
                Nuvem ni modifican las licencias de componentes pertenecientes a terceros.
              </p>
              <p>
                Cuando por la naturaleza de un proyecto sea necesario establecer condiciones
                especiales de propiedad, licencia, distribución o explotación, éstas se
                especificarán en la propuesta o acuerdo correspondiente.
              </p>
              <p>
                Nuvem podrá continuar utilizando sus conocimientos, experiencia, técnicas y métodos
                generales siempre que no revele información confidencial ni reutilice indebidamente
                elementos exclusivos del cliente.
              </p>
            </div>
          </section>

          {/* 12 */}
          <section id="terceros" className="terminos__section">
            <div className="terminos__sectionReveal" data-reveal data-reveal-delay="1">
              <h2>12. Software y servicios de terceros</h2>
              <p>
                Un proyecto puede utilizar librerías, software de código abierto, APIs, plataformas,
                servicios en la nube u otros recursos pertenecientes a terceros.
              </p>
              <p>Dichos recursos conservarán sus propias licencias, términos y condiciones.</p>
              <p>
                Cuando una dependencia externa implique un costo relevante, contratación
                independiente o condición importante para la operación del proyecto, Nuvem
                procurará comunicarlo al cliente.
              </p>
              <p>Nuvem no puede conceder derechos superiores a los que permita el titular de un recurso de terceros.</p>
              <p>
                Nuvem no será responsable por fallos propios de un proveedor externo o cambios
                posteriores en sus servicios que estén fuera del control razonable de Nuvem.
              </p>
              <p>
                Esta exclusión no aplica cuando el problema sea atribuible a una configuración o
                integración incorrectamente realizada por Nuvem dentro del trabajo contratado.
              </p>
            </div>
          </section>

          {/* 13 */}
          <section id="dominio-infraestructura" className="terminos__section">
            <div className="terminos__sectionReveal" data-reveal data-reveal-delay="2">
              <h2>13. Dominio, infraestructura y cuentas</h2>
              <p>
                Cuando un proyecto requiera dominio, hosting, infraestructura en la nube, APIs,
                licencias u otros servicios externos, se determinará según corresponda quién los
                contrata, quién cubre sus costos y quién conserva su administración.
              </p>
              <p>
                Siempre que sea razonablemente posible, las cuentas esenciales para operar el
                proyecto deberán permanecer bajo control del cliente.
              </p>
              <p>
                Cuando se requiera un dominio y el cliente ya disponga de uno, podrá utilizarse para
                la publicación. Si no cuenta con él, podrá adquirirse con los datos y medios de pago
                del cliente, directamente o con apoyo técnico de Nuvem.
              </p>
              <p>El dominio pertenece al cliente.</p>
              <p>
                Nuvem podrá recibir permisos administrativos o técnicos cuando sean necesarios para
                realizar el trabajo. Esto no convierte a Nuvem en propietario de las cuentas o
                servicios del cliente.
              </p>
              <p>
                Si excepcionalmente un servicio debe ser contratado o administrado directamente por
                Nuvem, dicha condición deberá acordarse específicamente.
              </p>
            </div>
          </section>

          {/* 14 */}
          <section id="informacion-confidencialidad" className="terminos__section">
            <div className="terminos__sectionReveal" data-reveal data-reveal-delay="3">
              <h2>14. Información, credenciales y confidencialidad</h2>
              <p>
                Los datos e información pertenecientes al cliente o a sus usuarios no pasan a ser
                propiedad de Nuvem por utilizarse dentro de un proyecto.
              </p>
              <p>Nuvem accederá a dicha información únicamente en la medida necesaria para prestar los servicios acordados.</p>
              <p>
                Cada parte deberá mantener confidencial la información no pública recibida de la
                otra cuando, por su naturaleza o circunstancias, razonablemente deba considerarse
                confidencial.
              </p>
              <p>
                Nuvem limitará el acceso a dicha información a las personas o proveedores que
                razonablemente lo necesiten para realizar el servicio.
              </p>
              <p>
                Cuando se requieran credenciales, Nuvem solicitará únicamente los accesos necesarios
                y procurará utilizar cuentas individuales, roles, invitaciones o permisos delegados
                cuando sea posible.
              </p>
              <p>
                Los accesos dejarán de utilizarse cuando desaparezca la necesidad que justificaba su
                uso, salvo que exista soporte o mantenimiento posterior que requiera mantenerlos y
                esté autorizado.
              </p>
              <p>
                Cuando Nuvem trate datos personales por cuenta del cliente y la naturaleza del
                proyecto requiera condiciones específicas de tratamiento, éstas podrán establecerse
                mediante un acuerdo o anexo correspondiente.
              </p>
              <p>
                El tratamiento de datos personales realizado directamente por Nuvem en su propia
                operación se describe en su Aviso de Privacidad.
              </p>
            </div>
          </section>

          {/* 15 */}
          <section id="seguridad" className="terminos__section">
            <div className="terminos__sectionReveal" data-reveal data-reveal-delay="4">
              <h2>15. Seguridad</h2>
              <p>
                Nuvem aplicará medidas técnicas y organizativas razonables respecto de la
                información, accesos y sistemas que se encuentren bajo su control.
              </p>
              <p>
                Ningún sistema informático puede considerarse completamente invulnerable, por lo
                que estas medidas no constituyen una garantía absoluta contra cualquier
                vulnerabilidad, acceso no autorizado o incidente.
              </p>
              <p>
                Cada parte será responsable de proteger adecuadamente los accesos que se encuentren
                bajo su control y comunicar oportunamente cualquier incidente relevante del que
                tenga conocimiento.
              </p>
            </div>
          </section>

          {/* 16 */}
          <section id="soporte-inicial" className="terminos__section">
            <div className="terminos__sectionReveal" data-reveal>
              <h2>16. Soporte inicial y corrección de defectos</h2>
              <p>
                Salvo que una propuesta establezca condiciones diferentes, Nuvem incluirá 30 días
                naturales de soporte inicial posteriores a la entrega.
              </p>
              <p>Este periodo estará destinado a:</p>
              <ul className="terminos__list">
                <li>resolver dudas básicas relacionadas con el funcionamiento entregado;</li>
                <li>brindar acompañamiento inicial;</li>
                <li>
                  corregir bugs o defectos técnicos atribuibles al desarrollo realizado por Nuvem
                  respecto de las funcionalidades acordadas.
                </li>
              </ul>
              <p>No se consideran automáticamente incluidos dentro de este soporte:</p>
              <ul className="terminos__list">
                <li>nuevas funcionalidades;</li>
                <li>cambios de diseño o preferencia;</li>
                <li>ampliaciones;</li>
                <li>carga adicional de contenido;</li>
                <li>modificaciones realizadas por el cliente o terceros;</li>
                <li>problemas causados por usos distintos a los acordados;</li>
                <li>fallos propios de servicios externos;</li>
                <li>
                  cambios posteriores en APIs, plataformas, infraestructura, navegadores,
                  sistemas operativos u otros servicios de terceros.
                </li>
              </ul>
              <p>
                Si un problema externo fue causado por una configuración o integración
                incorrectamente realizada por Nuvem, será tratado como una incidencia atribuible a
                Nuvem.
              </p>
              <p>Los tiempos de atención dependerán de la naturaleza de cada incidencia. No existe un SLA o disponibilidad 24/7 salvo que se contrate expresamente.</p>
              <p>Este soporte inicial no sustituye ni limita los derechos o garantías que correspondan legalmente al cliente.</p>
            </div>
          </section>

          {/* 17 */}
          <section id="mantenimiento-respaldos" className="terminos__section">
            <div className="terminos__sectionReveal" data-reveal data-reveal-delay="1">
              <h2>17. Mantenimiento, evolución y respaldos</h2>
              <p>
                Después del soporte inicial, el mantenimiento, monitoreo, actualizaciones, nuevas
                funcionalidades, rediseños y evolución del proyecto no estarán incluidos salvo que
                se hayan contratado expresamente.
              </p>
              <p>El cliente podrá solicitar mantenimiento continuo o trabajos adicionales cuando los necesite.</p>
              <p>
                Nuvem no está obligado a mantener indefinidamente la compatibilidad del proyecto
                frente a cambios posteriores de plataformas, APIs, navegadores, sistemas operativos
                o infraestructura de terceros, salvo que exista un servicio contratado que
                contemple dicha actividad.
              </p>
              <p>Los respaldos tampoco constituyen una obligación permanente de Nuvem salvo que formen parte del servicio contratado.</p>
              <p>
                Cuando un proyecto requiera una política específica de respaldos, recuperación o
                conservación, ésta deberá definirse según las características del servicio.
              </p>
            </div>
          </section>

          {/* 18 */}
          <section id="uso-proyecto" className="terminos__section">
            <div className="terminos__sectionReveal" data-reveal data-reveal-delay="2">
              <h2>18. Uso del proyecto</h2>
              <p>
                Una vez entregado, el cliente será responsable de la operación cotidiana y
                utilización del proyecto, salvo que haya contratado a Nuvem para realizar dichas
                actividades.
              </p>
              <p>
                El proyecto no podrá utilizarse para actividades ilícitas, vulnerar derechos de
                terceros, distribuir código malicioso o realizar accesos no autorizados.
              </p>
              <p>
                Estas restricciones no impiden al cliente utilizar comercialmente su proyecto,
                permitir su uso por empleados, clientes, proveedores o usuarios autorizados,
                contratar a terceros para mantenerlo o continuar desarrollándolo.
              </p>
            </div>
          </section>

          {/* 19 */}
          <section id="responsabilidad" className="terminos__section">
            <div className="terminos__sectionReveal" data-reveal data-reveal-delay="3">
              <h2>19. Responsabilidad</h2>
              <p>
                Nuvem responderá por incumplimientos o problemas que sean razonablemente atribuibles
                al trabajo que haya asumido y realizado.
              </p>
              <p>
                Nuvem no garantiza resultados comerciales específicos ni será responsable de que un
                proyecto alcance determinadas ventas, ingresos, tráfico, posicionamiento o resultados
                de negocio.
              </p>
              <p>Tampoco será responsable por problemas causados exclusivamente por:</p>
              <ul className="terminos__list">
                <li>información incorrecta proporcionada por el cliente;</li>
                <li>modificaciones realizadas posteriormente por el cliente o terceros;</li>
                <li>uso distinto al acordado;</li>
                <li>fallos propios de servicios externos;</li>
                <li>cambios externos fuera del control razonable de Nuvem;</li>
                <li>ausencia de servicios de respaldo o mantenimiento que no hayan sido contratados.</li>
              </ul>
              <p>
                Estas exclusiones no liberan a Nuvem de responsabilidad cuando el problema resulte
                de una actuación, omisión, configuración o integración incorrectamente realizada por
                Nuvem dentro de las obligaciones asumidas.
              </p>
              <p>Nada en estos Términos pretende excluir derechos o responsabilidades que no puedan limitarse conforme a la legislación aplicable.</p>
            </div>
          </section>

          {/* 20 */}
          <section id="cambios-terminos" className="terminos__section">
            <div className="terminos__sectionReveal" data-reveal data-reveal-delay="4">
              <h2>20. Cambios a estos Términos</h2>
              <p>
                Nuvem podrá actualizar estos Términos para reflejar cambios en sus servicios,
                procesos o disposiciones aplicables.
              </p>
              <p>Cada versión identificará su fecha de entrada en vigor.</p>
              <p>Las nuevas versiones se aplicarán a proyectos contratados posteriormente a su entrada en vigor.</p>
              <p>
                La publicación de una nueva versión no modificará unilateralmente las condiciones de
                un proyecto que ya haya sido contratado.
              </p>
              <p>
                Los cambios que afecten derechos u obligaciones de un proyecto vigente deberán ser
                acordados entre las partes cuando corresponda.
              </p>
            </div>
          </section>

          {/* 21 */}
          <section id="legislacion-diferencias" className="terminos__section">
            <div className="terminos__sectionReveal" data-reveal>
              <h2>21. Legislación y solución de diferencias</h2>
              <p>Estos Términos se interpretarán conforme a la legislación aplicable en los Estados Unidos Mexicanos.</p>
              <p>
                Si surge alguna diferencia relacionada con un proyecto, Nuvem y el cliente
                procurarán inicialmente resolverla mediante comunicación directa y de buena fe.
              </p>
              <p>
                Si no fuera posible llegar a una solución, cualquiera de las partes podrá recurrir
                a los mecanismos de conciliación, administrativos o judiciales que legalmente
                correspondan.
              </p>
              <p>
                Cuando el cliente tenga derechos específicos en calidad de consumidor, estos
                Términos no pretenden limitar su ejercicio ante las autoridades competentes.
              </p>
            </div>
          </section>

          {/* 22 */}
          <section id="contacto" className="terminos__section">
            <div className="terminos__sectionReveal" data-reveal data-reveal-delay="1">
              <h2>22. Contacto</h2>
              <p>Para consultas relacionadas con una contratación, proyecto o estos Términos y Condiciones:</p>
              <p>
                Prestador del servicio: Francisco Javier Blas Aceves, quien opera bajo la marca Nuvem
                <br />
                Correo electrónico: blacfjba3@gmail.com
                <br />
                Domicilio: Ciudad Nicolás Romero, Estado de México, México.
              </p>
              <p>Versión 1.0 — Entrada en vigor: 02 de Septiembre de 2026</p>
            </div>
          </section>
        </article>

        {/* ÍNDICE DERECHO (DESKTOP intacto) */}
        <aside
          className="terminos__index"
          aria-label="Índice"
          data-reveal
          data-reveal-delay="1"
        >
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
