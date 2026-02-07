import { useEffect, useMemo, useRef } from "react";
import "./PilaresCarousel.css";

import img1 from "../../images/pilar1.1.jpg";
import img2 from "../../images/pilar1.jpg";
import img3 from "../../images/pilar3.jpg";
import img4 from "../../images/item2.jpg";
import img5 from "../../images/Nuvem4.jpg";

export default function PilaresCarousel() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    // Reveal: nunca dejes la sección invisible
    const forceVisible = () => root.classList.add("is-visible");

    if (typeof IntersectionObserver === "undefined") {
      forceVisible();
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              forceVisible();
              io.disconnect();
            }
          });
        },
        { threshold: 0.01 }
      );

      io.observe(root);

      const t = setTimeout(forceVisible, 300);
      return () => {
        clearTimeout(t);
        io.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const update = () => {
      const sl = track.scrollLeft;
      const max = track.scrollWidth - track.clientWidth;

      const atStart = sl <= 1;
      const atEnd = sl >= max - 1;

      root.classList.toggle("is-scrolled", !atStart);
      root.classList.toggle("is-end", atEnd);
    };

    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const items = useMemo(
    () => [
      {
        img: img1,
        title: "NADA REUTILIZADO",
        desc: "Cada proyecto se desarrolla desde cero. No usamos plantillas, estructuras prefabricadas ni soluciones genéricas descargadas de internet. Tu sitio es único, como tu negocio.",
      },
      {
        img: img2,
        title: "ESTÁNDARES PROFESIONALES",
        desc: "Trabajamos con herramientas, metodologías y prácticas utilizadas en entornos profesionales. Nada improvisado, nada experimental: solo soluciones estables y bien construidas.",
      },
      {
        img: img3,
        title: "100% PERSONALIZADO",
        desc: "El sitio se diseña y desarrolla según tus necesidades reales. Ni funciones innecesarias, ni limitaciones artificiales. Exactamente lo que tu proyecto requiere.",
      },
      {
        img: img4,
        title: "ESCALABILIDAD REAL",
        desc: "Tu sitio no se queda estático. La estructura está pensada para crecer, adaptarse y evolucionar conforme tu negocio lo necesite, sin tener que rehacer todo desde cero.",
      },
      {
        img: img5,
        title: "ENFOQUE EMPRESARIAL",
        desc: "Más que un sitio visualmente atractivo, construimos un activo digital. Un espacio pensado para representar tu marca, generar confianza y apoyar tus objetivos comerciales.",
      },
    ],
    []
  );

  return (
    <div className="garantia pilares reveal" ref={rootRef}>

      <div className="pilares__intro">
        <h2 className="pilares__introTitle">PRINCIPIOS QUE DEFINEN CADA PROYECTO</h2>
      </div>

        <div className="pilares__track" ref={trackRef}>
          {items.map((it, idx) => (
            <article className="pilares__item" key={idx}>
              <div className="pilares__card">
                <div className="pilares__media">
                  <img className="pilares__img" src={it.img} alt="" loading="lazy" />
                </div>
              </div>

              <div className="pilares__meta">
                <h3 className="pilares__title">{it.title}</h3>
                <p className="pilares__desc">{it.desc}</p>
              </div>
            </article>
          ))}
        </div>
    </div>
  );
}