import "./QuienesSomos.css";
import logoWorld2 from "../../images/logoWorld5.png";

export default function QuienesSomos() {
  return (
    <main className="quienes" aria-label="¿Quiénes somos?">

      <div className="quienes__container">
        {/* Logo */}
        <header className="quienes__top">
          <img className="quienes__logo" src={logoWorld2} alt="Nuvem" loading="lazy" />
        </header>

        {/* Título + Intro */}
        <section className="quienes__hero" aria-label="Introducción">
          {/*
          <h1 className="quienes__title">¿QUIÉNES SOMOS?</h1>
          */}

          <p className="quienes__lead">
            ©Nuvem es un estudio de desarrollo web fundado en 2024, nos enfocamos en crear soluciones digitales
            profesionales, claras y escalables. Trabajamos con proyectos que requieren algo
            más que una presencia en línea: buscan estructura, criterio y una base sólida para
            crecer a largo plazo.
          </p>

          <p className="quienes__lead">
            Creemos que un sitio web no debe construirse a partir de plantillas genéricas ni
            soluciones automáticas. Cada proyecto tiene un contexto, objetivos y necesidades
            distintas, y por ello debe ser pensado, diseñado y desarrollado de forma personalizada.
          </p>
        </section>

        {/* Secciones (sin glass iOS) */}
        <section className="quienes__sections" aria-label="Secciones">
          <article className="quienes__section">
            <h2 className="quienes__subtitle">NUESTRO ENFOQUE</h2>

            <p className="quienes__text">
              En Nuvem, el desarrollo web es un proceso consciente. Antes de escribir una sola línea
              de código, entendemos el proyecto, analizamos el negocio y definimos una estructura adecuada.
              Las decisiones de diseño y desarrollo no se toman por moda o tendencia, sino en función de la
              claridad, la funcionalidad y la proyección futura del sitio.
            </p>

            <p className="quienes__text">
              Utilizamos tecnología moderna e inteligencia artificial como herramientas de apoyo para optimizar
              procesos y mejorar la eficiencia, siempre bajo supervisión humana. La IA no reemplaza el criterio
              profesional, lo complementa.
            </p>
          </article>

          <article className="quienes__section">
            <h2 className="quienes__subtitle">CRITERIO HUMANO Y RESPONSABILIDAD</h2>

            <p className="quienes__text">
              Detrás de cada proyecto hay una persona responsable que acompaña el proceso completo: desde el
              análisis inicial hasta la entrega final. Esto permite una comunicación directa, decisiones claras
              y un mayor control sobre la calidad del resultado.
            </p>

            <p className="quienes__text">
              No buscamos producir sitios en masa ni entregar soluciones rápidas sin profundidad. Nuestro objetivo
              es construir proyectos bien hechos, con orden, coherencia y responsabilidad técnica.
            </p>
          </article>

          <article className="quienes__section">
            <h2 className="quienes__subtitle">NUESTRA FILOSOFÍA</h2>

            <p className="quienes__text">
              Nuvem trabaja con una visión a largo plazo. Diseñamos y desarrollamos sitios preparados para
              evolucionar, adaptarse y crecer conforme cambian las necesidades de cada proyecto.
            </p>

            <p className="quienes__text">
              Colaboramos con personas y empresas que valoran el proceso, la calidad y la claridad, y que entienden
              su sitio web como una inversión estratégica, no como un simple requisito.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}