import useRevealCascade from "../../hooks/useRevealCascade";
import "./ComoTrabajamos.css";

export default function ComoTrabajamos() {
  const revealRootRef = useRevealCascade();

  return (
    <main
      className="comoTrabajamos"
      aria-label="Cómo trabajamos — Nuvem"
      ref={revealRootRef}
    >
      <div className="comoTrabajamos__container">
        <article className="comoTrabajamos__content">
          <header className="comoTrabajamos__head">
            <h1 className="comoTrabajamos__title" data-reveal>
              ¿CÓMO TRABAJAMOS?
            </h1>
            <p
              className="comoTrabajamos__meta"
              data-reveal
              data-reveal-delay="1"
            >
              Documento informativo — Proceso de trabajo
            </p>
          </header>

          <p className="comoTrabajamos__intro" data-reveal data-reveal-delay="2">
            En Nuvem, cada proyecto se desarrolla de forma personalizada y bajo un proceso
            claro. No utilizamos plantillas genéricas ni fórmulas rápidas. El objetivo es
            desarrollar proyectos bien pensados, funcionales y alineados con lo que cada cliente
            realmente necesita.
          </p>

          <div className="comoTrabajamos__divider" aria-hidden="true" />

          {/* 1 */}
          <section className="comoTrabajamos__section" data-reveal>
            <h2>PRIMER CONTACTO</h2>
            <p>
              El proceso inicia cuando el cliente se pone en contacto con Nuvem y nos comparte
              su idea, necesidad o proyecto. En esta etapa se entienden el objetivo general del
              proyecto y el contexto en el que será utilizado.
            </p>
          </section>

          <div className="comoTrabajamos__divider" aria-hidden="true" />

          {/* 2 */}
          <section
            className="comoTrabajamos__section"
            data-reveal
            data-reveal-delay="1"
          >
            <h2>DEFINICIÓN DEL ENFOQUE Y DISEÑO</h2>
            <p>
              Si el cliente cuenta con requerimientos definidos, referencias de diseño, colores o estilo,
              estos lineamientos se toman como base para el desarrollo. Si no existe una definición previa,
              Nuvem propone un enfoque funcional, visual y estructural acorde a las necesidades del proyecto.
            </p>
            <p>
              El diseño no se basa en tendencias pasajeras, sino en criterios de claridad,
              funcionalidad y coherencia.
            </p>
          </section>

          <div className="comoTrabajamos__divider" aria-hidden="true" />

          {/* 3 */}
          <section
            className="comoTrabajamos__section"
            data-reveal
            data-reveal-delay="2"
          >
            <h2>DESARROLLO DEL PROYECTO</h2>
            <p>
              Una vez definido el enfoque, se inicia el desarrollo del proyecto. Durante esta etapa
              se presentan avances de forma progresiva, permitiendo revisiones y ajustes razonables
              dentro del proceso acordado.
            </p>
            <p>
              Las opciones de cambios están pensadas para mantener orden y eficiencia, evitando
              modificaciones constantes que alteren el alcance original del proyecto.
            </p>
          </section>

          <div className="comoTrabajamos__divider" aria-hidden="true" />

          {/* 4 */}
          <section
            className="comoTrabajamos__section"
            data-reveal
            data-reveal-delay="3"
          >
            <h2>REVISIÓN Y ENTREGA</h2>
            <p>
              Al finalizar el desarrollo, el proyecto se revisa y se presenta al cliente para su validación.
              Se verifican el funcionamiento, la estructura y la coherencia con lo acordado desde el inicio.
            </p>
            <p>
              Si se detectan errores técnicos derivados del desarrollo, estos se corrigen sin costo.
              Las solicitudes que impliquen cambios fuera de lo acordado se evalúan y, en su caso,
              se cotizan como servicios adicionales.
            </p>
          </section>

          <div className="comoTrabajamos__divider" aria-hidden="true" />

          {/* 5 */}
          <section
            className="comoTrabajamos__section"
            data-reveal
            data-reveal-delay="4"
          >
            <h2>IMPLEMENTACIÓN Y PUESTA EN FUNCIONAMIENTO</h2>
            <p>Cuando el proyecto requiere un dominio, este siempre pertenece al cliente.</p>
            <p>
              Si el proyecto requiere un dominio y el cliente ya cuenta con uno, este se utiliza para la
              publicación. En caso contrario, puede adquirirse con los datos y medios de pago del cliente,
              ya sea de forma directa o con apoyo técnico de Nuvem.
            </p>
            <p>
              La publicación, implementación o puesta en funcionamiento se realiza según las características
              del proyecto. El cliente conserva el control total de su marca, contenido e información.
            </p>
          </section>

          <div className="comoTrabajamos__divider" aria-hidden="true" />

          {/* 6 */}
          <section className="comoTrabajamos__section" data-reveal>
            <h2>ENTREGA FINAL Y ACCESOS</h2>
            <p>
              Al concluir el proyecto, el cliente recibe los accesos correspondientes y la información
              necesaria para su operación.
            </p>
            <p>
              Nuvem conserva la propiedad de los recursos técnicos preexistentes que integra al proyecto,
              como estructuras internas, código reutilizable, configuraciones y herramientas de desarrollo.
            </p>
            <p>
              Este esquema permite proteger la propiedad intelectual de Nuvem y, al mismo tiempo,
              entregar al cliente un proyecto funcional y completamente operativo.
            </p>
          </section>

          <div className="comoTrabajamos__divider" aria-hidden="true" />

          {/* 7 */}
          <section
            className="comoTrabajamos__section"
            data-reveal
            data-reveal-delay="1"
          >
            <h2>CONTINUIDAD</h2>
            <p>
              Después del soporte inicial incluido, el cliente puede decidir si requiere soporte
              adicional, mantenimiento o evolución a futuro. Estos servicios se ofrecen de forma
              independiente, según las necesidades del proyecto.
            </p>
          </section>

          <div className="comoTrabajamos__divider" aria-hidden="true" />

          {/* cierre */}
          <section
            className="comoTrabajamos__section comoTrabajamos__section--closing"
            data-reveal
            data-reveal-delay="2"
          >
            <h2>CIERRE</h2>
            <p>
              Nuvem trabaja con un enfoque humano, estructurado y responsable. Cada proyecto se
              desarrolla con criterio, comunicación clara y respeto por el alcance acordado,
              buscando siempre soluciones bien hechas y sostenibles en el tiempo.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
