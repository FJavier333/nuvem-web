import "./ComoTrabajamos.css";

export default function ComoTrabajamos() {
  return (
    <main className="comoTrabajamos" aria-label="Cómo trabajamos — Nuvem">
      <div className="comoTrabajamos__container">
        <article className="comoTrabajamos__content">
          <header className="comoTrabajamos__head">
            <h1 className="comoTrabajamos__title">¿CÓMO TRABAJAMOS?</h1>
            {/*
            <p className="comoTrabajamos__subtitle">
              <em>© nuvemstudio.com - Desarrollo Web y Soluciones Digitales.</em>
            </p>
             */} 
            <p className="comoTrabajamos__meta">Documento informativo — Proceso de trabajo</p>
          </header>

          <p className="comoTrabajamos__intro">
            En Nuvem, cada proyecto se desarrolla de forma personalizada y bajo un proceso
            claro. No utilizamos soluciones automáticas ni plantillas genéricas. El objetivo
            es construir sitios web bien pensados, funcionales y alineados a lo que cada
            cliente realmente necesita.
          </p>

          <div className="comoTrabajamos__divider" aria-hidden="true" />

          {/* 1 */}
          <section className="comoTrabajamos__section">
            <h2>PRIMER CONTACTO</h2>
            <p>
              El proceso inicia cuando el cliente se pone en contacto con Nuvem y nos comparte
              su idea, necesidad o proyecto. En esta etapa se entiende el objetivo general del
              sitio y el contexto en el que será utilizado.
            </p>
          </section>

          <div className="comoTrabajamos__divider" aria-hidden="true" />

          {/* 2 */}
          <section className="comoTrabajamos__section">
            <h2>DEFINICIÓN DEL ENFOQUE Y DISEÑO</h2>
            <p>
              Si el cliente cuenta con una idea clara de diseño, referencias, colores o estilo,
              estos lineamientos se toman como base para el desarrollo. Si no existe una definición
              previa, Nuvem propone una dirección visual y estructural acorde al proyecto.
            </p>
            <p>
              El diseño no se basa en tendencias pasajeras, sino en criterios de claridad,
              funcionalidad y coherencia.
            </p>
          </section>

          <div className="comoTrabajamos__divider" aria-hidden="true" />

          {/* 3 */}
          <section className="comoTrabajamos__section">
            <h2>DESARROLLO DEL PROYECTO</h2>
            <p>
              Una vez definido el enfoque, se inicia el desarrollo del sitio. Durante esta etapa
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
          <section className="comoTrabajamos__section">
            <h2>REVISIÓN Y ENTREGA</h2>
            <p>
              Al finalizar el desarrollo, el sitio se revisa y se presenta al cliente para su
              validación. Se verifican funcionamiento, estructura y coherencia con lo acordado
              desde el inicio.
            </p>
            <p>
              Si se detectan errores técnicos derivados del desarrollo, estos se corrigen sin costo.
              Las solicitudes que impliquen cambios fuera de lo acordado se evalúan y, en su caso,
              se cotizan como servicios adicionales.
            </p>
          </section>

          <div className="comoTrabajamos__divider" aria-hidden="true" />

          {/* 5 */}
          <section className="comoTrabajamos__section">
            <h2>DOMINIO Y PUBLICACIÓN</h2>
            <p>El dominio del sitio siempre pertenece al cliente.</p>
            <p>
              Si el cliente ya cuenta con un dominio, este se utiliza para la publicación. En caso
              contrario, el dominio puede adquirirse con los datos y medios de pago del cliente, ya
              sea de forma directa o con apoyo técnico de Nuvem.
            </p>
            <p>
              El sitio se publica con el dominio correspondiente y el cliente conserva el control
              total de su marca, contenido e información.
            </p>
          </section>

          <div className="comoTrabajamos__divider" aria-hidden="true" />

          {/* 6 */}
          <section className="comoTrabajamos__section">
            <h2>ENTREGA FINAL Y ACCESOS</h2>
            <p>
              Al concluir el proyecto, el cliente recibe acceso completo a su sitio web y a la
              información relacionada con su operación.
            </p>
            <p>
              Nuvem conserva la propiedad de las estructuras técnicas internas, código reutilizable,
              configuraciones y herramientas utilizadas durante el desarrollo.
            </p>
            <p>
              Este esquema permite proteger la propiedad intelectual de Nuvem y, al mismo tiempo,
              garantizar al cliente un sitio funcional y completamente operativo.
            </p>
          </section>

          <div className="comoTrabajamos__divider" aria-hidden="true" />

          {/* 7 */}
          <section className="comoTrabajamos__section">
            <h2>CONTINUIDAD</h2>
            <p>
              Una vez entregado el proyecto, el cliente puede decidir si requiere soporte,
              mantenimiento o evolución del sitio a futuro. Estos servicios se ofrecen de forma
              independiente, según las necesidades del proyecto.
            </p>
          </section>

          <div className="comoTrabajamos__divider" aria-hidden="true" />

          {/* cierre */}
          <section className="comoTrabajamos__section comoTrabajamos__section--closing">
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
