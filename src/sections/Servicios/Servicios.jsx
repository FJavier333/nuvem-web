import React from "react";
import "./Servicios.css";

// ✅ Ajusta estos nombres a tus archivos reales en src/images
import imgWebs from "../../images/servicios-webs.jpg";
import imgCustom from "../../images/shot-10.jpg";
import imgRedesign from "../../images/servicios-redesign.jpg";
import imgSupport from "../../images/pilar5.3.jpg";

export default function Servicios() {
  const items = [
    {
      title: "SITIOS WEB PROFESIONALES",
      text:
        "Diseñamos y desarrollamos sitios web modernos, claros y funcionales, enfocados en comunicar valor, generar confianza y convertir visitantes en clientes. Pensado para marcas, negocios y profesionales que necesitan una presencia digital seria y bien construida.",
      image: imgWebs,
      alt: "Sitios web profesionales",
    },
    {
      title: "DESARROLLO WEB A MEDIDA",
      text:
        "Creamos soluciones personalizadas cuando un proyecto requiere una estructura específica, funcionalidades particulares o una base sólida para crecer a largo plazo. Ideal para proyectos que buscan escalabilidad y control total.",
      image: imgCustom,
      alt: "Desarrollo web a medida",
    },
    {
      title: "REDISEÑO Y OPTIMIZACIÓN",
      text:
        "Mejoramos sitios existentes que no reflejan correctamente la marca, presentan problemas de claridad, rendimiento o conversión, o simplemente se han quedado atrás. El enfoque es tanto visual como estratégico y técnico.",
      image: imgRedesign,
      alt: "Rediseño y optimización",
    },
    {
      title: "SOPORTE Y EVOLUCIÓN",
      text:
        "Acompañamos proyectos que requieren ajustes, mejoras continuas o crecimiento progresivo, manteniendo siempre coherencia, estabilidad y calidad.",
      image: imgSupport,
      alt: "Soporte y evolución",
    },
  ];

  return (
    <section className="services" id="servicios">
      <div className="services__container">
        <header className="services__header">
          <h2 className="services__title">NUESTRO CATÁLOGO</h2>
          <p className="services__subtitle">
            OFRECEMOS SOLUCIONES CONSTRUIDAS CON CRITERIO, CLARIDAD Y BASE TÉCNICA SÓLIDA.
          </p>
        </header>

        <div className="services__list">
          {items.map((item, idx) => {
            const reversed = idx % 2 !== 0; // ✅ alterna izquierda/derecha
            return (
              <article
                key={item.title}
                className={`serviceItem ${reversed ? "serviceItem--reverse" : ""}`}
              >
                <div className="serviceItem__media">
                  <div className="serviceItem__glow" aria-hidden="true" />
                  <img
                    className="serviceItem__img"
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="serviceItem__content">
                  <h3 className="serviceItem__title">{item.title}</h3>
                  <p className="serviceItem__text">{item.text}</p>
                </div>
              </article>
            );
          })}
        </div>
        <p className="services__notice">
          Todos los servicios están sujetos a los{" "}
          <a href="terminos" className="services__noticeLink">
            términos y condiciones
          </a>{" "}
          y a la{" "}
          <a href="politica" className="services__noticeLink">
            política
          </a>{" "}
          de la empresa.
        </p>
      </div>
    </section>
  );
}