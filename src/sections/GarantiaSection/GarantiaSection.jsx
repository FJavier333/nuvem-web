import "./GarantiaSection.css";
import PilaresCarousel from "./PilaresCarousel";
import ComentarioGlide from "./ComentarioGlide";

export default function GarantiaSection() {
  return (
    <section className="garantia" id="garantia">

      <div className="garantia__top">
        <div className="garantia__container">
          <ComentarioGlide />
          <h2 className="garantia__title section-title">
            Garantia de calidad
          </h2>
        </div>
      </div>

      {/* ✅ Carrusel JUSTO debajo del título, con bleed solo a la derecha */}
      <div className="garantia__bleedRight">
        <PilaresCarousel />
      </div>

    </section>
  );
}