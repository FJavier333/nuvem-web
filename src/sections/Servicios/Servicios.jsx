import React from "react";
import { Link } from "react-router-dom";
import useRevealCascade from "../../hooks/useRevealCascade";
import "./Servicios.css";

import imgWebs480 from "../../images/services-responsive/servicios-webs-480w.webp";
import imgWebs768 from "../../images/services-responsive/servicios-webs-768w.webp";
import imgWebs1024 from "../../images/services-responsive/servicios-webs-1024w.webp";
import imgWebs1440 from "../../images/services-responsive/servicios-webs-1440w.webp";
import imgWebs1920 from "../../images/services-responsive/servicios-webs-1920w.webp";
import imgWebs2000 from "../../images/services-responsive/servicios-webs-2000w.webp";
import imgCustom480 from "../../images/services-responsive/shot-10-480w.webp";
import imgCustom768 from "../../images/services-responsive/shot-10-768w.webp";
import imgCustom1024 from "../../images/services-responsive/shot-10-1024w.webp";
import imgCustom1440 from "../../images/services-responsive/shot-10-1440w.webp";
import imgCustom1920 from "../../images/services-responsive/shot-10-1920w.webp";
import imgCustom2560 from "../../images/services-responsive/shot-10-2560w.webp";
import imgRedesign480 from "../../images/services-responsive/servicios-redesign-480w.webp";
import imgRedesign768 from "../../images/services-responsive/servicios-redesign-768w.webp";
import imgRedesign1024 from "../../images/services-responsive/servicios-redesign-1024w.webp";
import imgRedesign1440 from "../../images/services-responsive/servicios-redesign-1440w.webp";
import imgRedesign1920 from "../../images/services-responsive/servicios-redesign-1920w.webp";
import imgRedesign2560 from "../../images/services-responsive/servicios-redesign-2560w.webp";
import imgSupport480 from "../../images/services-responsive/pilar5-3-480w.webp";
import imgSupport768 from "../../images/services-responsive/pilar5-3-768w.webp";
import imgSupport1024 from "../../images/services-responsive/pilar5-3-1024w.webp";
import imgSupport1440 from "../../images/services-responsive/pilar5-3-1440w.webp";
import imgSupport1920 from "../../images/services-responsive/pilar5-3-1920w.webp";
import imgSupport2000 from "../../images/services-responsive/pilar5-3-2000w.webp";

const SERVICE_IMAGE_SIZES = `
  (max-width: 533px) calc(100vw - 32px),
  (max-width: 900px) calc(100vw - 48px),
  (max-width: 1420px) 50vw,
  704px
`;

export default function Servicios() {
  const revealRootRef = useRevealCascade();

  const items = [
    {
      title: "SITIOS WEB PROFESIONALES",
      text:
        "Diseñamos y desarrollamos sitios web modernos, claros y funcionales, enfocados en comunicar valor, generar confianza y convertir visitantes en clientes. Pensado para marcas, negocios y profesionales que necesitan una presencia digital seria y bien construida.",
      image: imgWebs2000,
      imageSrcSet: `${imgWebs480} 480w, ${imgWebs768} 768w, ${imgWebs1024} 1024w, ${imgWebs1440} 1440w, ${imgWebs1920} 1920w, ${imgWebs2000} 2000w`,
      alt: "Sitios web profesionales",
    },
    {
      title: "DESARROLLO WEB A MEDIDA",
      text:
        "Creamos soluciones personalizadas cuando un proyecto requiere una estructura específica, funcionalidades particulares o una base sólida para crecer a largo plazo. Ideal para proyectos que buscan escalabilidad y control total.",
      image: imgCustom2560,
      imageSrcSet: `${imgCustom480} 480w, ${imgCustom768} 768w, ${imgCustom1024} 1024w, ${imgCustom1440} 1440w, ${imgCustom1920} 1920w, ${imgCustom2560} 2560w`,
      alt: "Desarrollo web a medida",
    },
    {
      title: "REDISEÑO Y OPTIMIZACIÓN",
      text:
        "Mejoramos sitios existentes que no reflejan correctamente la marca, presentan problemas de claridad, rendimiento o conversión, o simplemente se han quedado atrás. El enfoque es tanto visual como estratégico y técnico.",
      image: imgRedesign2560,
      imageSrcSet: `${imgRedesign480} 480w, ${imgRedesign768} 768w, ${imgRedesign1024} 1024w, ${imgRedesign1440} 1440w, ${imgRedesign1920} 1920w, ${imgRedesign2560} 2560w`,
      alt: "Rediseño y optimización",
    },
    {
      title: "SOPORTE Y EVOLUCIÓN",
      text:
        "Acompañamos proyectos que requieren ajustes, mejoras continuas o crecimiento progresivo, manteniendo siempre coherencia, estabilidad y calidad.",
      image: imgSupport2000,
      imageSrcSet: `${imgSupport480} 480w, ${imgSupport768} 768w, ${imgSupport1024} 1024w, ${imgSupport1440} 1440w, ${imgSupport1920} 1920w, ${imgSupport2000} 2000w`,
      alt: "Soporte y evolución",
    },
  ];

  return (
    <section className="services" id="servicios" ref={revealRootRef}>
      <div className="services__container">
        <header className="services__header">
          <h2 className="services__title">
            <span className="homeSectionTitle__reveal" data-reveal>
              NUESTRO CATÁLOGO
            </span>
          </h2>
          <p className="services__subtitle" data-reveal data-reveal-delay="1">
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
                <div className="serviceItem__media" data-reveal="media">
                  <div className="serviceItem__glow" aria-hidden="true" />
                  <img
                    className="serviceItem__img"
                    src={item.image}
                    srcSet={item.imageSrcSet}
                    sizes={SERVICE_IMAGE_SIZES}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div
                  className="serviceItem__content"
                  data-reveal
                  data-reveal-delay="1"
                >
                  <h3 className="serviceItem__title">{item.title}</h3>
                  <p className="serviceItem__text">{item.text}</p>
                </div>
              </article>
            );
          })}
        </div>
        <p className="services__notice" data-reveal data-reveal-delay="1">
          Todos los servicios están sujetos a los{" "}
          <Link to="/terminos" className="services__noticeLink">
            términos y condiciones
          </Link>{" "}
          y a la{" "}
          <Link to="/politica" className="services__noticeLink">
            política
          </Link>{" "}
          de la empresa.
        </p>
      </div>
    </section>
  );
}
